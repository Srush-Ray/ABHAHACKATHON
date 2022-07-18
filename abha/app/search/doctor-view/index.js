import React from 'react'
import { Text,View } from 'react-native'
import PropTypes from 'prop-types';
import { useRoute } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import { scale } from '../../utils';
import ScreenHeader from '../../screen-header';
import inclinic from '../../../assets/images/inclinic.webp'
import video from '../../../assets/images/video.webp'

import { isEmpty } from 'lodash';

 const DoctorView = () => {
     const route=useRoute();
     const {item={},title='HSP'}=route?.params ||{};
     const {languages={},distance={},qualifications={},video_consult={},experience={},gender={},in_clinic={},online_status={},name = {}, photo = {}, fees = {},specialities={}} = item || {};
  return (
      <View style={styles.viewContainer}>
<ScreenHeader
title={`HSP`}
/> 
<View style={styles.pageStyle}>
    <View  style={styles.doctorInfo}>
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
          <Text>
          <Text
            style={
                styles.degreeText
            }
            >
                Specialities:
            </Text> {specialities?.raw}
          </Text>
          <Text>
          <Text
            style={
                styles.degreeText
            }
            >
                Fees: 
            </Text> 
            {` ${fees?.raw}`}
         </Text>
        </View>
        </View>
        <View style={[styles.sectionView, styles?.experienceView]}>
<Text>
<Text
            style={
                styles.degreeText
            }
            >
                Experience:
            </Text>{` ${experience?.raw}`}
</Text>
            </View>
        <View style={styles.sectionView}>
            <Text>
            <Text
            style={
                styles.degreeText
            }
            >
                Gender:
            </Text> {`${gender?.raw.toLowerCase()}`}
            </Text>
        </View>
        <View style={styles.sectionView}>
            <Text>
            <Text
            style={
                styles.degreeText
            }
            >
                Distance:
            </Text> {`${distance?.raw.toLowerCase()}`}
            </Text>
        </View>

        <View style={styles.sectionView}>
            <View style={styles.rowView}>

            {!isEmpty(in_clinic) && `${in_clinic?.raw}`==='true' && <View style={
                styles.clinicView
            }>
                <FastImage
                source={inclinic}
                resizeMode='contain'
                style={styles.iconStyle}
                />
                <Text>
                    Inclinic
                </Text>
            </View>}
            {!isEmpty(video_consult) && `${video_consult?.raw}`==='true' && <View style={
                styles.clinicView
            }>
                <FastImage
                source={video}
                resizeMode='contain'
                style={styles.iconStyle}
                />
                <Text>
                    Video Consult
                </Text>
            </View>}
            </View>

        </View>
        <View style={styles.sectionView}>
            <Text
            style={
                styles.degreeText
            }
            >
                Degrees:
            </Text>
            {qualifications?.raw?.map((q)=>{
                const data=JSON.parse(q);
                console.log(data)
                return <View
                key={`index${q}`}
                >
                    <Text>
                        {data?.degree}
                    </Text>
                    </View>
            })}
        </View>
        <View style={styles.sectionView}>
            <Text
            style={
                styles.degreeText
            }
            >
                Languages:
            </Text>
            {languages?.raw?.map((q)=>{
                return <View
                key={`index${q}`}
                >
                    <Text>
                        {q}
                    </Text>
                    </View>
            })}
        </View>
        </View>
      </View>

  )
}
DoctorView.propTypes = {
}
DoctorView.defaultProps = {
}

export default DoctorView;