import { createContext, useContext, useState, useEffect } from 'react';
import { useWebSocket } from './WebSocketContext';

const GameTimeContext = createContext(null);

export const GameTimeProvider = ({ children }) => {
  const { socket } = useWebSocket();
  const [gameTime, setGameTime] = useState(null);

  useEffect(() => {
    if (socket) {
      const timeUpdateListener = (data) => {
        setGameTime(data.time);
      };

      socket.on('timeUpdate', timeUpdateListener);

      return () => {
        socket.off('timeUpdate', timeUpdateListener);
        socket.disconnect();
      };
    }
  }, [socket]);

  const getCurrentTime = () => {
    return gameTime;
  }

  const value = {
    getCurrentTime
  };

  return (
    <GameTimeContext.Provider value={value}>
      {children}
    </GameTimeContext.Provider>
  );
};

export const useGameTime = () => {
  const context = useContext(GameTimeContext);
  if (context === null) {
    throw new Error('useGameDateTime must be used within a GameTimeProvider');
  }
  return context;
};