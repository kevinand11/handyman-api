#!/bin/bash

#MONGO1=`ping -c 1 mongo1 | head -1  | cut -d "(" -f 2 | cut -d ")" -f 1`

MONGO1=mongo

echo "**********************************************" ${MONGO1}
echo "Waiting for startup.."
until curl http://${MONGO1}:27017/serverStatus\?text\=1 2>&1 | grep uptime | head -1; do
  printf '.'
  sleep 1
done


mongosh --host ${MONGO1}:27017 <<EOF
var cfg = {
    "_id": "rs0",
    "protocolVersion": 1,
    "version": 1,
    "members": [
        {
            "_id": 0,
            "host": "${MONGO1}:27017",
            "priority": 2
        }
    ],settings: {chainingAllowed: true}
};
rs.initiate(cfg, { force: true });
rs.reconfig(cfg, { force: true });
db.getMongo().setReadPref('nearest');
EOF