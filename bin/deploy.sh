#!/bin/bash
set -e

HOST="ubuntu@44.220.128.51"
DEST="/var/www/mymoodcycle/"

read -rp "Path to SSH private key: " KEY
KEY="${KEY/#\~/$HOME}"
if [ ! -f "$KEY" ]; then
  echo "Key not found: $KEY"
  exit 1
fi

npm run build
rsync -avz --delete out/ "$HOST:$DEST" -e "ssh -i $KEY"
