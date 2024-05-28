FROM node:20

# Install Chromium manually
RUN apt-get update && \
    apt-get install -y chromium

# Set environment variable for Puppeteer to use the manually installed Chromium
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium"

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies using npm ci
RUN npm ci

# Copy application files
COPY . .

# Build TypeScript code
RUN npm run build

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
