/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import type {Node} from 'react';
import HomeScreen from './app/home-screen/index';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import SearchScreen from './app/search/index';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { QueryClient, QueryClientProvider } from 'react-query';

LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>

       <Stack.Navigator
            initialRouteName="App"
            screenOptions={{
              headerShown: false,
            }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
                 <Stack.Screen name="Search" component={SearchScreen} />
              </Stack.Navigator>
                </QueryClientProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
