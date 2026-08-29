# QuickBite Food Delivery

QuickBite is an on-demand food delivery platform connecting **customers**,
**restaurants**, **delivery agents** and **platform admins**. This repository
contains the application source code that implements the Product Backlog
defined in the QuickBite Jira project (see `docs/BACKLOG.md`).

## Tech stack

- **Backend:** Node.js + Express (REST API, mock in-memory data store)
- **Frontend:** HTML / CSS / vanilla JS (lightweight client for demo purposes)
- **Tests:** Jest (backend unit tests)

## Project structure

```
quickbite-app/
├── backend/
│   ├── server.js
│   ├── middleware/
│   ├── routes/
│   ├── data/
│   └── tests/
├── frontend/
│   ├── index.html
│   ├── css/
│   └── js/
└── docs/
    └── BACKLOG.md
```

## Getting started

```bash
cd backend
npm install
npm start        # runs the API on http://localhost:4000
```

Open `frontend/index.html` in a browser (or serve it with any static server)
to try the demo client.

## Branching strategy

This project follows a **Feature Branch Workflow**:

- `main` — always deployable; protected, only updated via reviewed Pull Requests
- `feature/<name>` — one branch per Epic/feature, named after the backlog item
- `hotfix/<name>` — urgent fixes branched from `main`

## Commit convention

Commits follow **Conventional Commits**:

`<type>(<scope>): <short summary>`

| Type | Use for |
|---|---|
| feat | a new feature |
| fix | a bug fix |
| docs | documentation only changes |
| test | adding or updating tests |
| refactor | code change that neither fixes a bug nor adds a feature |
| chore | tooling, config, dependency changes |

## Roadmap

- [x] Sprint 1 — Account Management, Restaurant Discovery, Cart, Payment (`v0.1.0`)
- [x] Sprint 2 — Order Tracking, Notifications, Delivery Agent Ops (`v0.2.0`)
- [x] Sprint 3 — Ratings & Reviews, Admin Dashboard (`v0.2.0`)
- [x] Hotfix — Order tax-after-discount correction (`v0.2.1`)

## Contributors

- Arju — Project lead, backend architecture, payments, delivery, admin
- Riya Sharma — Cart/coupons, restaurant discovery, reviews, QA/tests
