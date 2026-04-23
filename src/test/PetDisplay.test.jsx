import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PetDisplay from '../components/PetDisplay';

const BASE_PROPS = {
  lifeStage: 'baby',
  message: 'Hello!',
  isStaring: false,
  isWobbling: false,
  isParty: false,
  evolutionProgress: 0,
};

describe('PetDisplay (DS-F-06, DS-F-07)', () => {
  it('renders normal sprite when petState is normal', () => {
    render(<PetDisplay {...BASE_PROPS} petState="normal" />);
    expect(screen.getByText('🐱')).toBeInTheDocument();
  });

  it('renders sick sprite when petState is sick', () => {
    render(<PetDisplay {...BASE_PROPS} petState="sick" />);
    expect(screen.getByText('🤒')).toBeInTheDocument();
  });

  it('renders evolved sprite when petState is evolved', () => {
    render(<PetDisplay {...BASE_PROPS} petState="evolved" lifeStage="teen" />);
    expect(screen.getByText('😎')).toBeInTheDocument();
  });

  it('state badge shows Normal when petState is normal', () => {
    render(<PetDisplay {...BASE_PROPS} petState="normal" />);
    expect(screen.getByText('Normal')).toBeInTheDocument();
  });

  it('state badge shows Sick! when petState is sick', () => {
    render(<PetDisplay {...BASE_PROPS} petState="sick" />);
    expect(screen.getByText('Sick!')).toBeInTheDocument();
  });

  it('state badge shows Evolved ✨ when petState is evolved', () => {
    render(<PetDisplay {...BASE_PROPS} petState="evolved" lifeStage="teen" />);
    expect(screen.getByText('Evolved ✨')).toBeInTheDocument();
  });

  it('applies sick CSS class for red pulse animation (DS-N-02)', () => {
    const { container } = render(<PetDisplay {...BASE_PROPS} petState="sick" />);
    expect(container.querySelector('[class*="sick"]')).toBeTruthy();
  });

  it('applies evolved CSS class for shimmer animation (DS-N-03)', () => {
    const { container } = render(<PetDisplay {...BASE_PROPS} petState="evolved" lifeStage="teen" />);
    expect(container.querySelector('[class*="evolved"]')).toBeTruthy();
  });

  it('shows speech bubble message', () => {
    render(<PetDisplay {...BASE_PROPS} petState="normal" message="Hello ChuChu!" />);
    expect(screen.getByText('Hello ChuChu!')).toBeInTheDocument();
  });

  it('shows evolution progress bar when lifeStage is baby and progress > 0', () => {
    const { container } = render(<PetDisplay {...BASE_PROPS} petState="normal" evolutionProgress={50} />);
    expect(container.querySelector('[class*="evoBarWrapper"]')).toBeTruthy();
  });
});
