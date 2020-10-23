#!/bin/bash

echo "###### Starting Deployment ######"

# eval "$(ssh-agent -s)" # Start ssh-agent cache
# chmod 600 .travis/id_rsa # Allow read access to the private key
# ssh-add .travis/id_rsa # Add the private key to SSH

echo "###### Continue Deployment ######"

git config --global push.default matching
git remote add deploy ssh://root@$IP:$PORT$DEPLOY_DIR
git push deploy dev

# Skip this command if you don't need to execute any additional commands after deploying.
# ssh apps@$IP -p $PORT <<EOF
#   cd $DEPLOY_DIR
#   crystal build --release --no-debug index.cr # Change to whatever commands you need!
# EOF

echo "###### End Deployment ######"
