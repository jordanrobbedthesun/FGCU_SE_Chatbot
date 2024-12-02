// In your AppNavigator file (Stack or Tab Navigator)
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../app/(tabs)/HomeView'; // Adjust paths
import SettingsScreen from '../../app/(tabs)/SettingsView'; // Adjust paths
import AnalyticsScreen from '../../app/(tabs)/AnalyticsView'; // Adjust paths
import LearningScreen from '../../app/(tabs)/LearnView'; // Adjust paths
import MoreScreen from '../../app/(tabs)/MoreView'; // Adjust paths

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
     return (
          <Tab.Navigator>
               <Tab.Screen name="Home" component={HomeScreen} />
               <Tab.Screen name="Settings" component={SettingsScreen} />
               <Tab.Screen name="Analytics" component={AnalyticsScreen} />
               <Tab.Screen name="Learning" component={LearningScreen} />
               <Tab.Screen name="More" component={MoreScreen} />

          </Tab.Navigator>
     );
};

export default AppNavigator;
