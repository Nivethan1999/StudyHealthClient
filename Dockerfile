
# FROM node:21.5.0 as build

# # Set the working directory
# WORKDIR /usr/local/app

# # Add the source code to app
# COPY ./ /usr/local/app/

# # Install all the dependencies
# RUN npm install

# # Generate the build of the application
# RUN npm run build


# # Stage 2: Serve app with nginx server

# # Use official nginx image as the base image
# FROM nginx:latest

# # Copy the build output to replace the default nginx contents.
# COPY --from=build /usr/local/app/dist/client/browser /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

FROM --platform=linux/amd64 node:21.5.0 as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app


COPY /Client/package*.json .
# Install all the dependencies

RUN npm install
COPY ./Client .

# CMD ["tail", "-f", "/dev/null"] # keep container running for debugging and check filesystem... Don't delete me yet...
# Generate the build of the application
RUN npm run build
#CMD ["tail", "-f", "/dev/null"]
# Generate the build of the application


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/client/browser /usr/share/nginx/html
COPY --from=build /usr/local/app/dist /usr/share/nginx/html


# # Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
