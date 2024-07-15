#!/bin/bash

# Tên của container Docker bạn muốn kiểm tra
CONTAINER_NAME="nodeappcontainer"

# Lệnh để kiểm tra log của container
LOGS=$(docker logs $CONTAINER_NAME 2>&1)

# Kiểm tra xem log có chứa lỗi "Too many connections" không
if echo "$LOGS" | grep -q "Too many connections"; then
  # Ghi log
  echo "$(date) - Too many connections error detected. Restarting container $CONTAINER_NAME." >> /root/server/server-nami/restart.log
  # Khởi động lại container
  docker restart "$CONTAINER_NAME"
fi
