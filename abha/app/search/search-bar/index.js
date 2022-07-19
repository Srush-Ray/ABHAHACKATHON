/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, TextInput, TouchableHighlight,TouchableOpacity, View } from 'react-native';
import searchIcon from '../../../assets/images/search.webp';
import crossImage from '../../../assets/images/cancel.jpeg';
import FastImage from 'react-native-fast-image';
import microphone from '../../../assets/images/microphone.png';
import Voice from '@react-native-voice/voice';
// import Card from './card';
import styles from './styles';
import { Text } from 'native-base';
import { scale } from '../../utils';

const greyWhite='#eee';
const colorCongratsRelation='#979797';
const colorBlack3='#707070';
const SearchBar = ({
    handleOnFocus,
    handleInputTextChange,
    inputText,
    placeholderText,
    autoFocus,
    withBottomBorder,
    leftCta,
    flexSearch,
    setPartialResults,
    partialResults,
    results,
    setResults,
    handleIconPress,
    clearData
}) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const textInputRef = useRef();

    const handleFocus = () => {
        setIsInputFocused(true);
        handleOnFocus(textInputRef, () => {
            textInputRef?.current?.blur();
            setIsInputFocused(false);
        });
    };

    const handleLeftIconPress = () => {
        // textInputRef.current.focus();
        handleIconPress();
    };

    const handleRightIconPress = () => {
        textInputRef.current.clear();
        handleInputTextChange('');
        clearData();
    };

    const getPlaceholderText = val => {
        const deviceWidth = Dimensions.get('screen').width;
        const totalLength = deviceWidth / (2 * 4.2);

        if (val?.length > parseInt(totalLength, 10)) {
            return `${val.substr(0, totalLength)}...`;
        }
       
        return val;
    };
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [loading, setLoading] = useState(false);

//   const [results, setResults] = useState([]);

  const onSpeechStart = (e) => {
    //Invoked when .start() is called without error
    setStarted('√');
  };
 
  const onSpeechEnd = (e) => {
    //Invoked when SpeechRecognizer stops recognition
    setEnd('√');
  };
 
  const onSpeechError = (e) => {
    //Invoked when an error occurs.
    setError(JSON.stringify(e.error));
  };
 
  const onSpeechResults = (e) => {
    //Invoked when SpeechRecognizer is finished recognizing
    setResults(e.value);

  };
 
  const onSpeechPartialResults = (e) => {
    //Invoked when any results are computed
    setPartialResults(e.value);
  };
 
  const onSpeechVolumeChanged = (e) => {
    //Invoked when pitch that is recognized changed
    setPitch(e.value);
  };
 
  const startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    try {
      await Voice.start('en-US');
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
      setLoading(true);
      handleInputTextChange('')
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };
 
  const stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };
 
  const cancelRecognizing = async () => {
    //Cancels the speech recognition
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };
 
  const destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  }; 
  useEffect(() => {
    if((partialResults?.length>0 && !!partialResults?.[0]) || (results?.length>0 && !!results?.[0])){
        setLoading(false);
    }
    if(partialResults.length>0 && !!partialResults?.[0]){
        handleInputTextChange(partialResults?.[0]);
    }
  }, [partialResults?.length,results?.length])
  useEffect(() => {
    if(loading){
        handleInputTextChange('...');
    }
  }, [loading])
  
   useEffect(() => {
    //Setting callbacks for the process status
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
 
    return () => {
      //destroy the process after switching the screen
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

    return (
       <View
       style={styles.searchViewContainer}
       >
         <View 
         style={styles.searchBar}
         >
        <TouchableHighlight
                        style={styles.searcBarHighlight}
                        underlayColor={greyWhite}
                        onPress={handleLeftIconPress}
                        testID="components-custom-search-bar-index-touchablehighlight-3"
                        accessibilityLabel="components-custom-search-bar-index-touchablehighlight-5">
                        <FastImage
                            resizeMode="contain"
                            style={styles.searchIcon}
                            source={searchIcon}
                            testID="search-bar-container"
                            accessibilityLabel="search-bar-container"
                        />
                    </TouchableHighlight>
                    <TextInput
                        ref={textInputRef}
                        autoFocus={autoFocus}
                        onFocus={handleFocus}
                        defaultValue={inputText}
                        onChangeText={handleInputTextChange}
                        style={[styles.searchbarText, leftCta ? { paddingLeft: scale(10) } : {}]}
                        placeholder={getPlaceholderText(placeholderText)}
                        placeholderTextColor={colorCongratsRelation}
                        testID="search-bar-input"
                        accessibilityLabel="search-bar-input"
                         />
                          <TouchableOpacity onPress={startRecognizing}>
          {/* <Image
            style={styles.imageButton}
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',
            }}
          /> */}
          <FastImage
            source={microphone}
            style={styles.imageButton}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {inputText?.length > 0 && (
                    <TouchableHighlight
                        underlayColor={greyWhite}
                        style={styles.searcBarHighlight}
                        onPress={handleRightIconPress}
                        testID="components-custom-search-bar-index-touchablehighlight-4"
                        accessibilityLabel="components-custom-search-bar-index-touchablehighlight-8">
                           
                        <View
                            style={styles.searchIcon}
                            testID="components-custom-search-bar-index-view-5"
                            accessibilityLabel="components-custom-search-bar-index-view-10">

                               <FastImage
                               source={crossImage}
                               resizeMode='contain'
                               style={styles.imageCancel}
                           />
                                

                        </View>
                    </TouchableHighlight>
                )}
        </View>

       </View>
    );
};

SearchBar.propTypes = {
    handleOnFocus: PropTypes.func,
    handleInputTextChange: PropTypes.func,
    inputText: PropTypes.string,
    placeholderText: PropTypes.string,
    autoFocus: PropTypes.bool,
    withBottomBorder: PropTypes.bool,
    leftCta: PropTypes.node,
    flexSearch: PropTypes.bool,
    partialResults:PropTypes.array,
    setPartialResults:PropTypes.func,
    results:PropTypes.array,
    setResults:PropTypes.func,
    handleIconPress:PropTypes.func,
    clearData:PropTypes.func
};

SearchBar.defaultProps = {
    handleOnFocus: () => {},
    handleInputTextChange: () => {},
    inputText: '',
    placeholderText: '',
    autoFocus: false,
    withBottomBorder: true,
    leftCta: null,
    flexSearch: false,
    partialResults:[],
    setPartialResults:()=>{},
    results:[],
    setResults:()=>{},
    handleIconPress:()=>{},
    clearData:()=>{}
};

export default SearchBar;
