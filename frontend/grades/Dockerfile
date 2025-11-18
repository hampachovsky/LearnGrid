FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

ENV PORT=5176

EXPOSE 5177

CMD ["npm", "run", "preview"]
