import axios from 'axios';

export const fetchPrescription = data => {
    console.log(data,'data')
    return axios.post(
      'https://bfhldevapigw.healthrx.co.in/uhi-voice-prescription/uhi-voicener/inference/stanza',
      data,
    );
  };