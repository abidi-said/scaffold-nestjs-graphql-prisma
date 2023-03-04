###################
# BUILD FOR LOCAL DEVELOPMENT
###################


# Base image
FROM node:18-alpine As development
# FROM node:18-alpine As build # the stage where we build the image for production
# FROM node:18-alpine As production # copy over the relevant production build files and start the server

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node
