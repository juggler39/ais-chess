#!/bin/bash

echo "###### Starting Deployment ######"

 ssh root@$IP <<EOF
 cd $DEPLOY_DIR
 cd backend
 npm install
 pm2 restart app
EOF

echo "###### End Deployment ######"
