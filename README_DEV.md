# Developer Notes – ResearchChat.io Platform

Welcome to the development-side documentation for the ResearchChat.io platform. This doc provides internal context, architecture breakdown, and contribution guidelines for collaborators and researchers.

---

## Overview

**ResearchChat.io** is a research-driven, conversational platform designed for use in call center simulation, memory tracing, and AI agent identity studies.  
The current setup supports a Django backend, a React frontend built with Vite, and integrations for bot management, NHSN reporting workflows, and experimentation tools.

---

## Tech Stack

| Layer      | Tech                     | Notes                                        |
|------------|--------------------------|----------------------------------------------|
| Frontend   | React + TypeScript + Vite | Hosted via GitHub Pages from `frontend/docs` |
| Backend    | Django + Django REST     | Hosted on [Render](https://render.com/)      |
| Auth       | `djoser` + JWT           | Secure cookie setup, user registration/login |
| Hosting    | GitHub Pages + Cloudflare| Uses `chat.researchchat.io` custom domain    |

---

## Repo Structure

```plaintext
chat.researchchat.io/
├── chat/               # Django backend app (admin, chat API)
├── chattr_gpt/         # Root Django project
├── frontend/           # Vite-based frontend
│   ├── docs/           # Built frontend for GitHub Pages
│   ├── public/         # Static assets
│   ├── src/            # React app source (pages, components)
│   └── vite.config.ts  # Config for build output to `docs/`
├── users/              # Django custom user model, signals
├── .github/            # (If CI/CD is added)
└── README_DEV.md       # You are here
