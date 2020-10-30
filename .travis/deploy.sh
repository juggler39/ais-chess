#!/bin/bash
echo "###### Starting Deployment ######"

scp -r frontend/dist/* root@$IP:$DEPLOY_DIR/frontend/
scp -r backend/* root@$IP:$DEPLOY_DIR/backend/

echo "###### Continue Deployment ######"

ssh root@$IP <<EOF

 cd $DEPLOY_DIR/backend
 echo "MONGO_URL=$MONGO_URL" > .env
 echo "PORT=$LISTEN_PORT" >> .env
 echo "HOST=$HOST" >> .env
 echo "GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID" >> .env
 echo "SECRET_SESSION=$SECRET_SESSION" >> .env
 npm i
 pm2 restart chess
EOF

echo "###### End Deployment ######"

