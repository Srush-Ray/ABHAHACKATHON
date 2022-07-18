from fastapi import APIRouter, File, UploadFile
import pandas as pd
from io import StringIO
import pandas as pd
import spacy
import logging
import en_core_med7_trf
from spacy.training.example import Example
import subprocess
import random
import shutil

from helpers.azureblob import DirectoryClient

nlp = en_core_med7_trf.load()

CONNECTION_STRING = "BlobEndpoint=https://ebhmlstorage.blob.core.windows.net/;QueueEndpoint=https://ebhmlstorage.queue.core.windows.net/;FileEndpoint=https://ebhmlstorage.file.core.windows.net/;TableEndpoint=https://ebhmlstorage.table.core.windows.net/;SharedAccessSignature=sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-01-13T17:41:29Z&st=2021-11-08T09:41:29Z&spr=https&sig=Ew4f1JMe6KmBP5QLq7zJ3f1QUAKxnwuCj0FVeCelFN8%3D"
CONTAINER_NAME = "ebhmcontainer"

logging.basicConfig(filename='Trainlogs.txt',
                            filemode='a',
                            format='%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s',
                            datefmt='%H:%M:%S',
                            level=logging.DEBUG)


router = APIRouter(prefix="/training", tags=["training"])

def getdata(text):
  return (text, {"entities": [(0, len(text), "DRUG")]})

def addsamples(medlist,originmedlist):
  # print(medlist, originmedlist)
  medlist.extend(originmedlist)
  finalmedlist = traindata(medlist)
  return finalmedlist

def traindata(medlist):
  finalmedlist = []
  for i in medlist:
    ele = getdata(i)
    finalmedlist.append(ele)
  return finalmedlist

def training(finalmeds):
  try:
    optimizer = nlp.resume_training()
    for itn in range(10):
      losses = {}
      for batch in spacy.util.minibatch(finalmeds, size=20):
        random.shuffle(batch)
        b = []
        for text, annotations in batch:
            doc = nlp.make_doc(text)
            example = Example.from_dict(doc, annotations)
            b.append(example)
        try:
          nlp.update(b,sgd= optimizer, losses=losses, drop=0.1)
          logging.info(losses)
        except Exception as e:
          logging.info(f"ERROR : {e}")
          print(f"ERROR : {e}")
    return "Completed"
  except Exception as e:
    print(f"ERROR : {e}")
    return e

def model_to_disk():
  with open('version.txt') as f:
    lines = f.readlines()
  version = str(int(lines[0]) + 1)
  with open('version.txt', 'w') as f:
    f.write(version)
  nlp.to_disk(f'/app/med7_finetune_0.{version}')
  bashCommand = f"python -m spacy package /app/med7_finetune_0.{version} /app/ --build sdist"
  process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
  output, error = process.communicate()
  print(output,error)
  return version

def upload_to_blob(version):
  client = DirectoryClient(CONNECTION_STRING, CONTAINER_NAME)
  client.upload('/app/en_core_med7_trf-0.0.1/dist/en_core_med7_trf-0.0.1.tar.gz','dist/en_core_med7_trf-0.0.1.tar.gz')
  client.upload(f'/app/med7_finetune_0.{version}',f'models/med7_finetune_0.{version}')

def delete_local_files(version):
  shutil.rmtree('/app/en_core_med7_trf-0.0.1/')
  shutil.rmtree(f'/app/med7_finetune_0.{version}')

def readFile(fileName):
  fileObj = open(fileName, "r") #opens the file in read mode
  words = fileObj.read().splitlines() #puts the file into an array
  fileObj.close()
  return words

def readTxt(file):
    return file.read()

@router.get("/", status_code=200)
def hello():
    return {"message": "training endpoint working"}

@router.post("/training", status_code=200)
def training(file: UploadFile = File(...)):
  try:
    df = file.file.read()
    df = df.splitlines()
    medlength = len(df)
    sample_count = int(medlength*10/100) + 1
    originmedlist = pd.read_csv('prescriptions.csv')
    originmedlist = originmedlist.sample(n = sample_count,replace = False)
    originmedlist = originmedlist['drug'].to_list()
    traindata = addsamples(df,originmedlist)
    print("samples added")
    model = training(traindata)
    print("training done")
    version = model_to_disk()
    print("model put to disk")
    upload_to_blob(version)
    print("uploaded to blob")
    delete_local_files(version)
    print("local files deleted")
    return "Model has been trained and uploaded successfully"
  except Exception as e:
    print("error:",e)