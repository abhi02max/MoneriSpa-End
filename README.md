# Moneri Spa & Academy — Production Deployment

A full-stack business website for Moneri Spa & Academy, including a React client, Node.js/Express backend, MongoDB persistence, forms, media handling, and production deployment assets.

## Engineering highlights

- Responsive client experience
- REST-based backend services
- Environment-driven configuration
- PM2 process management
- Nginx reverse-proxy configuration
- HTTPS, SEO, performance, and deployment guides
- Linux and Windows deployment utilities

## Repository structure

- `client/` — customer-facing web application
- `server/` — backend API and persistence
- `nginx-config.conf` — reverse-proxy configuration
- `ecosystem.config.js` — PM2 process definition
- `*_GUIDE.md` — deployment, HTTPS, SEO, and optimisation notes

## Security

Do not commit production credentials. Configure database, authentication, email, and deployment secrets through environment variables.

See the included deployment guides for environment-specific instructions.
