import { StyleSheet } from 'react-native';

// context
import { GameCalendarProvider } from './context/GameCalendarContext';
import { GameTimeProvider } from './context/GameTimeContext';
import { WebSocketProvider } from './context/WebSocketContext';
import { GameDateProvider } from './context/GameDateContext';
import { LocalizationProvider } from './context/LocalizationContext';

// components
import Navigation from './components/Navigation/Navigation';


function App() {

  return (
    <WebSocketProvider>
      <LocalizationProvider>
        <GameDateProvider>
          <GameTimeProvider>
            <GameCalendarProvider>
              <Navigation />
            </GameCalendarProvider>
          </GameTimeProvider>
        </GameDateProvider>
      </LocalizationProvider>
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