# 1. Image de base : un OS Linux minimal avec Node.js déjà installé
FROM node:20-alpine

# 2. Dossier de travail DANS le container
WORKDIR /app

# 3. On copie les fichiers de dépendances EN PREMIER (astuce cache)
COPY package*.json ./

# 4. On installe les dépendances
RUN npm install

# 5. On copie le reste du code source
COPY . .

# 6. On compile le TypeScript → JavaScript
RUN npm run build

# 7. On documente le port que l'app utilise
EXPOSE 3000

# 8. La commande qui tourne quand le container démarre
CMD ["node", "dist/index.js"]


## Pourquoi COPY package.json avant COPY . . ?

# C'est **l'astuce Docker la plus importante**. Docker construit l'image en **couches** (layers), et il met ces couches en **cache**.
# ```
# Layer 1 : FROM node:20-alpine        → caché
# Layer 2 : COPY package.json          → caché tant que package.json ne change pas
# Layer 3 : RUN npm install            → caché tant que layer 2 est caché ✅
# Layer 4 : COPY . .                   → recalculé à chaque changement de code
# Layer 5 : RUN npm run build          → recalculé