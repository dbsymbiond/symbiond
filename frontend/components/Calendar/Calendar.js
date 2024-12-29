import { StyleSheet, View } from "react-native";

// components
import DateTime from "../DateTime";
import CalendarMonths from "./CalendarMonths";

const Calendar = () => {
  return (
    <View style={styles.container}>
      <DateTime />
      <CalendarMonths />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});

export default Calendar;