# ─── Stage 1: Builder ────────────────────────────────────────────────────────
# Nutzt node:20-alpine für ein schlankes Build-Image
FROM node:20-alpine AS builder

WORKDIR /app

# Dependencies zuerst cachen (besseres Layer-Caching)
COPY package*.json ./
RUN npm ci

# Source Code kopieren und bauen
COPY . .
RUN npm run build


# ─── Stage 2: Runtime ─────────────────────────────────────────────────────────
# Nur Nginx — kein Node.js, kein npm, keine node_modules im finalen Image
FROM nginx:alpine AS runtime

# Nur die Build-Artefakte aus Stage 1 kopieren
COPY --from=builder /app/dist /usr/share/nginx/html

# Angepasste Nginx-Konfiguration (SPA Routing + Performance)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
