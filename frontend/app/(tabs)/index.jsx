// app/(tabs)/index.jsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeView'; // Adjust paths as necessary
import SettingsView from './SettingsView';
import AnalyticsScreen from './AnalyticsView';
import LearningScreen from './LearnView';
import MoreScreen from './MoreView';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
     return (
          <Tab.Navigator>
               <Tab.Screen name="Home" component={HomeScreen} />
               <Tab.Screen name="Analytics" component={AnalyticsScreen} />
               <Tab.Screen name="Learning" component={LearningScreen} />
               <Tab.Screen name="More" component={MoreScreen} />
               <Tab.Screen name="Settings" component={SettingsView} />
          </Tab.Navigator>
     );
};

export default TabNavigator;
