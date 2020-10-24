#!/bin/bash

echo "###### Starting Deployment ######"

# git config --global push.default simple
# # git remote add production ssh://root@$IP:$PORT$DEPLOY_DIR
# # git fetch --unshallow || true
# # git push production dev

# ls
# cd dist
# git init
# git remote add production ssh://root@$IP:$PORT$DEPLOY_DIR/
# git add .
# git commit -m 'Build by Travis'
# git config --list
# git fetch --unshallow || true
# git push --force production dev

echo "###### Contunue Deployment ######"

# Skip this command if you don't need to execute any additional commands after deploying.
 ssh root@$IP <<EOF
 cd $DEPLOY_DIR
 git checkout dev
 ls
 cd backend
 npm install
 pm2 restart app
EOF

echo "###### End Deployment ######"
