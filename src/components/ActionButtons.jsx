import { useEffect, useRef, useState } from 'react';
import styles from './ActionButtons.module.css';
import { REACTION_QUOTE_DURATION_MS, STAT_MAX, STAT_MIN } from '../utils/constants';

function ActionButton({ label, emoji, colorClass, disabled, disabledReason, reactionQuote, onClick }) {
  const [displayLabel, setDisplayLabel] = useState(label);
  const timerRef = useRef(null);

  useEffect(() => {
    if (reactionQuote) {
      setDisplayLabel(reactionQuote);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setDisplayLabel(label), REACTION_QUOTE_DURATION_MS);
    }
    return () => clearTimeout(timerRef.current);
  }, [reactionQuote, label]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div className={styles.btnWrapper} title={disabled ? disabledReason : ''}>
      <button
        className={`${styles.btn} ${colorClass} ${disabled ? styles.disabled : ''}`}
        disabled={disabled}
        aria-disabled={disabled}
        onClick={onClick}
      >
        <span className={styles.btnEmoji}>{emoji}</span>
        <span className={styles.btnLabel}>{displayLabel}</span>
      </button>
    </div>
  );
}

export default function ActionButtons({
  hunger, happiness, energy, petState,
  onFeed, onPlay, onRest,
  feedQuote, playQuote, restQuote,
}) {
  const feedDisabled = hunger >= STAT_MAX;
  // Play only disabled by energy/hunger=0; allowed when sick so happiness can recover
  const playDisabled = energy <= STAT_MIN || hunger <= STAT_MIN;

  return (
    <div className={styles.row}>
      <ActionButton
        label="Feed"
        emoji="🍖"
        colorClass={styles.pink}
        disabled={feedDisabled}
        disabledReason="ChuChu is already full!"
        reactionQuote={feedQuote}
        onClick={onFeed}
      />
      <ActionButton
        label="Play"
        emoji="🎉"
        colorClass={styles.yellow}
        disabled={playDisabled}
        disabledReason={energy <= STAT_MIN ? 'Too tired to play!' : 'Too hungry to play!'}
        reactionQuote={playQuote}
        onClick={onPlay}
      />
      <ActionButton
        label="Rest"
        emoji="💤"
        colorClass={styles.blue}
        disabled={false}
        disabledReason=""
        reactionQuote={restQuote}
        onClick={onRest}
      />
    </div>
  );
}
