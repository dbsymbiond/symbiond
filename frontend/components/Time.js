import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { io } from 'socket.io-client';

function Time() {
  const [currentGameTime, setCurrentGameTime] = useState(null);

  useEffect(() => {
    const socket = io(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:3000/`);
    const timeUpdateListener = (data) => {
      setCurrentGameTime(data.time);
    };
    socket.on('timeUpdate', timeUpdateListener);

    return () => {
      socket.off('timeUpdate', timeUpdateListener);
      socket.disconnect();
    };
  }, []);

  return (
    <View>
      <Text>
        {currentGameTime && `${currentGameTime}`}
      </Text>
    </View>
  )
}

export default Time