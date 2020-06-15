#!/bin/sh

apk upgrade --available 
apk add --no-cache git youtube-dl
git clone https://github.com/simonwjackson/music-api.git /home/node/app
npm ci 
npm run server
