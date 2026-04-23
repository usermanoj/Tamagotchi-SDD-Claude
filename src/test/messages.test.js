import { describe, it, expect } from 'vitest';
import {
  deriveMessage,
  SICK_MESSAGES, HIGH_HAPPINESS_MESSAGES, LOW_HUNGER_MESSAGES,
  LOW_HAPPINESS_MESSAGES, LOW_ENERGY_MESSAGES, EVOLVED_MESSAGES,
  IDLE_MESSAGES, FEED_QUOTES_NORMAL, FEED_QUOTES_LOW,
  PLAY_QUOTES_NORMAL, REST_QUOTES_NORMAL, REST_QUOTES_SICK,
} from '../utils/messages';

const ALL_MESSAGE_ARRAYS = [
  SICK_MESSAGES, HIGH_HAPPINESS_MESSAGES, LOW_HUNGER_MESSAGES,
  LOW_HAPPINESS_MESSAGES, LOW_ENERGY_MESSAGES, EVOLVED_MESSAGES,
  IDLE_MESSAGES, FEED_QUOTES_NORMAL, FEED_QUOTES_LOW,
  PLAY_QUOTES_NORMAL, REST_QUOTES_NORMAL, REST_QUOTES_SICK,
];

describe('deriveMessage (PE-F-02, PE-F-03)', () => {
  const base = { hunger: 70, happiness: 70, energy: 70 };

  it('returns string from SICK_MESSAGES when petState=sick', () => {
    const msg = deriveMessage(base, 'sick', 'baby', false);
    expect(SICK_MESSAGES).toContain(msg);
  });

  it('returns string from HIGH_HAPPINESS_MESSAGES when happiness > 80', () => {
    const msg = deriveMessage({ ...base, happiness: 85 }, 'normal', 'baby', false);
    expect(HIGH_HAPPINESS_MESSAGES).toContain(msg);
  });

  it('returns string from LOW_HUNGER_MESSAGES when hunger < 25', () => {
    const msg = deriveMessage({ ...base, hunger: 20 }, 'normal', 'baby', false);
    expect(LOW_HUNGER_MESSAGES).toContain(msg);
  });

  it('returns string from LOW_ENERGY_MESSAGES when energy < 25', () => {
    const msg = deriveMessage({ ...base, energy: 15 }, 'normal', 'baby', false);
    expect(LOW_ENERGY_MESSAGES).toContain(msg);
  });

  it('returns string from LOW_HAPPINESS_MESSAGES when happiness < 25', () => {
    const msg = deriveMessage({ ...base, happiness: 20 }, 'normal', 'baby', false);
    expect(LOW_HAPPINESS_MESSAGES).toContain(msg);
  });

  it('returns string from EVOLVED_MESSAGES when petState=evolved', () => {
    const msg = deriveMessage(base, 'evolved', 'teen', false);
    expect(EVOLVED_MESSAGES).toContain(msg);
  });

  it('returns STARE_MESSAGE when isStaring=true', () => {
    const msg = deriveMessage(base, 'normal', 'baby', true);
    expect(msg).toBe("I'm just… going to stare at you then.");
  });

  it('returns string from IDLE_MESSAGES for default state', () => {
    const msg = deriveMessage(base, 'normal', 'baby', false);
    expect(IDLE_MESSAGES).toContain(msg);
  });
});

describe('Message length validation (PE-N-02)', () => {
  ALL_MESSAGE_ARRAYS.forEach((arr, idx) => {
    it(`array[${idx}] — all messages ≤ 70 characters`, () => {
      arr.forEach(msg => {
        expect(msg.length).toBeLessThanOrEqual(70);
      });
    });
  });
});
