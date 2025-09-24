import { StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Paises from './Screens/Paises';
import Maravillas from './Screens/Maravillas';

export default function App() {
  const Tab = createBottomTabNavigator();

  const TabNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: '#f48b28',
        tabBarActiveTintColor: '#633204',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Screen1')
            iconName = Platform.OS === 'ios' ? 'home-outline' : 'home';
          else if (route.name === 'Screen2')
            iconName = Platform.OS === 'ios' ? 'list-outline' : 'list';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Paises" component={Paises} />
      <Tab.Screen name="Maravillas" component={Maravillas} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <TabNavigator/>
    </NavigationContainer>
  );
}
