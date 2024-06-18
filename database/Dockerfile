# Mongo base image
FROM mongo

# Start the server to restore the database and restart it
CMD ["bash", "-c", "mongod --fork --logpath /var/log/mongod.log --bind_ip_all && mongorestore -d sports /data/sports && mongod --shutdown && docker-entrypoint.sh mongod"]