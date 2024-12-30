import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react-native';
import DateTime from '../components/DateTime';
import { GameTimeProvider } from '../context/GameTimeContext';
import { GameDateProvider } from '../context/GameDateContext';
import { WebSocketProvider } from '../context/WebSocketContext';
import { LocalizationProvider } from '../context/LocalizationContext';

describe('DateTime Component', () => {
  it('renders the time correctly', async () => {
    render(
      <WebSocketProvider>
        <LocalizationProvider>
          <GameTimeProvider>
            <GameDateProvider>
              <DateTime />
            </GameDateProvider>
          </GameTimeProvider>
        </LocalizationProvider>
      </WebSocketProvider>
    );

    const dateContent = await screen.findByTestId('game-date');

    await waitFor(() => {
      const dateText = dateContent.props.children;
      expect(dateText).toBeTruthy();
      // /^
      // [A-Za-z]+  // Matches one or more uppercase or lowercase letters (month name).
      // [ ]        // Matches a single space.
      // \d{1,2}    // Matches one or two digits (day of the month).
      // (?:        // Start of a non-capturing group.
      //   st|nd|rd|th // Matches one of the four ordinal suffixes.
      // )?         // End of the non-capturing group, made optional.
      // ,          // Matches a comma.
      // [ ]        // Matches a single space.
      // \d{3,}     // Matches three or more digits (year).
      // [ ]        // Matches a single space.
      // A\.F\.     // Matches "A.F." (dots escaped with backslashes).
      // $          // Matches the end of the string.
      // /
      expect(dateText).toMatch(/^[A-Za-z]+ \d{1,2}(?:st|nd|rd|th)?, \d{3,} A\.F\.$/);
    });
  });

  afterEach(cleanup);
});