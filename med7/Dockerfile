FROM python:3.7-slim
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
RUN pip install https://ebhmlstorage.blob.core.windows.net/ebhmcontainer/dist/en_core_med7_trf-0.0.1.tar.gz
RUN pip install -U wheel pip setuptools spacy==3.1.2 spacy-transformers
EXPOSE 8000
CMD ["python", "main.py"]