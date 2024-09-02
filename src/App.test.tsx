import { render, screen } from '@testing-library/react';
import { App } from './App';

describe("App", () => {
  it('renders Miles in the document', () => {
    render(<App />);
    const linkElement = screen.getByText(/Miles/i);
    expect(linkElement).toBeInTheDocument();
  });
})
