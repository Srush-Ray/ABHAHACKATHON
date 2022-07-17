import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
import ScreenHeader from '../screen-header';
import styles from './styles';
const HomeScreen = () => {
    const navigation=useNavigation();
  return (
    <View style={styles.homeViewContainer}>
   <ScreenHeader title='BFHL'/>
   <View style={styles.horizontalView}>
   <TouchableOpacity style={styles.boxContainer}
   onPress={()=>{
       navigation.navigate('Search');
   }}
   >
       <Text>
           My Records
       </Text>
   </TouchableOpacity>
   <TouchableOpacity 
   onPress={()=>{
    navigation.navigate('Search');
}}
   style={styles.boxContainer}>
       <Text>
           My Providers
       </Text>
   </TouchableOpacity>
   </View>
    </View>
  );
};
export default HomeScreen;
