# FROM mcr.microsoft.com/devcontainers/base:bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:18-bullseye

# Create the 'node' user if it doesn't exist
RUN id -u node &>/dev/null || adduser --disabled-password --gecos "" node

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose Astro's dev server port
EXPOSE 3000

# Start the dev server (ensure your package.json has a "dev" script)
CMD ["npm", "run", "dev"]