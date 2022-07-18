import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import appLogo from '../../assets/images/logo.webp'
import nha from '../../assets/images/nha.webp'

import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
const ScreenHeader = ({title=''}) => {
  return (
    <View
      style={styles.title}>
      <FastImage
      source={appLogo}
      resizeMode='contain'
      style={styles.appLogo}
      />
       <FastImage
      source={nha}
      resizeMode='contain'
      style={styles.appLogo}
      />
    </View>
  );
};

ScreenHeader.defaultProps = {
    title:'BFHL',
}
ScreenHeader.propTypes = {
    title:PropTypes.string.isRequired
}
export default ScreenHeader;
