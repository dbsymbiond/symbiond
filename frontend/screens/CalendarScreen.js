import { View } from "react-native";
import Calendar from "../components/Calendar/Calendar";

const CalendarScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'pink' }}>
      <Calendar />
    </View>
  );
}

export default CalendarScreen;