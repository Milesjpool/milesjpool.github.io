import { render, screen } from '@testing-library/react';
import { App } from './App';

describe("App", () => {
  it('renders MilesJPool in the document', () => {
    render(<App />);
    const linkElement = screen.getByText(/MilesJPool/i);
    expect(linkElement).toBeInTheDocument();
  });
})
