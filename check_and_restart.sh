# #!/bin/bash

# # Tên của container Docker bạn muốn kiểm tra
# CONTAINER_NAME="nodeappcontainer"

# # Lệnh để kiểm tra log của container
# LOGS=$(docker logs $CONTAINER_NAME 2>&1)

# # Kiểm tra xem log có chứa lỗi "Too many connections" không
# if echo "$LOGS" | grep -q "Too many connections"; then
#   # Ghi log
#   echo "$(date) - Too many connections error detected. Restarting container $CONTAINER_NAME." >> /root/server/server-nami/restart.log
#   # Khởi động lại container
#   docker restart "$CONTAINER_NAME"
# fi


#!/bin/bash

# Tên của container Docker bạn muốn kiểm tra
CONTAINER_NAME="nodeappcontainer"

# Đường dẫn tạm thời để lưu log
TEMP_LOG="/tmp/${CONTAINER_NAME}_log.tmp"

# Kiểm tra xem file tạm thời có tồn tại không
if [ ! -f "$TEMP_LOG" ]; then
  # Tạo file tạm thời nếu chưa tồn tại
  touch "$TEMP_LOG"
fi

# Lấy log mới nhất của container
docker logs $CONTAINER_NAME > "$TEMP_LOG" 2>&1

# Kiểm tra xem log có chứa lỗi "Too many connections" không
if grep -q "Too many connections" "$TEMP_LOG"; then
  # Ghi log
  echo "$(date) - Too many connections error detected. Restarting container $CONTAINER_NAME." >> /root/server/server-nami/restart.log
  # Khởi động lại container
  docker restart "$CONTAINER_NAME"
  # Xóa log cũ sau khi khởi động lại để tránh lặp lại
  rm "$TEMP_LOG"
fi
