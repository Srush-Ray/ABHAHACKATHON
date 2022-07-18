import uvicorn
from loguru import logger
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
import pickle
import os
import json
import requests
from lingua import Language, LanguageDetectorBuilder
import translators as ts

app = FastAPI()

class userRequest(BaseModel):
    query: str

def get_latlong(city):

    url = f"http://dev.virtualearth.net/REST/v1/Locations?adminDistrict={city}&key={bingmap_apikey}"
    payload={}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)
    resp = json.loads(response.text)
    
    if len(resp['resourceSets']) > 0:
        latlong = resp['resourceSets'][0]['resources'][0]['point']['coordinates']
        return latlong

def get_correct_text(input_text):

    url = f"https://api.cognitive.microsoft.com/bing/v7.0/spellcheck?text={input_text}"
    payload={}
    headers = {
    'Ocp-Apim-Subscription-Key': f'{bing_spellcheck}'
    }

    response = requests.request("GET", url, headers=headers, data=payload)
    resp = json.loads(response.text)

    if len(resp['flaggedTokens']) > 0:
        for i in resp['flaggedTokens']:
            input_text = input_text.replace(i['token'],i['suggestions'][0]['suggestion'])

    return input_text

def suggester(text):

    url = "https://my-deployment-19d1f0.ent.us-central1.gcp.cloud.es.io/api/as/v1/engines/uhi-search-doctor/query_suggestion"

    payload = json.dumps({
    "query": f"{text}",
    "types": {
        "documents": {
        "fields": [
            "name",
            "specialities",
            "symptoms"
        ]
        }
    },
    "size": 3
    })
    headers = {
    'Content-Type': 'application/json',
    'Authorization': f'{elasti_private_key}'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    resp = json.loads(response.text)
    return resp['results']

def doctor_search(obj):

    fields = list(obj.keys())
    if len(fields) > 0:
        spec_name = ''
        url = "https://my-deployment-19d1f0.ent.us-central1.gcp.cloud.es.io/api/as/v1/engines/uhi-search-doctor/search"
        
        if (len(fields) == 1):
            if ('Specialization' in fields) or ('spec' in fields):
                spec_name = obj[fields[0]]
                payload = json.dumps({
                    "query": f"{spec_name}"
                    })
        
        else:
            if 'Specialization' in fields:
                spec_name = obj['Specialization']
            elif 'spec' in fields:
                spec_name = obj['spec']

            coords = obj['lat-long']

            payload = json.dumps({
                "query": f"{spec_name}",
                "filters": {
                    "all": [
                    {
                        "geo_coordinates": {
                        "center": f"{coords}",
                        "distance": 30,
                        "unit": "km"
                        }
                    }
                    ]
                }
                })

        headers = {
        'Content-Type': 'application/json',
        'Authorization': f'{elasti_private_key}'
        }
        print(payload)
        response = requests.request("POST", url, headers=headers, data=payload)
        resp = json.loads(response.text)
        return resp['results']
    
    else:
        return []

def get_entity(input_text):

    url = "http://20.235.68.194:5005/model/parse"

    payload = json.dumps({
    "text": f"{input_text}"
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    resp = json.loads(response.text)
    return resp

@app.get("/")
def home():
    return {'Status':'ABHA Working'}

@app.post("/send-suggestion")
def get_text(uR: userRequest):

    input_text = uR.query
    if len(input_text) > 0:
        logger.info('Suggestion Text received')

        res = suggester(input_text)
        return res

@app.post("/send-request")
def get_text(uR: userRequest):

    input_text = uR.query
    if len(input_text) > 0:
        logger.info('Input Text received')

    try:
        languages = [Language.ENGLISH, Language.HINDI]
        detector = LanguageDetectorBuilder.from_languages(*languages).build()
        lang = str(detector.detect_language_of(input_text)).replace('Language.','')

        if lang != 'ENGLISH':
            input_text = ts.google(input_text, from_language='hi',to_language='en')
    except Exception as e:
        logger.info(e)

    input_text = get_correct_text(input_text)
    logger.info('Spell check done: '+str(input_text))
    
    result = get_entity(input_text)

    ent_val = {}
    for i in result['entities']:
        if i['confidence_entity'] > 0.50:
            ent_val[i['entity']] = i['value']

            if i['entity'] == 'Location':
                lat_long = get_latlong(i['value'])
                ent_val['lat-long'] = f'{lat_long[1]}, {lat_long[0]}'
            
            if i['entity'] == 'distance':
                ent_val['lat-long'] = '74.06, 18.57'
    
    logger.info('NER Done')

    obj = {}
    spec_list = ['Dentist', 'Cardiologist', 'General Physician', 'Dermatologist', 'ENT', 'Pulmonologist', 'Obstetrician/gynecologists', 'Endocrinologists', 'Nephrologists', 'Rheumatologists', 'Orthopedic']
    for k,v in ent_val.items():
        if k == 'Specialization':
            obj['Specialization'] = v
        elif  k == 'lat-long':
            obj['lat-long'] = v
        else:
            if k in spec_list:
                obj['spec'] = k
    
    final_res = doctor_search(obj)
    return final_res

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, log_level="info")
