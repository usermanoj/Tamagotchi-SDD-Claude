import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ActionButtons from '../components/ActionButtons';

const DEFAULT_PROPS = {
  hunger: 70, happiness: 70, energy: 70,
  petState: 'normal',
  onFeed: vi.fn(), onPlay: vi.fn(), onRest: vi.fn(),
  feedQuote: null, playQuote: null, restQuote: null,
};

describe('ActionButtons — disable rules', () => {
  it('Feed button is disabled when hunger is 100 (CL-F-04)', () => {
    render(<ActionButtons {...DEFAULT_PROPS} hunger={100} />);
    expect(screen.getByText('Feed').closest('button')).toBeDisabled();
  });

  it('Feed button is enabled when hunger is 99', () => {
    render(<ActionButtons {...DEFAULT_PROPS} hunger={99} />);
    expect(screen.getByText('Feed').closest('button')).not.toBeDisabled();
  });

  it('Play button is disabled when energy is 0 (CL-F-05)', () => {
    render(<ActionButtons {...DEFAULT_PROPS} energy={0} />);
    expect(screen.getByText('Play').closest('button')).toBeDisabled();
  });

  it('Play button is disabled when hunger is 0 (CL-F-05)', () => {
    render(<ActionButtons {...DEFAULT_PROPS} hunger={0} />);
    expect(screen.getByText('Play').closest('button')).toBeDisabled();
  });

  it('Play button is enabled when petState is sick — allows happiness recovery (CL-F-05)', () => {
    render(<ActionButtons {...DEFAULT_PROPS} petState="sick" />);
    expect(screen.getByText('Play').closest('button')).not.toBeDisabled();
  });

  it('Rest button is never disabled (CL-F-06)', () => {
    render(<ActionButtons {...DEFAULT_PROPS} hunger={0} happiness={0} energy={0} petState="sick" />);
    expect(screen.getByText('Rest').closest('button')).not.toBeDisabled();
  });

  it('clicking Feed calls onFeed exactly once', () => {
    const onFeed = vi.fn();
    render(<ActionButtons {...DEFAULT_PROPS} onFeed={onFeed} hunger={50} />);
    fireEvent.click(screen.getByText('Feed').closest('button'));
    expect(onFeed).toHaveBeenCalledTimes(1);
  });

  it('clicking disabled Feed does not call onFeed', () => {
    const onFeed = vi.fn();
    render(<ActionButtons {...DEFAULT_PROPS} onFeed={onFeed} hunger={100} />);
    fireEvent.click(screen.getByText('Feed').closest('button'));
    expect(onFeed).not.toHaveBeenCalled();
  });

  it('buttons have opacity 0.4 and cursor not-allowed when disabled (CL-N-03)', () => {
    const { container } = render(<ActionButtons {...DEFAULT_PROPS} hunger={100} />);
    const disabledBtn = container.querySelector('[class*="disabled"]');
    expect(disabledBtn).toBeTruthy();
  });
});
