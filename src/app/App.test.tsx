import { render, screen } from '@testing-library/react';
import { App } from './App';

describe("App", () => {
  it('renders welcome message in the document', () => {
    render(<App />);
    const linkElement = screen.getByText(/welcome/i);
    expect(linkElement).toBeInTheDocument();
  });
})
