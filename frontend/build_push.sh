#!/bin/bash
npm run build
sudo docker build -t konglsh96/kserve_practice:front . 
sudo docker push konglsh96/kserve_practice:front
