import { useState, useCallback, useRef, useEffect } from 'react';
import { useGameLoop } from './hooks/useGameLoop';
import { loadGame, saveGame, clearGame } from './utils/storage';
import {
  STAT_MIN, STAT_MAX, DEFAULT_STAT,
  HUNGER_DECAY, HAPPINESS_DECAY, ENERGY_DECAY,
  FEED_HUNGER_GAIN, PLAY_HAPPINESS_GAIN, PLAY_ENERGY_COST,
  REST_ENERGY_GAIN, REST_HAPPINESS_COST,
  EVOLVE_HAPPINESS_MIN, EVOLVE_DURATION_MS, TICK_INTERVAL_MS,
  STARE_IDLE_MS, TRIPLE_FEED_WINDOW_MS, TRIPLE_FEED_COUNT,
  REACTION_QUOTE_DURATION_MS,
} from './utils/constants';
import {
  deriveMessage,
  FEED_QUOTES_NORMAL, FEED_QUOTES_LOW,
  PLAY_QUOTES_NORMAL,
  REST_QUOTES_NORMAL, REST_QUOTES_SICK,
  EVOLUTION_MOMENT_MESSAGES, PARTY_MESSAGE, TRIPLE_FEED_MESSAGE,
  pick,
} from './utils/messages';
import PetDisplay from './components/PetDisplay';
import StatBar from './components/StatBar';
import ActionButtons from './components/ActionButtons';
import ResetButton from './components/ResetButton';
import styles from './App.module.css';

const clamp = (v) => Math.max(STAT_MIN, Math.min(STAT_MAX, v));

function freshState(saved) {
  return {
    hunger:        clamp(saved?.hunger        ?? DEFAULT_STAT),
    happiness:     clamp(saved?.happiness     ?? DEFAULT_STAT),
    energy:        clamp(saved?.energy        ?? DEFAULT_STAT),
    petState:      saved?.petState            ?? 'normal',
    lifeStage:     saved?.lifeStage           ?? 'baby',
    evolutionTimer: saved?.evolutionTimer     ?? 0,
  };
}

function applyStateTransitions(s) {
  let { hunger, happiness, energy, petState, lifeStage, evolutionTimer } = s;

  if (hunger <= STAT_MIN || happiness <= STAT_MIN || energy <= STAT_MIN) {
    return { ...s, petState: 'sick', evolutionTimer: 0 };
  }

  if (petState === 'sick') return s;

  if (happiness >= EVOLVE_HAPPINESS_MIN) {
    evolutionTimer += TICK_INTERVAL_MS;
  } else {
    evolutionTimer = 0;
  }

  if (evolutionTimer >= EVOLVE_DURATION_MS && lifeStage === 'baby') {
    return { ...s, petState: 'evolved', lifeStage: 'teen', evolutionTimer };
  }

  return { ...s, evolutionTimer };
}

function checkRecovery(s) {
  if (s.petState === 'sick' && s.hunger > STAT_MIN && s.happiness > STAT_MIN && s.energy > STAT_MIN) {
    return { ...s, petState: 'normal' };
  }
  return s;
}

