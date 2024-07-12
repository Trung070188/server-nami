#!/bin/bash

LOGFILE="/root/server/server-nami/logfile.log"
COMPOSE_FILE="/root/server/server-nami/docker-compose.yml" 
CONTAINER_NAME="nodeappcontainer"  # Specify the container name

echo "$(date): Checking Docker services..." >> $LOGFILE

if docker-compose -f "$COMPOSE_FILE" ps | grep -q "$CONTAINER_NAME" | grep -q 'Up'; then 
    echo "$(date): $CONTAINER_NAME is running." >> $LOGFILE
elif docker-compose -f "$COMPOSE_FILE" ps | grep -q "$CONTAINER_NAME" | grep -q 'Exit'; then 
    echo "$(date): $CONTAINER_NAME has exited. Checking for 'too many' error..." >> $LOGFILE

    # Check logs for "too many" error
    if docker logs "$CONTAINER_NAME" 2>&1 | grep -q 'too many'; then
        echo "$(date): 'too many' error found. Rebuilding and restarting $CONTAINER_NAME..." >> $LOGFILE
        docker-compose -f "$COMPOSE_FILE" up --build -d >> $LOGFILE 2>&1
    else
        echo "$(date): No 'too many' error found. Restarting $CONTAINER_NAME..." >> $LOGFILE
        docker-compose -f "$COMPOSE_FILE" up -d >> $LOGFILE 2>&1
    fi
else
    echo "$(date): $CONTAINER_NAME not found. Building and starting services..." >> $LOGFILE
    docker-compose -f "$COMPOSE_FILE" up --build -d >> $LOGFILE 2>&1
fi
