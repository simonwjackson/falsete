#!/bin/sh

apk upgrade --available 
apk add --no-cache git
git clone https://github.com/simonwjackson/music-ui.git /home/node/app
npm ci 
npm run build
npm run start