export default function App() {
  const [game, setGame] = useState(() => freshState(loadGame()));
  const [currentMessage, setCurrentMessage] = useState(() =>
    deriveMessage({ hunger: game.hunger, happiness: game.happiness, energy: game.energy }, game.petState, game.lifeStage, false)
  );
  const [feedQuote, setFeedQuote]   = useState(null);
  const [playQuote, setPlayQuote]   = useState(null);
  const [restQuote, setRestQuote]   = useState(null);
  const [isWobbling, setIsWobbling] = useState(false);
  const [isParty, setIsParty]       = useState(false);
  const [isStaring, setIsStaring]   = useState(false);

  const lastActionTimeRef  = useRef(Date.now());
  const consecutiveFeedRef = useRef(0);
  const lastFeedTimeRef    = useRef(0);
  const partyTimeoutRef    = useRef(null);
  const wobbleTimeoutRef   = useRef(null);
  const feedQuoteTimerRef  = useRef(null);
  const playQuoteTimerRef  = useRef(null);
  const restQuoteTimerRef  = useRef(null);

  useEffect(() => () => {
    clearTimeout(partyTimeoutRef.current);
    clearTimeout(wobbleTimeoutRef.current);
    clearTimeout(feedQuoteTimerRef.current);
    clearTimeout(playQuoteTimerRef.current);
    clearTimeout(restQuoteTimerRef.current);
  }, []);

  const persist = (s) => saveGame(s);

  const triggerReaction = (setter, timerRef, quote) => {
    setter(quote);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setter(null), REACTION_QUOTE_DURATION_MS);
  };

  const updateMessage = (s, staring) => {
    setCurrentMessage(deriveMessage(
      { hunger: s.hunger, happiness: s.happiness, energy: s.energy },
      s.petState, s.lifeStage, staring
    ));
  };

  const checkParty = (s) => {
    if (s.hunger >= STAT_MAX && s.happiness >= STAT_MAX && s.energy >= STAT_MAX) {
      setIsParty(true);
      setCurrentMessage(PARTY_MESSAGE);
      clearTimeout(partyTimeoutRef.current);
      partyTimeoutRef.current = setTimeout(() => setIsParty(false), 2000);
      return true;
    }
    return false;
  };

  const onTick = useCallback(() => {
    setGame(prev => {
      // Pause decay when sick — gives player time to recover without racing the clock
      const decayed = prev.petState === 'sick' ? prev : {
        ...prev,
        hunger:    clamp(prev.hunger    - HUNGER_DECAY),
        happiness: clamp(prev.happiness - HAPPINESS_DECAY),
        energy:    clamp(prev.energy    - ENERGY_DECAY),
      };
      const next = applyStateTransitions(decayed);

      const justEvolved = next.lifeStage === 'teen' && prev.lifeStage === 'baby';
      const staring = Date.now() - lastActionTimeRef.current > STARE_IDLE_MS;

      setIsStaring(staring);
      if (justEvolved) {
        setCurrentMessage(pick(EVOLUTION_MOMENT_MESSAGES));
      } else {
        updateMessage(next, staring);
      }

      persist(next);
      return next;
    });
  }, []);

  useGameLoop(onTick);

  function markAction() {
    lastActionTimeRef.current = Date.now();
    setIsStaring(false);
  }

  function handleFeed() {
    markAction();
    setGame(prev => {
      const next = checkRecovery({
        ...prev,
        hunger: clamp(prev.hunger + FEED_HUNGER_GAIN),
      });
      if (!checkParty(next)) updateMessage(next, false);
      persist(next);

      // Triple Feed Easter egg
      const now = Date.now();
      if (now - lastFeedTimeRef.current < TRIPLE_FEED_WINDOW_MS) {
        consecutiveFeedRef.current += 1;
      } else {
        consecutiveFeedRef.current = 1;
      }
      lastFeedTimeRef.current = now;

      if (consecutiveFeedRef.current >= TRIPLE_FEED_COUNT) {
        consecutiveFeedRef.current = 0;
        triggerReaction(setFeedQuote, feedQuoteTimerRef, TRIPLE_FEED_MESSAGE);
        setIsWobbling(true);
        clearTimeout(wobbleTimeoutRef.current);
        wobbleTimeoutRef.current = setTimeout(() => setIsWobbling(false), 1500);
      } else {
        triggerReaction(setFeedQuote, feedQuoteTimerRef, pick(prev.petState === 'sick' ? FEED_QUOTES_LOW : FEED_QUOTES_NORMAL));
      }

      return next;
    });
  }

  function handlePlay() {
    markAction();
    setGame(prev => {
      const next = checkRecovery({
        ...prev,
        happiness: clamp(prev.happiness + PLAY_HAPPINESS_GAIN),
        energy:    clamp(prev.energy    - PLAY_ENERGY_COST),
      });
      if (!checkParty(next)) updateMessage(next, false);
      persist(next);
      triggerReaction(setPlayQuote, playQuoteTimerRef, pick(PLAY_QUOTES_NORMAL));
      return next;
    });
  }

  function handleRest() {
    markAction();
    setGame(prev => {
      const next = checkRecovery({
        ...prev,
        energy:    clamp(prev.energy    + REST_ENERGY_GAIN),
        happiness: clamp(prev.happiness - REST_HAPPINESS_COST),
      });
      if (!checkParty(next)) updateMessage(next, false);
      persist(next);
      triggerReaction(setRestQuote, restQuoteTimerRef, pick(prev.petState === 'sick' ? REST_QUOTES_SICK : REST_QUOTES_NORMAL));
      return next;
    });
  }

  function handleReset() {
    clearGame();
    const s = freshState(null);
    setGame(s);
    setCurrentMessage(deriveMessage({ hunger: s.hunger, happiness: s.happiness, energy: s.energy }, s.petState, s.lifeStage, false));
    setIsStaring(false);
    setIsWobbling(false);
    setIsParty(false);
    consecutiveFeedRef.current = 0;
    lastActionTimeRef.current = Date.now();
  }

  const evolutionProgress = game.lifeStage === 'baby'
    ? Math.min(100, (game.evolutionTimer / EVOLVE_DURATION_MS) * 100)
    : 0;

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>🐾 ChuChu</h1>
        <p className={styles.subtitle}>Your tiny digital companion</p>
      </header>

      <main className={styles.main}>
        <PetDisplay
          petState={game.petState}
          lifeStage={game.lifeStage}
          message={currentMessage}
          isStaring={isStaring}
          isWobbling={isWobbling}
          isParty={isParty}
          evolutionProgress={evolutionProgress}
        />

        <section className={styles.statsSection}>
          <StatBar label="Hunger"    value={game.hunger}    emoji="🍖" />
          <StatBar label="Happiness" value={game.happiness} emoji="😊" />
          <StatBar label="Energy"    value={game.energy}    emoji="⚡" />
        </section>

        <ActionButtons
          hunger={game.hunger}
          happiness={game.happiness}
          energy={game.energy}
          petState={game.petState}
          onFeed={handleFeed}
          onPlay={handlePlay}
          onRest={handleRest}
          feedQuote={feedQuote}
          playQuote={playQuote}
          restQuote={restQuote}
        />

        <footer className={styles.footer}>
          <ResetButton onReset={handleReset} />
        </footer>
      </main>
    </div>
  );
}
