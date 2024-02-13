# Use a base image with Node.js pre-installed
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./


# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .
RUN ls
RUN pwd
RUN pwd
# Expose the port on which your Node.js application will run
EXPOSE 8080

# Start the Node.js application
CMD ["node", "/app/index.js"]
