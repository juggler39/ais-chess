#!/bin/bash

echo "###### Starting Deployment ######"

git config --global push.default simple
git remote add production ssh://root@$IP:$PORT$DEPLOY_DIR
git fetch --unshallow || true
git push production dev

echo "###### Contunue Deployment ######"

# Skip this command if you don't need to execute any additional commands after deploying.
 ssh root@$IP <<EOF
 cd $DEPLOY_DIR
 cd backend
 npm install
 cd ..
 cd frontend
 npm install
 pm2 restart app
EOF

echo "###### End Deployment ######"
