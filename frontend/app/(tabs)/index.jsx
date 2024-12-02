// app/(tabs)/index.jsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeView'; // Adjust paths as necessary

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
     return (
          <Tab.Navigator>
               <Tab.Screen name="Home" component={HomeScreen} />
          </Tab.Navigator>
     );
};

export default TabNavigator;
