#!/bin/bash

echo "###### Starting Deployment ######"

git config --global push.default simple
git remote add deploy ssh://root@$IP:$PORT$DEPLOY_DIR
git fetch --unshallow || true
git push deploy dev

# Skip this command if you don't need to execute any additional commands after deploying.
# ssh apps@$IP -p $PORT <<EOF
#   cd $DEPLOY_DIR
#   crystal build --release --no-debug index.cr # Change to whatever commands you need!
# EOF

echo "###### End Deployment ######"
