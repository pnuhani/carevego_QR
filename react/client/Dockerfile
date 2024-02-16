# Use the official Node.js image as the base image
FROM node:16 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire React app directory to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Use NGINX as the production server
FROM nginx:alpine

# Copy the built React app from the build stage to NGINX's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start NGINX server when the container starts
CMD ["nginx", "-g", "daemon off;"]
