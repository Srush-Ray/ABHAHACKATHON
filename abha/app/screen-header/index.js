import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
const ScreenHeader = ({title=''}) => {
  return (
    <View
      style={styles.title}>
        <Text style={styles.titleText}>
         {`${title}`}
        </Text>
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
