import { StyleSheet, Text, View } from "react-native";

// context
import { useGameTime } from "../context/GameTimeContext";
import { useGameDate } from "../context/GameDateContext";

// utils
import { getFormattedDateTime } from "../utils/datetime";


function DateTime() {
  const { getCurrentDate } = useGameDate();
  const { getCurrentTime } = useGameTime();
  const currentTime = getCurrentTime();
  const currentDate = getCurrentDate();
  let formattedDateTime = '';

  if (currentDate && currentTime) {
    formattedDateTime = getFormattedDateTime(currentDate, currentTime);
  }

  if (formattedDateTime) {
    return (
      <View style={styles.dateTimeContainer}>
        <Text testID="game-time" style={styles.dateText}>
          {formattedDateTime && formattedDateTime.date}
        </Text>
        <Text testID="game-date" style={styles.timeText}>
          {formattedDateTime && formattedDateTime.time}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dateTimeContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6DA34D',
    fontFamily: 'Georgia',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6DA34D',
    fontFamily: 'Georgia',
  }
});

export default DateTime;