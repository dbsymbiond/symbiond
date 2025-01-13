import { StyleSheet, Text, View } from "react-native";
import { useGameTime } from "../context/GameTimeContext";
import { useGameDate } from "../context/GameDateContext";
import { getFormattedDateTime } from "../utils/datetime";
import { useLocalization } from "../context/LocalizationContext";


function DateTime() {
  const { i18n } = useLocalization();
  const { getCurrentDate } = useGameDate();
  const { getCurrentTime } = useGameTime();
  const currentTime = getCurrentTime();
  const currentDate = getCurrentDate();

  const formattedDateTime = (currentDate && currentTime)
    ? getFormattedDateTime(currentDate, currentTime, i18n)
    : { date: '', time: '' };

  return (
    <View style={styles.dateTimeContainer}>
      <Text testID="game-date" style={styles.dateText}>
        {formattedDateTime.date}
      </Text>
      <Text testID="game-time" style={styles.timeText}>
        {formattedDateTime.time}
      </Text>
    </View>
  )
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