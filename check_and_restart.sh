if docker-compose ps | grep 'Exit'; then
  echo "Some containers have exited. Restarting services..."
  docker-compose down
  docker-compose up -d
else
  echo "All services are running."
fi