# Use Node 20 base image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and lockfile first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build TypeScript
RUN npm run build

# Expose the port
EXPOSE 4000

# Start the server
CMD ["npm", "start"]

