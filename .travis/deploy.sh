#!/bin/bash

echo "###### Starting Deployment ######"

git config --global push.default simple
git remote add production ssh://root@$IP:$PORT$DEPLOY_DIR
git fetch --unshallow || true
# git push production dev

echo "###### Contunue Deployment ######"

# Skip this command if you don't need to execute any additional commands after deploying.
 ssh root@$IP 
 cd $DEPLOY_DIR
 git pull origin production

echo "###### End Deployment ######"
