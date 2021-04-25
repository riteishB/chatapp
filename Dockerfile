FROM 'mhart/alpine-node' AS client-build
WORKDIR /app
COPY ./chatapp-frontend/package*.json ./
RUN npm install yarn
RUN yarn install --force
COPY ./chatapp-frontend/src ./src
COPY ./chatapp-frontend/public ./public
RUN npm run build


FROM 'mhart/alpine-node' AS server-build
WORKDIR /app
COPY ./backend/package*.json ./
COPY ./backend/tsconfig.json ./
RUN npm install yarn
RUN yarn install
COPY ./backend/src ./src
RUN npm run build


FROM 'mhart/alpine-node' AS deploy-build
WORKDIR /app
ENV PORT 3200
COPY --from=client-build /app/build ./public
COPY --from=server-build /app/dist ./src
COPY --from=server-build /app/node_modules ./src/node_modules
EXPOSE ${PORT}
CMD [ "node", "src/app.js" ]