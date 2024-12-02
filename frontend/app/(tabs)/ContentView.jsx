import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import HomeView from './HomeView';
import SettingsView from './SettingsView';
import AnalyticsView from './AnalyticsView';
import LearnView from './LearnView';
import MoreView from './MoreView';
import CustomTabBar from './CustomTabBar';

const ContentView = () => {
  const [selectedTab, setSelectedTab] = useState(2); // Default to Home

  // Function to render the correct view based on the selected tab
  const renderView = () => {
    switch (selectedTab) {
      case 0:
        return <SettingsView />;
      case 1:
        return <AnalyticsView />;
      case 2:
        return <HomeView />;
      case 3:
        return <LearnView />;
      case 4:
        return <MoreView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <View style={styles.container}>
      {renderView()} {/* Render the selected view */}
      <CustomTabBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} /> {/* Custom Tab Bar */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20, // Add some padding to the bottom
  },
});

export default ContentView;
