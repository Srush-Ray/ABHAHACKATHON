import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {scale} from '../../utils';
import {useNavigation} from '@react-navigation/native';

const SearchCard = ({item = {}, title = ''}) => {
  const navigation = useNavigation();

  const {name = {}, photo = {}, fees = {}} = item || {};
  return (
    <View>
      <TouchableOpacity
        style={styles.doctorInfo}
        onPress={() => {
          navigation.navigate('DoctorView', {item: item, title: title});
        }}>
        <FastImage
          source={{uri: photo?.raw}}
          resizeMode="contain"
          style={styles?.resultImage}
        />
        <View
          style={{
            paddingLeft: scale(10),
          }}>
          <Text
            style={{
              fontWeight: 'bold',
            }}>
            {name?.raw}
          </Text>
          <Text>{fees?.raw}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.line} />
    </View>
  );
};
SearchCard.propTypes = {
  item: PropTypes.object,
  title: PropTypes.string,
};
SearchCard.defaultProps = {
  item: {},
  title: '',
};
export default SearchCard;

/* {finalSearchResult?.map((result,index)=>{
        const {
            name={},
            photo={},
            fees={}
        }=result || {};
        return (
             <View
             style={styles.doctorInfo}
             >
               <FastImage
                source={{uri:photo?.raw}}
                resizeMode='contain'
                style={styles?.resultImage}
               />
               <View 
               style={{
                 paddingLeft:scale(10)
               }}>
               <Text
               style={{
                 fontWeight:'bold',
               }}
               >
                 {name?.raw}
               </Text>
               <Text>
                 {fees?.raw}
               </Text>
               </View>
             </View>
           )
         })
       }  */
