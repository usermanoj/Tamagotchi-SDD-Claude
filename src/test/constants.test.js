import { describe, it, expect } from 'vitest';
import {
  TICK_INTERVAL_MS,
  HUNGER_DECAY, HAPPINESS_DECAY, ENERGY_DECAY,
  FEED_HUNGER_GAIN, PLAY_HAPPINESS_GAIN, PLAY_ENERGY_COST,
  REST_ENERGY_GAIN, REST_HAPPINESS_COST,
  EVOLVE_HAPPINESS_MIN, EVOLVE_DURATION_MS,
  STAT_MIN, STAT_MAX, DEFAULT_STAT,
  REACTION_QUOTE_DURATION_MS, STARE_IDLE_MS,
  TRIPLE_FEED_WINDOW_MS, TRIPLE_FEED_COUNT,
} from '../utils/constants';

describe('constants', () => {
  it('TICK_INTERVAL_MS is 2000', () => expect(TICK_INTERVAL_MS).toBe(2000));

  it('decay rates match spec', () => {
    expect(HUNGER_DECAY).toBe(5);
    expect(HAPPINESS_DECAY).toBe(4);
    expect(ENERGY_DECAY).toBe(3);
  });

  it('stat bounds match spec', () => {
    expect(STAT_MIN).toBe(0);
    expect(STAT_MAX).toBe(100);
    expect(DEFAULT_STAT).toBe(70);
  });

  it('care action deltas match spec', () => {
    expect(FEED_HUNGER_GAIN).toBe(25);
    expect(PLAY_HAPPINESS_GAIN).toBe(20);
    expect(PLAY_ENERGY_COST).toBe(10);
    expect(REST_ENERGY_GAIN).toBe(30);
    expect(REST_HAPPINESS_COST).toBe(5);
  });

  it('evolution constants match spec', () => {
    expect(EVOLVE_HAPPINESS_MIN).toBe(80);
    expect(EVOLVE_DURATION_MS).toBe(60000);
  });

  it('personality timing constants match spec', () => {
    expect(REACTION_QUOTE_DURATION_MS).toBe(2000);
    expect(STARE_IDLE_MS).toBe(60000);
    expect(TRIPLE_FEED_WINDOW_MS).toBe(20000);
    expect(TRIPLE_FEED_COUNT).toBe(3);
  });
});
