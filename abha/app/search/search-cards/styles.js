import {StyleSheet} from 'react-native';
import {scale} from '../../utils';

const styles = StyleSheet.create({
    doctorInfo:{
        flexDirection:'row',
        paddingVertical:scale(10),
        paddingHorizontal:scale(30),
      },
      resultImage:{
        width: 50,
        height: 50,
      },
      resultHeaderText:{
        fontWeight:'bold',
        color:'grey'
      },
      line:{
          justifyContent:'center',
          alignSelf:'center',
          width:'90%',
          borderBottomColor:'grey',
          borderWidth:0.5,
      }
});

export default styles;
