import React from 'react';
import { render, screen, cleanup } from '@testing-library/react-native'; // Import cleanup
import Time from '../components/Time';

describe('Time Component', () => {
  afterEach(cleanup);

  it('renders the time correctly', async () => {
    render(<Time />);
    const timeText = await screen.findByText(/^\d{2}:\d{2}:\d{2}$/);
    expect(timeText).toBeTruthy();

  });
});