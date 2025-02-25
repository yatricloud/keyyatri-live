# Stage 1: Build the application
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Create the dist directory
RUN mkdir -p /app/dist

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create the production image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build /app/dist ./dist

# Install serve to serve the built application
RUN npm install -g serve

# Expose the port the application will run on
EXPOSE 5173

# Set the entry point to start the application
CMD ["serve", "-s", "dist", "-l", "5173"]
