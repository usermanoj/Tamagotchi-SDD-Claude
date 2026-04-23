import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGameLoop } from '../hooks/useGameLoop';
import { HUNGER_DECAY, HAPPINESS_DECAY, ENERGY_DECAY, TICK_INTERVAL_MS, STAT_MIN } from '../utils/constants';

beforeEach(() => { vi.useFakeTimers(); });
afterEach(() => { vi.useRealTimers(); });

describe('useGameLoop', () => {
  it('calls onTick after TICK_INTERVAL_MS', () => {
    const onTick = vi.fn();
    renderHook(() => useGameLoop(onTick));
    expect(onTick).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(TICK_INTERVAL_MS); });
    expect(onTick).toHaveBeenCalledTimes(1);
  });

  it('calls onTick multiple times for multiple intervals', () => {
    const onTick = vi.fn();
    renderHook(() => useGameLoop(onTick));
    act(() => { vi.advanceTimersByTime(TICK_INTERVAL_MS * 3); });
    expect(onTick).toHaveBeenCalledTimes(3);
  });

  it('clears interval on unmount (no memory leak)', () => {
    const onTick = vi.fn();
    const { unmount } = renderHook(() => useGameLoop(onTick));
    unmount();
    act(() => { vi.advanceTimersByTime(TICK_INTERVAL_MS * 5); });
    expect(onTick).toHaveBeenCalledTimes(0);
  });
});

describe('decay logic (unit)', () => {
  const clamp = (v) => Math.max(STAT_MIN, Math.min(100, v));

  it('hunger decreases by HUNGER_DECAY per tick', () => {
    const h = 70;
    expect(clamp(h - HUNGER_DECAY)).toBe(65);
  });

  it('happiness decreases by HAPPINESS_DECAY per tick', () => {
    const ha = 70;
    expect(clamp(ha - HAPPINESS_DECAY)).toBe(66);
  });

  it('energy decreases by ENERGY_DECAY per tick', () => {
    const e = 70;
    expect(clamp(e - ENERGY_DECAY)).toBe(67);
  });

  it('stat clamps at 0 — never negative', () => {
    expect(clamp(0 - HUNGER_DECAY)).toBe(0);
    expect(clamp(-10)).toBe(0);
  });

  it('stat clamps at 100 — never exceeds max', () => {
    expect(clamp(105)).toBe(100);
  });
});
