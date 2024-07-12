#!/bin/bash

LOGFILE="/root/server/server-nami/logfile.log"

echo "$(date): Checking Docker services..." >> $LOGFILE

if docker-compose ps | grep 'Exit'; then
  echo "$(date): Some containers have exited. Restarting services..." >> $LOGFILE
  docker-compose down >> $LOGFILE 2>&1
  docker-compose up -d >> $LOGFILE 2>&1
else
  echo "$(date): All services are running." >> $LOGFILE
fi
