import { createContext, useContext, useState, useEffect } from 'react';
import { useWebSocket } from './WebSocketContext';

const GameDateContext = createContext(null);

export const GameDateProvider = ({ children }) => {
  const [gameDate, setGameDate] = useState(null);
  const { socket } = useWebSocket();

  useEffect(() => {
    if (socket) {
      const dateUpdateListener = (data) => {
        setGameDate(data.date);
      };

      socket.on('dateUpdate', dateUpdateListener);

      return () => {
        socket.off('dateUpdate', dateUpdateListener);
      };
    }
  }, [socket]);

  const getCurrentDate = () => gameDate;

  const value = {
    getCurrentDate,
  };

  return (
    <GameDateContext.Provider value={value}>
      {children}
    </GameDateContext.Provider>
  );
};

export const useGameDate = () => {
  const context = useContext(GameDateContext);
  if (context === null) {
    throw new Error('useGameDate must be used within a GameDateProvider');
  }
  return context;
};