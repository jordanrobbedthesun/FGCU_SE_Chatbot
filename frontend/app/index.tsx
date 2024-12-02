import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './(tabs)/HomeView';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="FGCU Helper"
          component={HomeScreen}
          options={{ headerShown: false }} // Hides the top bar
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
