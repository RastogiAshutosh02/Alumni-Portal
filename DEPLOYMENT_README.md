# Integrated Website — Deployment Guide

## Structure

```
public_html/
├── index.html                  ← Main website (with Alumni Portal link in "More" dropdown)
├── alumni-portal/              ← Alumni Portal frontend (React SPA)
│   ├── index.html
│   ├── centenary-logo.png
│   └── assets/
├── alumni-portal-backend/      ← Alumni Portal backend (Node.js/Express)
│   ├── src/
│   ├── uploads/
│   ├── migrations/
│   └── package.json
├── css/, js/, img/, fonts/ ... ← Main website assets
```

## How It Works

- The main website's **"More"** dropdown now has an **"ISM Alumni Portal"** link.
- Clicking it opens the Alumni Portal in a new tab at `/alumni-portal/index.html`.

## Deployment Steps

### 1. Frontend (Static Files)
Upload the entire folder (including `alumni-portal/`) to your web server's `public_html` directory. The main site and the alumni portal frontend are all static files.

### 2. Backend (Node.js API)
The alumni portal requires a running Node.js backend for login, registration, directory, etc.

```bash
cd alumni-portal-backend
npm install
npm start          # Starts on port 5000 by default
```

### 3. Configure Reverse Proxy
Set up your web server (Apache/Nginx) to proxy `/api` requests to the Node.js backend:

**Apache (.htaccess or VirtualHost):**
```apache
ProxyPass /api http://localhost:5000/api
ProxyPassReverse /api http://localhost:5000/api
```

**Nginx:**
```nginx
location /api {
    proxy_pass http://localhost:5000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

### 4. Environment Variables (Backend)
Check `alumni-portal-backend/src/config/` for database and other configuration. You may need to set:
- Database connection details
- JWT secret
- Port number

## Notes
- The Alumni Portal link opens in a **new tab** (`target="_blank"`)
- The link has been added to: `index.html`, `index_updated.html`, and `CSM.html`
- The alumni portal frontend uses relative paths, so it works correctly from the `/alumni-portal/` subfolder
