import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Blog from '../../components/Blog';

describe('Blog Component', () => {
  it('renders blog posts', () => {
    render(<Blog />);
    expect(screen.getByText(/Blog & Insights/i)).toBeInTheDocument();
  });

  it('opens blog post modal when clicking read more', () => {
    render(<Blog />);
    const readMoreButton = screen.getAllByText(/Read More/i)[0];
    fireEvent.click(readMoreButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('displays correct read time format', () => {
    render(<Blog />);
    const readTimes = screen.getAllByText(/2 min read/i);
    expect(readTimes.length).toBeGreaterThan(0);
  });
});
