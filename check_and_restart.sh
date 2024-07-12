#!/bin/bash

# Kiểm tra xem dịch vụ có chạy không
docker-compose ps | grep 'Exit' &> /dev/null
if [ $? -eq 0 ]; then
  # Nếu dịch vụ không chạy, khởi động lại
  docker-compose down
  docker-compose up -d
fi
