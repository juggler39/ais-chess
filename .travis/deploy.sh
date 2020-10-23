#!/bin/bash
echo "###### Starting Deployment ######"

scp -r frontend/dist/* root@$IP:$DEPLOY_DIR/frontend/
scp -r backend/* root@$IP:$DEPLOY_DIR/backend/

echo "###### Starting Deployment ######"

ssh root@$IP <<EOF
 cd $DEPLOY_DIR/backend
 npm install
 pm2 restart app
EOF

echo "###### End Deployment ######"
