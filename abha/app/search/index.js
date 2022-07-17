import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity,TouchableHighlight,Image,ScrollView} from 'react-native';
import Voice from '@react-native-voice/voice';
import microphone from '../../assets/images/microphone.png';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import ScreenHeader from '../screen-header';
import SearchBar from './search-bar';
import { useQuery } from 'react-query';
import useSearchResults from './hooks';
import fetchSearchResults from './hooks';
import axios from 'axios';

 const SearchScreen = () => {
  const [inputText, setInputText] = useState('');
  const handleSearchBarTextChange = newText => {
      setInputText(newText);
  };
  // useSearchResults();
  // const fetchData =async () =>{
  //   const { data } = await axios.get('https://bfhldevapigw.healthrx.co.in/labs/v1/admin/provider');
  //   console.log('api',data);
  // }
  // fetchData();
  const { data, isLoading, isSuccess } = useSearchResults();

  const [partialResults, setPartialResults] = useState([]);
  const [results, setResults] = useState([]);
  console.log(partialResults)
  return (
    <View>
      <SearchBar
          inputText={inputText}
          handleInputTextChange={handleSearchBarTextChange}
          placeholderText='Search Providers'
          // autoFocus
          partialResults={partialResults}
          setPartialResults={setPartialResults}
          flexSearch
          results={results}
          setResults={setResults}
      />
      {partialResults?.map((result, index) => {
            return (
              <TouchableOpacity
              onPress={()=>{
                if(!!result){
                  handleSearchBarTextChange(result)
                }
              }}
              style={styles.resultEachContainer}
              key={`partial-result-${index}`}
              >
              <Text
                
                style={styles.textStyle}>
                {result}
              </Text>
                  </TouchableOpacity>
            );
        })}
<View style={styles.resultHeader}>
      <Text
      style={styles.resultHeaderText}
      >
        Results
      </Text>
</View>
      {results?.map((result, index) => {
            return (
              <TouchableOpacity
              onPress={()=>{
                if(!!result){
                  handleSearchBarTextChange(result)
                }
              }}
              style={styles.resultEachContainer}
              key={`partial-result-${index}`}
              >
              <Text
                
                style={styles.textStyle}>
                {result}
              </Text>
                  </TouchableOpacity>
            );
        })}

    </View>
  )

}
export default SearchScreen;