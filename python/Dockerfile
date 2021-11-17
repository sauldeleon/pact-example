# Pull base image
FROM python:3.8-slim

WORKDIR /app/

# set env variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .