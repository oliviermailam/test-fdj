# Base image
FROM node:18

# App directory
WORKDIR /usr/src/app/fdj

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm i

# Serve whole app
CMD ["npx", "nx", "run-many", "--parallel", "--target=serve", "--projects=fdj-ng,fdj-api"]

