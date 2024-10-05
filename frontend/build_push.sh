#!/bin/bash
npm install
npm run build
sudo docker build -t konglsh96/simple-predict:front . 
sudo docker push konglsh96/simple-predict:front
