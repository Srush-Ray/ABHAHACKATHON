import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity,TouchableHighlight,Image,ScrollView} from 'react-native';
import Voice from '@react-native-voice/voice';
import microphone from '../../../assets/images/microphone.png';
import styles from './styles';
import FastImage from 'react-native-fast-image';

 const VoiceScreen =()=> {

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={startRecognizing}>

          <FastImage
            source={microphone}
            style={styles.imageButton}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  )

}
export default VoiceScreen;