import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import CalendarScreen from '../../screens/CalendarScreen';
import { useLocalization } from '../../context/LocalizationContext';

const Stack = createNativeStackNavigator();
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

const UnauthenticatedStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen component={TabNavigator} name="Home" />
    </Stack.Navigator>
  );
}

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
      <UnauthenticatedStack />
    </NavigationContainer>
  );
}

export default Navigation;