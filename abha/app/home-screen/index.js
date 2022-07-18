import {useNavigation} from '@react-navigation/native';
import React,{useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import ScreenHeader from '../screen-header';
import styles from './styles';
import records from '../../assets/images/records.webp';
import nha from '../../assets/images/nha.webp';
import search from '../../assets/images/search.webp';
import prescription from '../../assets/images/prescription.webp';

const HomeScreen =  () => {
  const navigation = useNavigation();

  return (
    <View style={styles.homeViewContainer}>
      <ScreenHeader title="BFHL" />
      <FastImage
        source={nha}
        resizeMode='contain'
        style={styles.nhaIcon}
      />
      <View style={styles.horizontalView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Search');
          }}
          style={styles.boxContainer}>
          <FastImage
            source={search}
            resizeMode="contain"
            style={styles.iconSize}
          />
          <Text style={styles.labeText}>My HSPs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('VoicePresciptionScreen');
          }}
          style={styles.boxContainer}>
          <FastImage
            source={prescription}
            resizeMode="contain"
            style={styles.iconSize}
          />
          <Text style={styles.labeText}>Doctor Voice Prescription</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default HomeScreen;
