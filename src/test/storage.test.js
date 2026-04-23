import { describe, it, expect, beforeEach } from 'vitest';
import { loadGame, saveGame, clearGame } from '../utils/storage';

const SAMPLE = { hunger: 60, happiness: 70, energy: 80, petState: 'normal', lifeStage: 'baby', evolutionTimer: 0 };

beforeEach(() => {
  localStorage.clear();
});

describe('storage', () => {
  it('loadGame returns null when localStorage is empty', () => {
    expect(loadGame()).toBeNull();
  });

  it('saveGame writes JSON under chuchu_save', () => {
    saveGame(SAMPLE);
    expect(localStorage.getItem('chuchu_save')).toBeTruthy();
  });

  it('loadGame returns the object that was saved', () => {
    saveGame(SAMPLE);
    expect(loadGame()).toEqual(SAMPLE);
  });

  it('clearGame removes chuchu_save from localStorage', () => {
    saveGame(SAMPLE);
    clearGame();
    expect(localStorage.getItem('chuchu_save')).toBeNull();
  });

  it('loadGame returns null after clearGame', () => {
    saveGame(SAMPLE);
    clearGame();
    expect(loadGame()).toBeNull();
  });

  it('loadGame returns null for corrupted JSON', () => {
    localStorage.setItem('chuchu_save', 'not-valid-json{{{');
    expect(loadGame()).toBeNull();
  });
});
