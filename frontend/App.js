
import { View, StyleSheet } from 'react-native';

import Time from './components/Time';
import Date from './components/Date';

function App() {
  return (
    <View style={styles.container}>
      <Date />
      <Time />
    </View>
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