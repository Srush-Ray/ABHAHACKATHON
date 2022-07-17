import { StyleSheet } from 'react-native';
import { scale,verticalScale } from '../../utils';
const white = '#FFF';
const blueberry='#5C2D90';
const pinkGrey='#c4c4c4';
const colorBlack2='#4B4B4B';

const styles = StyleSheet.create({
    container: {
        marginTop:scale(100),
        paddingHorizontal: scale(15),
        paddingBottom: verticalScale(15),
    },
    bottomBorder: {
        borderBottomWidth: scale(1),
        borderBottomColor: `${pinkGrey}a0`,
    },
    cardBasic: {
        backgroundColor: white,
        borderRadius: scale(10),
    },
    searchBarIconContainer: { alignItems: 'center', flex: 1 },
    searchView: {
        
    },
    focusedSearchView: {
        borderColor: blueberry,
        borderWidth: scale(0.5),
        borderTopWidth: scale(0.5),
        borderLeftWidth: scale(0.5),
        borderRightWidth: scale(0.5),
        borderBottomWidth: scale(0.5),
    },
    searchIcon: {
        height: scale(18),
        width: scale(18),
        margin: scale(5),
        tintColor: colorBlack2,
    },
    imageButton: {
        width: scale(20),
        height: scale(20),
      },
    searcBarHighlight: {
        marginLeft: scale(5),
        borderRadius: scale(30),
        marginRight: scale(5),
    },
    searchbarText: {
        paddingVertical: verticalScale(7),
        flex: 1,
        paddingLeft: 0,
        color: colorBlack2,
        textAlign: 'left',
        fontSize: scale(12),
        // width:scale(130)
    },
    searchViewContainer:{
        marginTop:scale(10),
        paddingHorizontal:scale(10),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderBottomColor:'grey',
        borderBottomWidth:1,
    },
    flexSearch: {
        flex: 1,
        paddingHorizontal: scale(0),
        marginRight: scale(10),
    },
    imageCancel:{
        height: scale(15),
        width: scale(15),
    }
});

export default styles;
