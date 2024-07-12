!/bin/bash

LOGFILE="/root/server/server-nami/logfile.log"

echo "$(date): Checking Docker services..." >> $LOGFILE

if docker-compose ps | grep -q 'Up'; then   # Check for running containers
    echo "$(date): All services are running." >> $LOGFILE
elif docker-compose ps | grep -q 'Exit'; then   # Check for exited containers
    echo "$(date): Some containers have exited. Restarting services..." >> $LOGFILE
    docker-compose down >> $LOGFILE 2>&1
    docker-compose up -d >> $LOGFILE 2>&1
else
    echo "$(date): No containers running. Starting services..." >> $LOGFILE
    docker-compose up -d >> $LOGFILE 2>&1  # Start if no containers found
fi