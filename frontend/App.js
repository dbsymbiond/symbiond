
import { StyleSheet } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EvilIcons from '@expo/vector-icons/EvilIcons';

// screens
import CalendarScreen from './screens/CalendarScreen';

// context
import { GameCalendarProvider } from './context/GameCalendarContext';
import { GameTimeProvider } from './context/GameTimeContext';
import { WebSocketProvider } from './context/WebSocketContext';
import { GameDateProvider } from './context/GameDateContext';

const BottomTabs = createBottomTabNavigator({
  screens: {
    Calendar: {
      screen: CalendarScreen,
      options: {
        tabBarActiveTintColor: '#6DA34D',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#121212',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'CormorantGaramond-Regular'
        },
        headerStyle: {
          backgroundColor: '#121212',
        },
        headerTitleStyle: {
          color: '#FFFFFF'
        },
        headerTintColor: '#FFFFFF',
        tabBarIcon: ({ focused, color, size }) => (
          <EvilIcons name='calendar' size={size} color={color} />
        )
      }
    }
  }
});

const TabNavigator = createStaticNavigation(BottomTabs);

function App() {
  console.log('app');
  return (
    <WebSocketProvider>
      <GameDateProvider>
        <GameTimeProvider>
          <GameCalendarProvider>
            <TabNavigator />
          </GameCalendarProvider>
        </GameTimeProvider>
      </GameDateProvider>
    </WebSocketProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default App;