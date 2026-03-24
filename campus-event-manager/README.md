# 🎓 Campus Event Manager

A full-stack web application to manage university events.
Built with ASP.NET Core, Razor Pages, PostgreSQL, and containerized with Docker Compose.

---

##  Getting Started
```bash
git clone https://github.com/lapepitedor/devops-portfolio
cd devops-portfolio/campus-event-manager
docker compose up
```
➡️ App available at http://localhost:8080

---

## 🔐 Default Admin Account

| Field | Value |
|---|---|
| Email | Jack.bauer@hshl.de |
| Password | backend |

---

## 📋 Description

Campus Event Manager is a web application designed to manage university events. It provides an intuitive interface for two types of users:

- **Administrators** — Add, edit, and delete events.
- **Users** (students or university members) — Register for events, view their registrations, and see event details.

---

## ✨ Key Features

### For Administrators
- **Add Events** — Create new events with detailed information (title, date, location, description, etc.)
- **Edit Events** — Update information for existing events
- **Delete Events** — Remove outdated or canceled events
- **Dashboard** — View all events with pagination

### For Users
- **Sign Up** — Register with an email and password
- **Login** — Access their personal dashboard
- **Event List** — Browse available events and register
- **My Registrations** — View registered events
- **Unregister** — Cancel a registration at any time

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | ASP.NET Core |
| Frontend | Razor Pages |
| Database | PostgreSQL |
| Containerization | Docker Compose |
| Authentication | Cookie-based (Admin + User roles) |
| Pagination | Implemented on all dashboards |

---

## 📐 Docker Architecture
```
docker-compose.yml
├── app   → ASP.NET Core (port 8080)
└── db    → PostgreSQL
```

---

## 🗺️ API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| GET | /Authentication/Login | Login page |
| POST | /Authentication/Authenticate | Authenticate user |
| GET | /Authentication/Logout | Logout user |
| GET | /Authentication/Register | Registration page |
| POST | /Authentication/Register | Register new user |
| GET | /Authentication/PasswordForgotten | Password reset page |
| POST | /Authentication/SendPasswordResetMail | Send reset email |

### Admin Dashboard
| Method | Endpoint | Description |
|---|---|---|
| GET | /Dashboard | Display all events |
| GET | /Dashboard/Edit/{id} | Edit an existing event |
| GET | /Dashboard/New | Create a new event |
| POST | /Dashboard/Save | Save new or updated event |
| POST | /Dashboard/Delete/{id} | Delete an event |

### User Dashboard
| Method | Endpoint | Description |
|---|---|---|
| GET | /User/UserDashboard | List of available events |
| POST | /User/RegisterEvent | Register for an event |
| POST | /User/UnregisterEvent | Unregister from an event |
| GET | /User/EventDetails/{id} | View event details |
| GET | /User/RegisteredEvents | View registered events |

---

## 👩‍💻 Author

Developed by **Messu Brinda Aurelie** as part of the Backend Development course by Professor Alexander Stuckenholz.
For questions or suggestions, feel free to reach out!