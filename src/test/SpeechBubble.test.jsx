import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SpeechBubble from '../components/SpeechBubble';

describe('SpeechBubble (PE-F-01, PE-N-01)', () => {
  it('renders the message prop as visible text', () => {
    render(<SpeechBubble message="Hello, I am ChuChu!" />);
    expect(screen.getByText('Hello, I am ChuChu!')).toBeInTheDocument();
  });

  it('has a CSS tail triangle element (PE-F-01)', () => {
    const { container } = render(<SpeechBubble message="test" />);
    expect(container.querySelector('[class*="tail"]')).toBeTruthy();
  });

  it('has bubble CSS class wrapping the message', () => {
    const { container } = render(<SpeechBubble message="test" />);
    expect(container.querySelector('[class*="bubble"]')).toBeTruthy();
  });

  it('updates when message prop changes', () => {
    const { rerender } = render(<SpeechBubble message="First message" />);
    expect(screen.getByText('First message')).toBeInTheDocument();
    rerender(<SpeechBubble message="Second message" />);
    expect(screen.getByText('Second message')).toBeInTheDocument();
  });
});
