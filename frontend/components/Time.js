import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { io } from 'socket.io-client';

function Time() {
  const [currentGameTime, setCurrentGameTime] = useState(null);

  useEffect(() => {
    const socket = io(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:3000/`);
    socket.on('timeUpdate', (data) => {
      setCurrentGameTime(data.time);
    });

    return () => {
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