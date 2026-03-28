import { useState, useEffect } from "react";
import "./App.css";

const steps = [
  {
    phase: "Stage 1",
    label: "Builder",
    icon: "⚙️",
    color: "#f59e0b",
    description: "Node.js 20 Alpine",
    details: [
      "WORKDIR /app",
      "COPY package*.json .",
      "RUN npm ci",
      "COPY . .",
      "RUN npm run build",
    ],
    output: "→ /app/dist",
  },
  {
    phase: "Stage 2",
    label: "Runtime",
    icon: "🚀",
    color: "#10b981",
    description: "Nginx Alpine",
    details: [
      "COPY --from=builder /app/dist /usr/share/nginx/html",
      "COPY nginx.conf /etc/nginx/conf.d/default.conf",
      "EXPOSE 80",
      'CMD ["nginx", "-g", "daemon off;"]',
    ],
    output: "→ Port 80",
  },
];

const sizeData = [
  { label: "node:20", size: 1100, color: "#ef4444" },
  { label: "node:20-alpine", size: 180, color: "#f59e0b" },
  { label: "nginx:alpine\n(final)", size: 42, color: "#10b981" },
];

export default function App() {
  const [activeStep, setActiveStep] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [built, setBuilt] = useState(false);
  const [tab, setTab] = useState("pipeline");

  const runBuild = () => {
    setAnimating(true);
    setBuilt(false);
    setActiveStep(0);
    setTimeout(() => {
      setActiveStep(1);
      setTimeout(() => {
        setActiveStep(null);
        setBuilt(true);
        setAnimating(false);
      }, 1800);
    }, 1800);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="badge">
            Messu Brinda Aurelie - Docker Multistage Build
          </div>
          <h1>
            React <span className="plus">+</span> Nginx{" "}
            <span className="plus">+</span> Docker
          </h1>
          <p className="subtitle">
            Multistage Build — Lean. Fast. Production-Ready.
          </p>
        </div>
        <div className="header-tags">
          <span className="tag">Docker</span>
          <span className="tag">Nginx</span>
          <span className="tag">React</span>
          <span className="tag">CI/CD</span>
        </div>
      </header>

      <nav className="tabs">
        {["pipeline", "dockerfile", "nginx", "compose"].map((t) => (
          <button
            key={t}
            className={`tab-btn ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}>
            {t === "pipeline" && "🔄 Pipeline"}
            {t === "dockerfile" && "🐳 Dockerfile"}
            {t === "nginx" && "⚡ nginx.conf"}
            {t === "compose" && "📦 Compose"}
          </button>
        ))}
      </nav>

      <main className="content">
        {tab === "pipeline" && (
          <section className="pipeline-section">
            <div className="pipeline-header">
              <h2>Multistage Build Pipeline</h2>
              <button
                className={`run-btn ${animating ? "running" : ""} ${built ? "done" : ""}`}
                onClick={runBuild}
                disabled={animating}>
                {animating
                  ? "⏳ Building..."
                  : built
                    ? "✅ Run Again"
                    : "▶ Simulate Build"}
              </button>
            </div>

            <div className="stages">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`stage-card ${activeStep === i ? "active" : ""} ${built ? "done" : ""}`}>
                  <div
                    className="stage-top"
                    style={{ borderColor: step.color }}>
                    <span className="stage-icon">{step.icon}</span>
                    <div>
                      <div
                        className="stage-phase"
                        style={{ color: step.color }}>
                        {step.phase}
                      </div>
                      <div className="stage-label">
                        {step.label} — {step.description}
                      </div>
                    </div>
                    {activeStep === i && <div className="spinner" />}
                    {built && <span className="check">✓</span>}
                  </div>
                  <ul className="stage-details">
                    {step.details.map((d, j) => (
                      <li
                        key={j}
                        className="code-line">
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div
                    className="stage-output"
                    style={{ color: step.color }}>
                    {step.output}
                  </div>
                </div>
              ))}

              <div className="arrow-container">
                <div className={`flow-arrow ${built ? "lit" : ""}`}>→</div>
              </div>

              {built && (
                <div className="result-card">
                  <div className="result-icon">🎉</div>
                  <div className="result-title">Image Ready</div>
                  <div className="result-size">~42 MB</div>
                  <div className="result-sub">
                    nginx:alpine — Production image
                  </div>
                </div>
              )}
            </div>

            <div className="size-section">
              <h3>Image Size Comparison</h3>
              <div className="bars">
                {sizeData.map((d, i) => (
                  <div
                    key={i}
                    className="bar-row">
                    <div className="bar-label">{d.label}</div>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${(d.size / 1100) * 100}%`,
                          background: d.color,
                        }}
                      />
                    </div>
                    <div
                      className="bar-value"
                      style={{ color: d.color }}>
                      {d.size} MB
                    </div>
                  </div>
                ))}
              </div>
              <p className="size-note">
                💡 Multistage build cuts image size by <strong>~96%</strong> —
                nur das Nötigste landet im finalen Image.
              </p>
            </div>
          </section>
        )}

        {tab === "dockerfile" && (
          <section className="code-section">
            <h2>Dockerfile</h2>
            <p className="code-desc">
              Two stages — Build-Tools bleiben außen vor.
            </p>
            <pre className="code-block">
              <code>{`# ─── Stage 1: Builder ───────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Cache dependencies separately
COPY package*.json ./
RUN npm ci

# Copy source & build
COPY . .
RUN npm run build


# ─── Stage 2: Runtime ────────────────────────────────
FROM nginx:alpine AS runtime

# Copy only the built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom Nginx config (SPA routing support)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]`}</code>
            </pre>
            <div className="tip-box">
              <span className="tip-icon">🔑</span>
              <div>
                <strong>Key insight:</strong> Das <code>--from=builder</code>{" "}
                Flag kopiert Dateien aus Stage 1. Node.js, npm und alle
                Dev-Dependencies werden <em>nicht</em> in das finale Image
                eingeschlossen.
              </div>
            </div>
          </section>
        )}

        {tab === "nginx" && (
          <section className="code-section">
            <h2>nginx.conf</h2>
            <p className="code-desc">
              SPA-freundliches Routing + Performance-Optimierungen.
            </p>
            <pre className="code-block">
              <code>{`server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # ── SPA Fallback (React Router) ──────────────────
    location / {
        try_files $uri $uri/ /index.html;
    }

    # ── Cache static assets ──────────────────────────
    location ~* \\.(js|css|png|jpg|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # ── Gzip compression ─────────────────────────────
    gzip on;
    gzip_types text/plain text/css application/javascript
               application/json image/svg+xml;
    gzip_min_length 1000;

    # ── Security headers ─────────────────────────────
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin";
}`}</code>
            </pre>
            <div className="tip-box">
              <span className="tip-icon">⚡</span>
              <div>
                <strong>try_files $uri /index.html</strong> — essentiell für
                React Router. Ohne diese Zeile gibt Nginx 404 bei direktem
                Aufruf von <code>/about</code>.
              </div>
            </div>
          </section>
        )}

        {tab === "compose" && (
          <section className="code-section">
            <h2>docker-compose.yml</h2>
            <p className="code-desc">
              Lokale Entwicklung & Deployment mit einem Command.
            </p>
            <pre className="code-block">
              <code>{`services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
      target: runtime       # nur runtime stage bauen
    ports:
      - "3000:80"           # localhost:3000 → container:80
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost"]
      interval: 30s
      timeout: 5s
      retries: 3`}</code>
            </pre>
            <div className="commands">
              <h3>Nützliche Commands</h3>
              <div className="cmd-grid">
                {[
                  { cmd: "docker compose up --build", desc: "Build & start" },
                  { cmd: "docker compose up -d", desc: "Detached mode" },
                  { cmd: "docker images", desc: "Image-Größe prüfen" },
                  { cmd: "docker compose down", desc: "Stop & remove" },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="cmd-card">
                    <code className="cmd">{c.cmd}</code>
                    <span className="cmd-desc">{c.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="footer-stack">
          {["React 18", "Vite", "Docker", "Nginx", "Alpine Linux"].map((t) => (
            <span
              key={t}
              className="footer-tag">
              {t}
            </span>
          ))}
        </div>
        <p>Messu Brinda Aurelie | Docker Multistage Build | 2026</p>
      </footer>
    </div>
  );
}
