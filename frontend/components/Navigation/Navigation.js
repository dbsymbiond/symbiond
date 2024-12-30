import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EvilIcons from '@expo/vector-icons/EvilIcons';

// screens
import CalendarScreen from '../../screens/CalendarScreen';
import { useLocalization } from '../../context/LocalizationContext';

const BottomTabs = createBottomTabNavigator();

const CalendarScreenOptions = () => {
  const { i18n } = useLocalization();
  const tabBarString = i18n.t('calendar.tabTitle');
  const headerString = i18n.t('calendar.headerTitle');

  return {
    tabBarActiveTintColor: '#6DA34D',
    tabBarInactiveTintColor: '#666666',
    tabBarStyle: {
      backgroundColor: '#121212',
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontFamily: 'CormorantGaramond-Regular'
    },
    tabBarLabel: tabBarString,
    headerTitle: headerString,
    headerStyle: {
      backgroundColor: '#121212',
    },
    headerTitleStyle: {
      color: '#FFFFFF'
    },
    headerTintColor: '#FFFFFF',
    tabBarIcon: ({ color, size }) => (
      <EvilIcons name='calendar' size={size} color={color} />
    )
  };
};

const TabNavigator = () => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name="Calendar"
        component={CalendarScreen}
        options={CalendarScreenOptions()}
      />
    </BottomTabs.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

export default Navigation;