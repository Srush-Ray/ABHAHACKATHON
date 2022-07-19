import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ScrollView,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import microphone from '../../assets/images/microphone.png';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import ScreenHeader from '../screen-header';
import SearchBar from './search-bar';
import {useMutation, useQuery} from 'react-query';
import { fetchSearchResultsQuery, fetchSelectedResultsQuery } from './hooks';
import fetchSearchResults from './hooks';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import {scale, useDebounce} from '../utils';
import mockData from './mockdata';
import {isEmpty} from 'lodash';
import searchMock from './search-mock';
import SearchCard from './search-cards';
const tags = ['PROBLEM', 'DRUG', 'STRENGTH', 'FREQUENCY', 'DURATION', 'TEST'];
const SearchScreen = () => {
  const [inputText, setInputText] = useState('');
  const [autoSuggest, setAutoSuggest] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [finalSearchResult, setFinalSearchResult] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const debounceSearchText = useDebounce(inputText, 500);

  const handleSearchBarTextChange = newText => {
    setInputText(newText);
  };


  const {mutate: searchAutoSuggest, isLoading:loadingSuggestions} = useMutation(
    () => fetchSearchResultsQuery({query: debounceSearchText}),
    {
      onSuccess: data => {
        console.log('auto', data?.data);
        if (!isEmpty(data?.data) && data?.data?.documents?.length > 0) {
          setAutoSuggest(data?.data?.documents);
        }
      },
      onError: () => {
        
      },
    },
  );

  const {mutate: searchSelected, isLoading:loadingSelected} = useMutation(
    () => fetchSelectedResultsQuery({query: inputText}),
    {
      onSuccess: data => {
        console.log('search', data?.data);
        if (!isEmpty(data?.data)) {
          setSearchResult(data?.data);
          setShowResults(true);
        }
      },
      onError: () => {
          setSearchResult([searchMock]);
          setShowResults(true);
      },
    },
  );

  // const fetchSelectedData = async () => {
  //   console.log('here checlk', inputText);
  //   const {data} = await axios.post(
  //     'https://bfhldevapigw.healthrx.co.in/uhi-intelligent-search/send-request',
  //     {query: inputText},
  //   );
  //   setSearchResult(data);
  // };
  // useEffect(() => {
  //   if (!isEmpty(searchResult)) {
  //     setFinalSearchResult(searchResult);
  //   }
  // }, [searchResult]);

  useEffect(() => {
    if (debounceSearchText?.length > 0) searchAutoSuggest();
  }, [debounceSearchText]);

  // const { data, isLoading, isSuccess } = useSearchResults();

  const handleAutoSuggestClick = async (suggest) => {
    if (!!suggest?.suggestion) {
      handleSearchBarTextChange(suggest?.suggestion);
      setResults([]);
      setAutoSuggest([]);
      await searchSelected();
    }
  };
  useEffect(() => {
    if(autoSuggest?.length>0){
      if(!!autoSuggest?.[0]?.suggestion){
        searchSelected();
      }
    }
  }, [autoSuggest?.length])
  
  const clearData = () => {
    setPartialResults([]);
    setResults([]);
    setSearchResult([]);
    setShowResults(false);
    setAutoSuggest([]);
  };
  const voiceResultsPress=async(result)=>{
      if (!!result) {
        handleSearchBarTextChange(result);
        setResults([]);
      }
  }
  return (
    <View>
      <SearchBar
        inputText={inputText}
        handleInputTextChange={handleSearchBarTextChange}
        placeholderText="Search HSPs"
        partialResults={partialResults}
        setPartialResults={setPartialResults}
        flexSearch
        results={results}
        setResults={setResults}
        clearData={clearData}
      />

      {partialResults?.map((result, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              if (!!result) {
                handleSearchBarTextChange(result);
              }
            }}
            style={styles.resultEachContainer}
            key={`partial-result-${index}`}>
            <Text style={styles.textStyle}>{result}</Text>
          </TouchableOpacity>
        );
      })}
{showResults &&        <View 
        style={{
          borderBottomColor:'black',
          borderWidth:0.5,
        }}
        />}
{showResults && 
<View>
<View
style={styles.suggestTextView}
>
<Text>Suggestions:</Text>
</View>
</View>
}
      {results?.map((result, index) => {
        return (
          <TouchableOpacity
            onPress={()=>voiceResultsPress(result)}
            style={styles.resultEachContainer}
            key={`partial-result-${index}`}>

            <Text style={styles.textStyle}>{result}</Text>

          </TouchableOpacity>
        );
      })}
      {autoSuggest?.map((suggest, index) => {
        return (
          <TouchableOpacity
            onPress={() => handleAutoSuggestClick(suggest)}
            style={styles.resultEachContainer}
            key={`partial-result-${index}`}>
            <Text style={styles.textStyle}>{suggest?.suggestion}</Text>
          </TouchableOpacity>
        );
      })}

{showResults && (
        <View style={styles.resultHeader}>
          <Text style={styles.resultHeaderText}>Results</Text>
        </View>
      )}
     {showResults && <View>
      {searchResult?.map((res,index)=>{
          return(
            <View
            key={`key${index}`}
            >

            <SearchCard
            item={res}
            title={inputText}
            />
            </View>
          )
        })
      }
      </View>
     }
    </View>
  );
};
export default SearchScreen;
