import { createContext, useContext, useState, useEffect } from 'react';
import { useWebSocket } from './WebSocketContext';

const GameCalendarContext = createContext(null);

export const GameCalendarProvider = ({ children }) => {
  const { socket } = useWebSocket();
  const [gameCalendar, setGameCalendar] = useState([]);

  useEffect(() => {
    if (socket) {
      const calendarUpdateListener = (data) => {
        setGameCalendar(data.calendar.calendar);
      };

      socket.on('calendarUpdate', calendarUpdateListener);

      return () => {
        socket.off('calendarUpdate', calendarUpdateListener);
        socket.disconnect();
      };
    }
  }, [socket]);

  const getGameCalendar = () => {
    return gameCalendar;
  }


  const value = {
    getGameCalendar
  };

  return (
    <GameCalendarContext.Provider value={value}>
      {children}
    </GameCalendarContext.Provider>
  );
};

export const useGameCalendar = () => {
  const context = useContext(GameCalendarContext);
  if (context === null) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};