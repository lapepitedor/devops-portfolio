# React + Nginx + Docker — Multistage Build

A portfolio project demonstrating how to build a React application with Vite, serve it using Nginx, and fully containerize it with Docker using a **Multistage Build**.

---

## Tech Stack

| Technology | Rôle |
|---|---|
| **React 18** | UI Framework |
| **Vite** | Build tool |
| **Nginx Alpine** | Production web server |
| **Docker** | Containerization |
| **Docker Compose** | Local orchestration  |

---

## Why Multistage Build? ?

Without multistage, the final image would include Node.js, npm, and all `node_modules` — tools that are completely unnecessary in production.

```
node:20       →  ~1100 MB  ❌
node:20-alpine         →   ~180 MB  ⚠️
nginx:alpine (final)   →    ~42 MB  ✅  (-96%)
```

The idea : **Stage 1 builds, Stage 2 serves.**
only the `/dist` folder (compiled output) is copied into the final image.

---

## Project Structure

```
react-nginx-docker/
├── Dockerfile           # Multistage build (2 stages)
├── docker-compose.yml   # Start everything with one command
├── nginx.conf           # Config Nginx (SPA routing + Gzip + Security)
├── .dockerignore        # Exclude node_modules, dist, .git...
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    └── App.css
```

---

## Dockerfile Explained

```dockerfile
# ── Stage 1 : Builder ─────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install       # install dependencies

COPY . .
RUN npm run build     # outputs to /app/dist



# ── Stage 2 : Runtime ─────────────────────────────────
FROM nginx:alpine AS runtime

# Copy only the built files from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy only the built files from Stage 1
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

> `--from=builder` s the key to multistage: it copies files from Stage 1
without including Node.js or npm in the final image.

---

## nginx.conf —  Key Points

```nginx
# SPA Routing — required for React Router to work
location / {
    try_files $uri $uri/ /index.html;
}

# Long-term cache for static assets (Vite generates hashed filenames)
location ~* \.(js|css|png|svg|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# # Gzip compression (~70% size reduction on JS/CSS)
gzip on;
gzip_types text/css application/javascript application/json;
```

---

## Getting Started

### Local Development (without Docker)

```bash
npm install
npm run dev
# → http://localhost:5173 with Hot Module Replacement
```

### Production with Docker

```bash
# Build the image and start the container
docker compose up --build

# → http://localhost:3000
```

```bash
# Run in the background
docker compose up -d --build

# Stop
docker compose down
```

### Useful Commands

```bash
# # Check the final image size
docker images

# View Nginx logs
docker compose logs -f

# Open a shell inside the container
docker exec -it <container_id> sh
```

---

## Recommended Workflow

```
npm run dev              →  developement (fast, Hot Reload)
        ↓  When ready
docker compose up --build  →  production / démo portfolio
```

---

## Key Concepts

- **Multistage Docker Build** — separate build and runtime for lean images
- **Layer caching** — copy `package*.json` first to speed up rebuilds
- **Nginx as SPA server** —  `try_files` config  for React Router
- **Gzip Compression** — reduce asset transfer size to the browser
- **Security headers** — HTTP security best practices
- **.dockerignore** — exclude unnecessary files from the build context
