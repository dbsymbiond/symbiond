import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Foundation from '@expo/vector-icons/Foundation';
import CalendarScreen from '../../screens/CalendarScreen';
import { useLocalization } from '../../context/LocalizationContext';
import MapScreen from '../../screens/MapScreen';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ScreenOptions = (type) => {
  const { i18n } = useLocalization();
  let tabBarString = "";
  let headerString = "";

  switch (type) {
    case 'calendar':
      tabBarString = i18n.t('calendar.tabTitle');
      headerString = i18n.t('calendar.headerTitle');
      break;
    case 'map':
      tabBarString = i18n.t('map.tabTitle');
      headerString = i18n.t('map.headerTitle');
  }

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
    tabBarIcon: ({ color, size }) => {
      switch (type) {
        case 'calendar':
          return <EvilIcons name='calendar' size={size} color={color} />
        case 'map':
          return <Foundation name='map' size={size} color={color} />
      }
    }
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
        options={ScreenOptions('calendar')}
      />
      <BottomTabs.Screen
        name="Map"
        component={MapScreen}
        options={ScreenOptions('map')}
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