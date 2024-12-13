# Utiliser une image Node.js officielle
FROM node:16


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
