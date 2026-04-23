import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatBar from '../components/StatBar';

describe('StatBar', () => {
  it('renders label and numeric value', () => {
    render(<StatBar label="Hunger" value={72} emoji="🍖" />);
    expect(screen.getByText(/Hunger/)).toBeInTheDocument();
    expect(screen.getByText('72')).toBeInTheDocument();
  });

  it('fill width reflects value/STAT_MAX ratio', () => {
    const { container } = render(<StatBar label="Hunger" value={50} emoji="🍖" />);
    const fill = container.querySelector('[style*="width: 50%"]');
    expect(fill).toBeTruthy();
  });

  it('applies green class when value = 75', () => {
    const { container } = render(<StatBar label="Hunger" value={75} emoji="🍖" />);
    const fill = container.querySelector('[class*="green"]');
    expect(fill).toBeTruthy();
  });

  it('applies amber class when value = 40', () => {
    const { container } = render(<StatBar label="Hunger" value={40} emoji="🍖" />);
    const fill = container.querySelector('[class*="amber"]');
    expect(fill).toBeTruthy();
  });

  it('applies red class when value = 20', () => {
    const { container } = render(<StatBar label="Hunger" value={20} emoji="🍖" />);
    const fill = container.querySelector('[class*="red"]');
    expect(fill).toBeTruthy();
  });
});
