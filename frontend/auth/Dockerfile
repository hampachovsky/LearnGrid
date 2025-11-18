FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

ENV PORT=5174

EXPOSE 5174

CMD ["npm", "run", "preview"]
