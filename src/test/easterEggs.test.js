import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TRIPLE_FEED_WINDOW_MS, TRIPLE_FEED_COUNT } from '../utils/constants';
import { TRIPLE_FEED_MESSAGE, PARTY_MESSAGE } from '../utils/messages';

// Isolated logic tests mirroring App.jsx Easter egg implementations (PE-F-07, PE-F-08, PE-F-09)

describe('Triple Feed Easter Egg (PE-F-08)', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('consecutiveFeedCount increments on each Feed action within window', () => {
    let count = 0;
    let lastFeedTime = 0;

    function simulateFeed() {
      const now = Date.now();
      if (now - lastFeedTime < TRIPLE_FEED_WINDOW_MS) {
        count += 1;
      } else {
        count = 1;
      }
      lastFeedTime = now;
      return count;
    }

    simulateFeed(); // count=1
    simulateFeed(); // count=2
    expect(simulateFeed()).toBe(3); // count=3
  });

  it('Triple Feed triggers quote after exactly TRIPLE_FEED_COUNT feeds within window', () => {
    let count = 0;
    let lastFeedTime = 0;
    let triggeredQuote = null;

    function simulateFeed() {
      const now = Date.now();
      count = (now - lastFeedTime < TRIPLE_FEED_WINDOW_MS) ? count + 1 : 1;
      lastFeedTime = now;
      if (count >= TRIPLE_FEED_COUNT) {
        triggeredQuote = TRIPLE_FEED_MESSAGE;
        count = 0;
      }
    }

    simulateFeed();
    simulateFeed();
    simulateFeed();
    expect(triggeredQuote).toBe(TRIPLE_FEED_MESSAGE);
  });

  it('Triple Feed counter resets after TRIPLE_FEED_WINDOW_MS without a Feed', () => {
    let count = 0;
    let lastFeedTime = 0;

    function simulateFeed() {
      const now = Date.now();
      count = (now - lastFeedTime < TRIPLE_FEED_WINDOW_MS) ? count + 1 : 1;
      lastFeedTime = now;
    }

    simulateFeed(); simulateFeed(); // count=2

    // Advance past the window
    vi.advanceTimersByTime(TRIPLE_FEED_WINDOW_MS + 1000);

    simulateFeed(); // should reset to 1
    expect(count).toBe(1);
  });
});

describe('Full Stats Party Easter Egg (PE-F-09)', () => {
  it('triggers when all stats are 100', () => {
    const STAT_MAX = 100;
    function checkParty(h, ha, e) {
      return h >= STAT_MAX && ha >= STAT_MAX && e >= STAT_MAX;
    }
    expect(checkParty(100, 100, 100)).toBe(true);
  });

  it('does not trigger when any stat is 99', () => {
    const STAT_MAX = 100;
    function checkParty(h, ha, e) {
      return h >= STAT_MAX && ha >= STAT_MAX && e >= STAT_MAX;
    }
    expect(checkParty(99, 100, 100)).toBe(false);
    expect(checkParty(100, 99, 100)).toBe(false);
    expect(checkParty(100, 100, 99)).toBe(false);
  });

  it('PARTY_MESSAGE is defined and non-empty', () => {
    expect(PARTY_MESSAGE).toBeTruthy();
    expect(PARTY_MESSAGE.length).toBeGreaterThan(0);
  });
});

describe('Stare Easter Egg (PE-F-07)', () => {
  it('stare triggers when now - lastActionTime > STARE_IDLE_MS', () => {
    const STARE_IDLE_MS = 60000;
    const lastActionTime = Date.now() - (STARE_IDLE_MS + 1000);
    expect(Date.now() - lastActionTime > STARE_IDLE_MS).toBe(true);
  });

  it('stare does not trigger when action was recent', () => {
    const STARE_IDLE_MS = 60000;
    const lastActionTime = Date.now() - 5000;
    expect(Date.now() - lastActionTime > STARE_IDLE_MS).toBe(false);
  });
});
