#!/bin/bash

LOGFILE="/root/server/server-nami/logfile.log"
COMPOSE_FILE="/root/server/server-nami/docker-compose.yml"  # Add this line

echo "$(date): Checking Docker services..." >> $LOGFILE

if docker-compose -f "$COMPOSE_FILE" ps | grep -q 'Up'; then   
    echo "$(date): All services are running." >> $LOGFILE
elif docker-compose -f "$COMPOSE_FILE" ps | grep -q 'Exit'; then   
    echo "$(date): Some containers have exited. Restarting services..." >> $LOGFILE
    docker-compose -f "$COMPOSE_FILE" down >> $LOGFILE 2>&1
    docker-compose -f "$COMPOSE_FILE" up -d >> $LOGFILE 2>&1
else
    echo "$(date): No containers running. Starting services..." >> $LOGFILE
    docker-compose -f "$COMPOSE_FILE" up -d >> $LOGFILE 2>&1
fi
