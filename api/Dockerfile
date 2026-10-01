# Utiliser une image Node.js officielle
FROM node:20-alpine


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
