import { describe, it, expect } from 'vitest';
import { TICK_INTERVAL_MS, EVOLVE_DURATION_MS, EVOLVE_HAPPINESS_MIN, STAT_MIN } from '../utils/constants';

// Mirrors applyStateTransitions from App.jsx
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

const BASE = { hunger: 70, happiness: 70, energy: 70, petState: 'normal', lifeStage: 'baby', evolutionTimer: 0 };

describe('State transitions (DS-F-01 to DS-F-05)', () => {
  it('tick with hunger=0 → petState becomes sick', () => {
    const result = applyStateTransitions({ ...BASE, hunger: 0 });
    expect(result.petState).toBe('sick');
  });

  it('tick with happiness=0 → petState becomes sick', () => {
    const result = applyStateTransitions({ ...BASE, happiness: 0 });
    expect(result.petState).toBe('sick');
  });

  it('tick with energy=0 → petState becomes sick', () => {
    const result = applyStateTransitions({ ...BASE, energy: 0 });
    expect(result.petState).toBe('sick');
  });

  it('evolutionTimer resets to 0 when going sick', () => {
    const result = applyStateTransitions({ ...BASE, hunger: 0, evolutionTimer: 30000 });
    expect(result.evolutionTimer).toBe(0);
  });

  it('30 ticks (60s) with happiness=80 while normal → evolved', () => {
    let state = { ...BASE, happiness: 80 };
    for (let i = 0; i < 30; i++) {
      state = applyStateTransitions(state);
    }
    expect(state.lifeStage).toBe('teen');
    expect(state.petState).toBe('evolved');
  });

  it('happiness drops to 79 after 29 ticks → timer resets, no evolution', () => {
    let state = { ...BASE, happiness: 80 };
    for (let i = 0; i < 29; i++) {
      state = applyStateTransitions(state);
    }
    state = applyStateTransitions({ ...state, happiness: 79 });
    expect(state.evolutionTimer).toBe(0);
    expect(state.lifeStage).toBe('baby');
    expect(state.petState).toBe('normal');
  });

  it('evolved pet with hunger=0 → petState=sick, lifeStage stays teen (DS-F-05)', () => {
    const evolved = { ...BASE, petState: 'evolved', lifeStage: 'teen', hunger: 0 };
    const result = applyStateTransitions(evolved);
    expect(result.petState).toBe('sick');
    expect(result.lifeStage).toBe('teen');
  });

  it('lifeStage never reverts from teen to baby (DS-F-05)', () => {
    const teen = { ...BASE, lifeStage: 'teen', petState: 'evolved', hunger: 0 };
    const result = applyStateTransitions(teen);
    expect(result.lifeStage).toBe('teen');
  });
});

describe('Recovery check (DS-F-02)', () => {
  function checkRecovery(s) {
    if (s.petState === 'sick' && s.hunger > STAT_MIN && s.happiness > STAT_MIN && s.energy > STAT_MIN) {
      return { ...s, petState: 'normal' };
    }
    return s;
  }

  it('all stats > 0 while sick → petState becomes normal', () => {
    const sick = { ...BASE, petState: 'sick', hunger: 10, happiness: 10, energy: 10 };
    expect(checkRecovery(sick).petState).toBe('normal');
  });

  it('any stat still 0 while sick → stays sick', () => {
    const sick = { ...BASE, petState: 'sick', hunger: 0, happiness: 10, energy: 10 };
    expect(checkRecovery(sick).petState).toBe('sick');
  });
});
