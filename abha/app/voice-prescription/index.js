import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {useMutation} from 'react-query';
import {fetchPrescription} from './hooks';
import Voice from '@react-native-voice/voice';
import searchIcon from '../../assets/images/search.webp';
import microphone from '../../assets/images/microphone.png';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {scale} from '../utils';
import prescriptionIcon from '../../assets/images/prescription.webp';
import {isEmpty} from 'lodash';
const tags = ['PROBLEM', 'DRUG', 'STRENGTH', 'FREQUENCY', 'DURATION', 'TEST'];
const VoicePresciptionScreen = () => {
  const [prescription, setPrescription] = useState({});
  const [inputText, setInputText] = useState('');
  const [instructions, setInstructions] = useState('');
  const [stringTosearch, setStringTosearch] = useState('');

  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [loading, setLoading] = useState(false);
  const [partialResults, setPartialResults] = useState([]);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleInputTextChange = newText => {
    setInputText(newText);
  };

  const handleInstructionsChange = newText => {
    setInstructions(newText);
  };

  const onSpeechStart = e => {
    //Invoked when .start() is called without error
    setStarted('√');
  };

  const onSpeechEnd = e => {
    //Invoked when SpeechRecognizer stops recognition
    setEnd('√');
  };

  const onSpeechError = e => {
    //Invoked when an error occurs.
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = e => {
    //Invoked when SpeechRecognizer is finished recognizing
    setResults(e.value);
  };

  const onSpeechPartialResults = e => {
    //Invoked when any results are computed
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = e => {
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
      setPrescription({});
      setShowResults(false);
      setInputText('');
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
      setPrescription({});
      setShowResults(false);
      setInputText('');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  useEffect(() => {
    if (
      (partialResults?.length > 0 && !!partialResults?.[0]) ||
      (results?.length > 0 && !!results?.[0])
    ) {
      setLoading(false);
    }
    // if (partialResults.length > 0 && !!partialResults?.[0]) {
    //   handleInputTextChange(partialResults?.[0]);
    // }
  }, [partialResults?.length, results?.length]);
  useEffect(() => {
    if (loading) {
      handleInputTextChange('loading...');
    }
  }, [loading]);

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

  const {mutate: fetchPrescriptionVoice, isLoading: loadingSuggestions} =
    useMutation((text) => fetchPrescription({text: text}), {
      onSuccess: data => {
        console.log('auto', data?.data);
        if (!isEmpty(data?.data)) {
          setPrescription(data?.data);
          setShowResults(true);
        }
      },
      onError: (error) => {
        console.log(error)
      },
    });

  const voiceResultsPress = async result => {
    if (!!result) {
      handleInputTextChange(result);
      setResults([]);
      setPartialResults([]);
      await fetchPrescriptionVoice(result);
    }
  };
  const handleClear = () => {
    destroyRecognizer();
    setResults([]);
    setPartialResults([]);
    setPrescription({});
    setInputText('');
  };
  useEffect(() => {
    if(!!instructions){
      let stringData=inputText+' '+instructions;
      setStringTosearch(stringData);
    }
  }, [instructions]);
  
  const getPlaceholderText = val => {
    const deviceWidth = Dimensions.get('screen').width;
    const totalLength = deviceWidth / (2 * 4.2);

    if (val?.length > parseInt(totalLength, 10)) {
      return `${val.substr(0, totalLength)}...`;
    }
    return val;
  };
  return (
    <View style={styles.containerView}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        {/* <TextInput
          // ref={textInputRef}
          // autoFocus={autoFocus}
          // onFocus={handleFocus}
          defaultValue={inputText}
          onChangeText={handleInstructionsChange}
          style={[styles.searchbarText]}
          placeholder={getPlaceholderText('Instructions')}
          // placeholderTextColor={colorCongratsRelation}
        /> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={startRecognizing} style={styles.iconView}>
            <FastImage
              source={microphone}
              style={styles.imageButton}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClear} style={styles.iconView}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      {!!inputText?.length && (
        <View>
          <View style={styles.inputTextView}>
            <Text
              style={{
                fontSize: scale(20),
              }}>{`Input : ${inputText}`}</Text>
          </View>

          {/* <View style={styles.selectView}>
            <SelectDropdown
              data={tags}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />

            <SelectDropdown
              data={inputText?.split(' ')}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View> */}
        </View>
      )}

      {partialResults?.map((result, index) => {
        return (
          <TouchableOpacity
          onPress={() => voiceResultsPress(result)}
            style={styles.resultEachContainer}
            key={`partial-result-${index}`}>
            <Text style={styles.textStyle}>{result}</Text>
          </TouchableOpacity>
        );
      })}
      {!!results?.length && (
        <View style={styles.resultView}>
          <Text
            style={{
              fontSize: scale(20),
            }}>{`Results`}</Text>
        </View>
      )}
      {results?.map((result, index) => {
        return (
          <TouchableOpacity
            onPress={() => voiceResultsPress(result)}
            style={styles.resultEachContainer}
            key={`partial-result-${index}`}>
            <Text style={styles.textStyle}>{result}</Text>
          </TouchableOpacity>
        );
      })}
{loadingSuggestions && <View>
  <Text>Generating Prescription...</Text>
  </View>}
      {showResults && !isEmpty(prescription?.prescriptionData) && (
        <View>
          
          <Text style={styles.headerText}>Generated Prescription:</Text>
          {!isEmpty(prescription?.pdfURL) && 
          <View style={
            {
              flexDirection:'row',
              alignItems:'center',
              justifyContent:'space-around'
            }
          }>
            <FastImage
          source={prescriptionIcon}
          resizeMode='contain'
          style={styles.prescriptionIcon}
          />
          <Text
          style={{textAlign:'center',
        width:scale(280)
        }}
          >
{prescription?.pdfURL}
    </Text>
    
    </View>
    }
          {Object.keys(prescription?.prescriptionData)?.map((key, index) => {
            return (
              <View
                key={`label${key}-${index}`}
                style={[
                  styles.prescriotionHeaders,
                  !isEmpty(prescription?.prescriptionData[key]) && {
                    borderBottomWidth: 0.5,
                  },
                ]}>
                {!isEmpty(prescription?.prescriptionData[key]) && (
                  <View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: scale(14),
                        marginVertical:scale(10)
                      }}>
                      {key}
                    </Text>
                    {prescription?.prescriptionData[key]?.map((res, index) => {
                      return (
                        <View key={`sublabel${index}`}>
                          <Text>
                            {res?.label}: {res?.text || res?.name}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};
export default VoicePresciptionScreen;
