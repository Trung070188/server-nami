#!/bin/bash

# Đường dẫn đến file log
LOG_FILE="/root/server/server-nami/logfile.log"

# Tên của container Docker bạn muốn khởi động lại
CONTAINER_NAME="nodeappcontainer"

# Kiểm tra xem log có chứa lỗi "Too many connections" không
if grep -q "Too many connections" "$LOG_FILE"; then
  # Ghi log
  echo "$(date) - Too many connections error detected. Restarting container $CONTAINER_NAME." >> /root/server/server-nami/restart.log
  # Khởi động lại container
  docker restart "$CONTAINER_NAME"
fi
