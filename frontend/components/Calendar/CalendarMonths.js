import { useRef } from "react";
import { StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

// components
import CalendarMonth from "./CalendarMonth";

// context
import { useGameCalendar } from "../../context/GameCalendarContext";
import { useGameDate } from "../../context/GameDateContext";

const CalendarMonths = () => {
  const { getGameCalendar } = useGameCalendar();
  const { getCurrentDate } = useGameDate();

  const pagerRef = useRef(null);
  const calendar = getGameCalendar();
  const date = getCurrentDate();

  if (calendar && date) {
    return (
      <PagerView
        ref={pagerRef}
        style={styles.container}
        initialPage={date.month - 1}
      >
        {
          calendar.map((month, index) => (
            <CalendarMonth month={month} index={index} key={index} />
          ))
        }
      </PagerView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  }
})

export default CalendarMonths;