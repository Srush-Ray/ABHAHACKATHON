import React from 'react';
import {View, Text} from 'react-native';
import ScreenHeader from '../screen-header';
import styles from './styles';
const HomeScreen = () => {
  return (
    <View style={styles.homeViewContainer}>
   <ScreenHeader title='BFHL'/>
    </View>
  );
};
export default HomeScreen;
