FROM node:alpine
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
# Install dev dependencies only
RUN npm install
# Copy app source code
COPY . .
#Expose port and start application
EXPOSE 9000
CMD [ "npm", "start" ]
