#!/bin/bash

# Cấu hình Telegram Bot
BOT_TOKEN="7001156209:AAGbSRWdU01v9xWRJ_FHo0MZWI73RNvHBt4"
CHAT_ID="4241124330"
MESSAGE="Docker container restarted due to error."

# Hàm gửi thông báo qua Telegram
# send_telegram_message() {
#     curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
#         -d chat_id="${CHAT_ID}" \
#         -d text="${MESSAGE}"
# }

# # Kiểm tra xem dịch vụ có chạy không
# docker-compose ps | grep 'Exit' &> /dev/null
# if [ $? -eq 0 ]; then
#   # Nếu dịch vụ không chạy, khởi động lại và gửi thông báo
#   docker-compose down
#   docker-compose up -d
#   send_telegram_message
# fi
send_telegram_message() {
    curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
        -d chat_id="${CHAT_ID}" \
        -d text="${MESSAGE}"
}

# Kiểm tra xem container có đang chạy không
docker-compose ps | grep 'Exit' &> /dev/null
if [ $? -eq 0 ]; then
  # Gửi thông báo nếu container bị tắt
  send_telegram_message
fi