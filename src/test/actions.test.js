import { describe, it, expect } from 'vitest';
import {
  STAT_MIN, STAT_MAX,
  FEED_HUNGER_GAIN, PLAY_HAPPINESS_GAIN, PLAY_ENERGY_COST,
  REST_ENERGY_GAIN, REST_HAPPINESS_COST,
} from '../utils/constants';

const clamp = (v) => Math.max(STAT_MIN, Math.min(STAT_MAX, v));

describe('Feed action (CL-F-01)', () => {
  it('hunger 50 → 75', () => {
    expect(clamp(50 + FEED_HUNGER_GAIN)).toBe(75);
  });

  it('hunger 90 → 100 (capped, not 115)', () => {
    expect(clamp(90 + FEED_HUNGER_GAIN)).toBe(100);
  });

  it('hunger 100 → 100 (no overflow)', () => {
    expect(clamp(100 + FEED_HUNGER_GAIN)).toBe(100);
  });
});

describe('Play action (CL-F-02)', () => {
  it('happiness 60 → 80', () => {
    expect(clamp(60 + PLAY_HAPPINESS_GAIN)).toBe(80);
  });

  it('energy 50 → 40', () => {
    expect(clamp(50 - PLAY_ENERGY_COST)).toBe(40);
  });

  it('energy 5 → 0 (floored, not -5)', () => {
    expect(clamp(5 - PLAY_ENERGY_COST)).toBe(0);
  });

  it('happiness capped at 100', () => {
    expect(clamp(95 + PLAY_HAPPINESS_GAIN)).toBe(100);
  });
});

describe('Rest action (CL-F-03)', () => {
  it('energy 60 → 90', () => {
    expect(clamp(60 + REST_ENERGY_GAIN)).toBe(90);
  });

  it('energy capped at 100', () => {
    expect(clamp(80 + REST_ENERGY_GAIN)).toBe(100);
  });

  it('happiness 10 → 5', () => {
    expect(clamp(10 - REST_HAPPINESS_COST)).toBe(5);
  });

  it('happiness 3 → 0 (floored, not -2)', () => {
    expect(clamp(3 - REST_HAPPINESS_COST)).toBe(0);
  });
});
