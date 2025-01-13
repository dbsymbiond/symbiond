import { StyleSheet, View, Text } from "react-native";
import { MONTH_NAMES, WEEKDAY_NAMES } from '../../utils/constants/calendar';
import { useGameDate } from "../../context/GameDateContext";

const CalendarMonth = ({ month, index }) => {
  const { getCurrentDate } = useGameDate();
  const currentDate = getCurrentDate();
  const weekdayHeaders = WEEKDAY_NAMES;

  const getEmptyCells = (month) => {
    switch (month.days[0].weekday) {
      case 'Primday':
        return 0;
      case 'Duday':
        return 1;
      case 'Triday':
        return 2;
      case 'Quaday':
        return 3;
      case 'Penday':
        return 4;
      case 'Hexday':
        return 5;
      default:
        return 0;
    }
  };

  return (
    <View style={styles.page} key={index}>
      {
        <View style={styles.monthContainer}>
          <Text style={styles.monthHeader}>
            <View style={styles.monthContainer}>
              <Text style={styles.monthHeader}>{month.name}</Text>

              <View style={styles.weekdayHeader}>
                {weekdayHeaders.map((day, index) => (
                  <Text key={index} style={styles.weekdayText}>
                    {day}
                  </Text>
                ))}
              </View>
              <View style={styles.dayGrid}>
                {Array.from({ length: getEmptyCells(month) }).map((_, index) => (
                  <View key={`empty-${index}`} style={styles.dayCell} />
                ))}
                {month.days.map((day) => {
                  const isToday = month.name === MONTH_NAMES[currentDate.month - 1] && currentDate.day === day.dayOfMonth;
                  return (
                    <View
                      key={day.dayOfMonth}
                      style={[
                        styles.dayCell,
                        isToday && styles.todayContainer
                      ]}
                    >
                      <View style={styles.dayTextContainer}>
                        <Text style={[styles.dayText, isToday && styles.todayText]}>{day.dayOfMonth}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </Text>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthContainer: {
    padding: 10
  },
  monthHeader: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'CormorantGaramond-Bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  weekdayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weekdayText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 12,
    color: '#6DA34D',
    width: '16.66%',
    fontFamily: 'CormorantGaramond-SemiBold',
    marginBottom: 5
  },
  dayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  dayCell: {
    width: '16.66%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#E9E0D2'
  },
  dayTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'CormorantGaramond-Regular',
  },
  dayProgress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#6DA34D',
    zIndex: 1
  },
  todayContainer: {
    backgroundColor: '#E9E0D2',
    borderColor: '#5C8B41',
    borderWidth: 4,
    zIndex: 2
  },
  todayText: {
    color: '#6DA34D',
    zIndex: 3,
    fontWeight: '700'
  }
});

export default CalendarMonth;