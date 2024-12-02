import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeView from './HomeView'; // Assuming HomeView doesn't introduce a header bar

const ContentView = () => {
  return (
    <View style={styles.container}>
      <HomeView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20, // Padding to the bottom
  },
});

export default ContentView;
