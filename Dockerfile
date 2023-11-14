# Start with Node.js base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose the application on port 3000
EXPOSE 3000

# Define the command to start the application
CMD [ "npm", "run", "prod" ]

