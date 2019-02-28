# Base node
FROM node:11.10-alpine AS base
WORKDIR /app
COPY package.json .
COPY package-lock.json .



# Dependencies
FROM base AS dependencies
# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN npm install



# Build
FROM base AS builder
# copy dev node_modules
COPY --from=dependencies /app/node_modules node_modules
# copy app sources
COPY . .
RUN npm run build



# Release
FROM base AS release
# copy production node_modules
COPY --from=dependencies /app/prod_node_modules node_modules
# copy builded app
COPY --from=builder /app/build build
# set app port
ENV PORT=3000
# expose port and define CMD
EXPOSE 3000
CMD npm run serve
