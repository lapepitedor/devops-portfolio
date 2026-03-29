[![Docker](https://img.shields.io/badge/Docker-Containerization-blue)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)](https://www.postgresql.org/)
[![Docker Compose](https://img.shields.io/badge/Docker--Compose-Orchestration-orange)](https://docs.docker.com/compose/)


Welcome to my DevOps portfolio.  
This repository showcases projects that demonstrate my skills in containerization and orchestration using Docker.

---

## 📦 Projects

### 1. docker-typescript-api
A REST API built with TypeScript, containerized with Docker and orchestrated using Docker Compose.

**Stack:** TypeScript · Node.js · PostgreSQL · Docker · Docker Compose

**Run the project:**
```bash
git clone https://github.com/lapepitedor/devops-portfolio
cd devops-portfolio/docker-typescript-api
docker compose up
```
➡️ API disponible sur http://localhost:3000

➡️ **Live demo:** http://mon-api-brinda.westeurope.azurecontainer.io:3000

---
### 2. campus-event-manager
A full-stack web application to manage university events.

**Stack:** ASP.NET Core · Razor Pages · PostgreSQL · Docker Compose

**Run the project:**
```bash
cd devops-portfolio/campus-event-manager
docker compose up
```
➡️ App available at http://localhost:8080

---
### 3. react-nginx-docker

A React application built with Vite, served by Nginx, and containerized using a Docker **Multistage Build** — reducing the final image size by ~96% (from ~180 MB down to ~42 MB).

**Stack:** React · Vite · Nginx · Docker · Docker Compose

**Run the project:**

```bash
cd devops-portfolio/react-nginx-docker
docker compose up --build
```

➡️ App available at http://localhost:3000
