# Project Documentation
## Dr. A.C.S. Rao — Faculty Website & Integrated Portal
**IIT (ISM) Dhanbad, Department of Computer Science and Engineering**

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Directory Structure](#2-directory-structure)
3. [Sub-Projects](#3-sub-projects)
   - 3.1 [Faculty Profile Website](#31-faculty-profile-website)
   - 3.2 [Alumni Portal Frontend](#32-alumni-portal-frontend)
   - 3.3 [Alumni Portal Backend API](#33-alumni-portal-backend-api)
   - 3.4 [SG Elections Portal](#34-sg-elections-portal)
   - 3.5 [CSM Page](#35-csm-page)
4. [Technology Stack](#4-technology-stack)
5. [File Reference](#5-file-reference)
6. [Contact Form Flow](#6-contact-form-flow)
7. [Alumni Portal — Detailed Functioning](#7-alumni-portal--detailed-functioning)
   - 7.1 [Registration & Approval Flow](#71-registration--approval-flow)
   - 7.2 [API Endpoints](#72-api-endpoints)
   - 7.3 [Database Schema Overview](#73-database-schema-overview)
8. [Security Audit & Changes](#8-security-audit--changes)
   - 8.1 [Vulnerabilities Found](#81-vulnerabilities-found)
   - 8.2 [Fixes Applied](#82-fixes-applied)
   - 8.3 [File-by-File Change Log](#83-file-by-file-change-log)
9. [Deployment Notes](#9-deployment-notes)
10. [Remaining Recommendations](#10-remaining-recommendations)

---

## 1. Project Overview

This repository is the complete web presence for **Dr. Annavarapu Chandra Sekhara Rao**, Associate Professor, Department of Computer Science and Engineering, IIT (ISM) Dhanbad.

It is an integrated collection of several independently functional web applications served from a single Apache/PHP host:

| Sub-Project | Path | Purpose |
|---|---|---|
| Faculty Profile | `/` (index.html) | Public-facing academic CV and profile |
| Alumni Portal | `/alumni-portal/` | Frontend SPA for IIT(ISM) alumni network |
| Alumni Portal API | `/alumni-portal-backend/` | Node.js REST API (runs separately) |
| SG Elections 2022 | `/sg-elections2022/` | Student Government election portal |
| SG Elections 2021 | `/sg-elections2021_15-3-2022/` | Archived 2021 election portal |
| CSM | `/CSM.html` | Cyber Security Module page |

Live URL: `https://people.iitism.ac.in/~acsrao/`

---

## 2. Directory Structure

```
integrated_public_html/
│
├── index.html                  # Main faculty profile page (live homepage)
├── index2.html                 # Alternate template (with contact form)
├── index_updated.html          # Draft/staging version
├── CSM.html                    # Cyber Security Module page
├── CW_old.html                 # Archived coursework page
│
├── contact_process.php         # Contact form backend (PHP mailer)
├── csrf_token.php              # CSRF token generator endpoint
├── .htaccess                   # Apache security headers + access rules
│
├── css/                        # Stylesheets
│   ├── style.css               # Main custom styles
│   ├── responsive.css          # Mobile responsiveness
│   ├── bootstrap.min.css       # Bootstrap 3 framework
│   ├── font-awesome.min.css    # Font Awesome 4 icon font
│   ├── academicons.min.css     # Academic social icons (ORCID, Scholar, etc.)
│   ├── table.css               # Scholar/publications table styles
│   └── colors/                 # Theme colour variants (default, orange, pink…)
│
├── js/                         # JavaScript
│   ├── jquery-3.7.1.min.js     # jQuery (upgraded from 2.1.4)
│   ├── bootstrap.min.js        # Bootstrap JS
│   ├── contact.js              # Contact form validation & AJAX submit
│   ├── theme.js                # Navigation, scroll spy, animations
│   ├── jquery.validate.min.js  # jQuery Validate plugin
│   ├── jquery.form.js          # jQuery Form plugin (AJAX form submit)
│   ├── jquery.nav.js           # Single-page scroll navigation
│   └── gmaps.min.js            # Google Maps (unused in current pages)
│
├── scss/                       # SCSS source files (compiled → css/style.css)
│
├── fonts/                      # Web fonts
│   ├── fontawesome-webfont.*   # Font Awesome glyphs
│   ├── academicons.*           # Academicons glyphs
│   └── glyphicons-*            # Bootstrap Glyphicons
│
├── img/                        # Site images
│   ├── member/                 # Profile photo
│   ├── blog/                   # Blog/news section images
│   └── portfolio/              # Portfolio images
│
├── vendors/                    # Third-party libraries
│   ├── animate-css/            # CSS animation library
│   ├── counter-up/             # Animated number counters
│   ├── isotope/                # Filterable portfolio grid
│   ├── material-icon/          # Material Design icons
│   ├── linears-icon/           # Linear icon set
│   ├── owl-carousel/           # Image carousel
│   └── style-switcher/         # Live colour theme switcher
│
├── alumni-portal/              # Alumni portal frontend (SPA)
│   ├── index.html              # Single-page app entry point
│   └── assets/                 # Bundled JS/CSS assets
│
├── alumni-portal-backend/      # Alumni portal Node.js API
│   ├── src/
│   │   ├── server.js           # Express app entry point
│   │   ├── config/             # Database connection config
│   │   ├── middleware/         # Auth, approval, validation middleware
│   │   ├── routes/             # All API route handlers
│   │   └── utils/              # Helper utilities
│   ├── migrations/             # Database migration scripts
│   ├── uploads/                # Uploaded user avatars
│   ├── .env.example            # Environment variable template
│   └── package.json            # Node dependencies
│
├── sg-elections2022/           # SG Election 2022 portal
├── sg-elections2021_15-3-2022/ # SG Election 2021 portal (archived)
├── election-sg/                # SG Election standalone app
│
├── csm/                        # CSM phase images and PDFs
├── Drawing_Competition/        # Drawing competition images and PDF
├── Document/                   # Club booking/membership forms (DOCX)
│
├── ACSRao_IIT_ISM.pdf          # Downloadable CV/resume
├── docs/                       # This documentation folder
│   └── PROJECT_DOCUMENTATION.md
│
├── DEPLOYMENT_README.md        # Server deployment instructions
└── RENDER_DEPLOYMENT_GUIDE.md  # Render.com deployment guide
```

---

## 3. Sub-Projects

### 3.1 Faculty Profile Website

**Entry point:** `index.html`

The main page is a single-page scrollable academic profile with the following sections:

| Section | HTML anchor | Content |
|---|---|---|
| About Me | `#about` | Photo, personal details, social icons, resume download |
| Experience | `#experience` | Work history at IIT(ISM), IIT Patna, NIT Jamshedpur |
| Education | `#education` | PhD, M.Tech, B.Tech details |
| Publications | `#service` | Journal papers, conference papers, book chapters |
| Scholars | `#portfolio` | PhD scholars (completed & ongoing), with resume links |
| Responsibilities | `#news1` | Administrative roles, events, memberships |
| Contact | `#contact` | Office address, phone, email |

**Social icons** use two icon fonts:
- Font Awesome 4 (`fa fa-*`) — Facebook, LinkedIn, Twitter
- Academicons (`ai ai-*`) — ResearcherID, ORCID, Mendeley, Google Scholar, DBLP, Publons

**Theme switcher** (gear icon, bottom-right): Switches between six colour themes (default teal, orange, pink, violet, blue, pastel) using alternate stylesheets in `css/colors/`.

**Navigation** uses jQuery scroll spy — clicking a nav item smoothly scrolls to the section and highlights the active link. On mobile it collapses to a hamburger menu via Bootstrap.

**Animations** on scroll use Animate.css + WOW.js — elements fade/slide in when they enter the viewport.

---

### 3.2 Alumni Portal Frontend

**Entry point:** `alumni-portal/index.html`

A single-page application (SPA) for the IIT(ISM) Dhanbad alumni network, built as a standalone HTML/JS bundle. It communicates with the Alumni Portal Backend API via `fetch`.

**Features:**
- Alumni registration with photo upload
- Login with JWT authentication
- Alumni directory with search and filters (department, batch year, course, mentor flag)
- Job board — post and browse job openings
- Mentorship requests — connect alumni with current students
- Messaging between alumni
- Events listing
- Peer approval system — registered alumni vote on new registrations from their batch/department/course
- Admin dashboard — manage users, approve/reject registrations, post events and jobs
- Notification bell — real-time in-app notifications

**API base URL** is configured in the HTML head and can be redirected via a JavaScript shim (used during local development to point to a different port).

---

### 3.3 Alumni Portal Backend API

**Entry point:** `alumni-portal-backend/src/server.js`

A Node.js REST API built with Express, backed by PostgreSQL. Runs as a separate process (on Render.com or a VPS), not served by the Apache host.

#### Middleware stack (applied globally)
| Middleware | Purpose |
|---|---|
| `helmet` | Sets 12 secure HTTP response headers automatically |
| `cors` | Restricts API access to the configured `FRONTEND_URL` origin |
| `express-rate-limit` | General: 200 req/15 min; Auth endpoints: 20 req/5 min |
| `express.json` | Parses JSON request bodies (10 MB limit) |
| `morgan` | HTTP request logging (`combined` in production) |

#### Authentication
- Registration creates a user with `approval = 'pending'`
- Login uses bcrypt password comparison and returns a signed JWT (7-day expiry)
- Account lockout after 5 failed login attempts (5-minute lock)
- All protected routes require a valid JWT via the `authenticate` middleware

#### Approval flow
See [Section 7.1](#71-registration--approval-flow) for the full peer-review system.

---

### 3.4 SG Elections Portal

**Paths:** `sg-elections2022/`, `sg-elections2021_15-3-2022/`, `election-sg/`

Standalone election portals used for IIT(ISM) Student Government elections. Each contains:
- Candidate nomination pages
- Voter search (search by roll number to verify registration)
- Election information documents (PDF, DOCX)
- Their own self-contained CSS/JS/font assets

These are static HTML sites (no backend) and are served directly. They are independent of the faculty profile site.

---

### 3.5 CSM Page

**File:** `CSM.html`

A dedicated page for the Cyber Security Module (CSM) activities with phase-wise content and images. Linked from the main site's "More" dropdown menu.

---

## 4. Technology Stack

### Faculty Website

| Layer | Technology | Version |
|---|---|---|
| Markup | HTML5 | — |
| Styling | CSS3 / Bootstrap | Bootstrap 3.x |
| SCSS source | Sass (prepros compiler) | — |
| JavaScript | jQuery | 3.7.1 |
| Icon fonts | Font Awesome 4, Academicons 1.9.5, Material Design Icons | — |
| Carousel | Owl Carousel 2 | — |
| Animations | WOW.js + Animate.css | — |
| Counters | jQuery Counter Up | — |
| Grid filter | Isotope | — |
| Form validation | jQuery Validate | — |
| AJAX forms | jQuery Form plugin | — |
| Backend (contact) | PHP (mail()) | ≥ 7.4 |
| Server | Apache (with mod_headers, mod_rewrite) | — |

### Alumni Portal Backend

| Layer | Technology | Version |
|---|---|---|
| Runtime | Node.js | ≥ 18 |
| Framework | Express | 4.19 |
| Database | PostgreSQL | ≥ 14 |
| Auth | JSON Web Token (jsonwebtoken) | 9.x |
| Password hashing | bcryptjs | 2.4 |
| File uploads | Multer | 2.x |
| Email | Nodemailer | 6.9 |
| Security headers | Helmet | 7.x |
| Rate limiting | express-rate-limit | 7.x |
| Validation | express-validator | 7.x |
| Process manager | (Render.com native / PM2 on VPS) | — |

---

## 5. File Reference

### PHP Files

| File | Role |
|---|---|
| `contact_process.php` | Receives contact form POST, validates input, sends email via `mail()` |
| `csrf_token.php` | Generates and returns a session-backed CSRF token as JSON |

### Key JavaScript Files

| File | Role |
|---|---|
| `js/theme.js` | Sticky nav, scroll spy, preloader hide, WOW init, colour switcher |
| `js/contact.js` | jQuery Validate rules for contact form + AJAX submit handler |
| `js/jquery.form.js` | Serialises and submits forms via AJAX |
| `js/jquery.validate.min.js` | Client-side form validation library |
| `js/jquery.nav.js` | Smooth scroll navigation |

### Key CSS Files

| File | Role |
|---|---|
| `css/style.css` | Primary custom styles (compiled from scss/style.scss) |
| `css/responsive.css` | Breakpoint overrides for mobile/tablet |
| `css/academicons.min.css` | Academic icon font (ResearcherID, ORCID, Scholar, DBLP, etc.) |
| `css/table.css` | Scholar table styling |
| `css/colors/default.css` | Teal default colour theme |

---

## 6. Contact Form Flow

The contact form lives in `index2.html` and submits to `contact_process.php`.

```
Browser                          csrf_token.php           contact_process.php
   │                                    │                          │
   │── Page load ──────────────────────>│                          │
   │<─ { csrf_token: "abc123" } ────────│                          │
   │   (injected into hidden form field)│                          │
   │                                    │                          │
   │── User fills form and clicks Send  │                          │
   │── jQuery Validate runs client-side checks                     │
   │── If valid: AJAX POST with {name, email, subject,             │
   │             message, csrf_token}  ──────────────────────────>│
   │                                                               │
   │   contact_process.php:                                        │
   │   1. Verify REQUEST_METHOD === POST                           │
   │   2. Verify CSRF token (hash_equals)                          │
   │   3. Check rate limit (≤ 3 per 10 min per session)            │
   │   4. Validate all fields server-side                          │
   │   5. Strip newlines from header values                        │
   │   6. HTML-encode all body content                             │
   │   7. Send email via mail()                                    │
   │   8. Regenerate CSRF token in session                         │
   │<─ { status: "success" } or { status: "error", message }      │
   │                                                               │
   │── Display #success or #error div                              │
```

---

## 7. Alumni Portal — Detailed Functioning

### 7.1 Registration & Approval Flow

```
New User Registers
        │
        ▼
  user.approval = 'pending'
  JWT token issued (can log in but access is restricted)
        │
        ├── Admin notified (notification inserted for all admins)
        │
        └── Up to 5 approved alumni from same batch/department/course
            assigned as peer reviewers
            (registration_approvals table, vote = NULL)
                    │
                    ▼
          Peer reviewers see pending request in their dashboard
          Each casts vote: 'approve' or 'reject'
                    │
            ┌───────┴───────┐
            │               │
        ≥ 3 approvals   ≥ 3 rejections
            │               │
            ▼               ▼
      approval =      approval =
      'approved'      'rejected'
            │               │
    Full portal         Access denied
    access granted      (notification sent)
            │
            └── Admin always informed of each vote via notification
```

If fewer than 5 peer reviewers exist in the batch/department/course, the admin can approve directly from the admin dashboard.

### 7.2 API Endpoints

| Method | Path | Auth Required | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register new alumni (with optional avatar upload) |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET | `/api/auth/me` | JWT | Get own profile |
| PUT | `/api/auth/me` | JWT | Update own profile |
| GET | `/api/auth/peer-approvals` | JWT | List pending approvals assigned to me |
| PUT | `/api/auth/peer-approvals/:id` | JWT | Cast peer vote (approve/reject) |
| GET | `/api/alumni` | JWT | Browse alumni directory (paginated, filterable) |
| GET | `/api/alumni/:id` | JWT | Get single alumni profile |
| GET | `/api/jobs` | JWT | List job postings |
| POST | `/api/jobs` | JWT + Approved | Post a job |
| GET | `/api/mentorship` | JWT | List mentorship requests |
| POST | `/api/mentorship` | JWT + Approved | Create mentorship request |
| GET | `/api/messages` | JWT | Get conversations |
| POST | `/api/messages` | JWT + Approved | Send a message |
| GET | `/api/events` | JWT | List events |
| POST | `/api/events` | Admin | Create event |
| GET | `/api/admin/users` | Admin | List all users with approval status |
| PUT | `/api/admin/users/:id/approve` | Admin | Approve a registration |
| PUT | `/api/admin/users/:id/reject` | Admin | Reject a registration |
| GET | `/api/health` | No | Health check |

### 7.3 Database Schema Overview

The PostgreSQL database contains the following main tables:

| Table | Description |
|---|---|
| `users` | All registered alumni — stores profile, credentials, approval status, role, login metadata |
| `registration_approvals` | Maps applicant → peer reviewer → vote (approval workflow) |
| `jobs` | Job postings created by alumni |
| `mentorship_requests` | Mentorship connections between alumni |
| `messages` | Direct messages between alumni |
| `events` | Events posted by admins |
| `notifications` | In-app notifications for users |

**User roles:** `alumni` (default), `admin`, `superadmin`

**Approval states:** `pending`, `approved`, `rejected`

Run migrations to initialise the schema:
```bash
cd alumni-portal-backend
npm run migrate        # Initial schema
npm run migrate:v2     # Approval system tables
npm run seed           # (Optional) seed test data
```

---

## 8. Security Audit & Changes

This section documents all security issues found during the audit on **21 May 2026** and all fixes applied.

### 8.1 Vulnerabilities Found

| # | Severity | Issue | Location |
|---|---|---|---|
| 1 | Critical | Email header injection via unsanitized `$_REQUEST['email']` placed directly in `From:` and `Reply-To:` headers | `contact_process.php` |
| 2 | Critical | XSS in email body — `$name`, `$from`, `$cmessage` embedded raw into HTML email without encoding | `contact_process.php` |
| 3 | Critical | Zero server-side input validation — all client-side checks bypassable with `curl` | `contact_process.php` |
| 4 | High | No CSRF protection — form submittable from any origin programmatically | `contact_process.php` |
| 5 | High | `$_REQUEST` used instead of `$_POST` — accepts GET params and cookies as input | `contact_process.php` |
| 6 | High | Undefined variable `$csubject` (should be `$subject`) causing silent bug in email subject line | `contact_process.php:28` |
| 7 | High | Outdated jQuery 2.1.4 (2015) — multiple known CVEs including XSS via `$.parseHTML` | `index.html`, `index2.html` |
| 8 | Medium | No HTTP security headers — no CSP, no X-Frame-Options, no X-Content-Type-Options, etc. | Server/`.htaccess` |
| 9 | Medium | Missing `rel="noopener noreferrer"` on 35+ `target="_blank"` external links — tab-napping attack possible | `index.html`, `index2.html` |
| 10 | Medium | No CAPTCHA or rate limiting on contact form | `contact_process.php` |
| 11 | Low | Suspicious HTTP shortened URL `http://urlkub.co/wRzTv4` used as a scholar Resume link | `index.html:451` |
| 12 | Low | HTTP links instead of HTTPS for ResearcherID and ORCID | `index.html:138-139` |
| 13 | Low | Missing academicons font files — 6 social icons rendered as empty boxes | `css/`, `fonts/` |

---

### 8.2 Fixes Applied

#### Fix 1 — Email Header Injection (Critical)

**Before:**
```php
$from = $_REQUEST['email'];
$headers = "From: " . $from . "\r\n";
$headers .= "Reply-To: ". $from . "\r\n";
```

**After:**
```php
$email = str_replace(["\r", "\n"], '', $_POST['email']);
$headers  = "From: no-reply@iitism.ac.in\r\n";   // Fixed sender
$headers .= "Reply-To: " . $email . "\r\n";        // User in Reply-To only
```
Newlines stripped from all header values; `From:` uses a fixed no-reply address.

---

#### Fix 2 — XSS in Email Body (Critical)

**Before:**
```php
$body .= "<td>{$name}</td>";
$body .= "<td>{$from}</td>";
$body .= "<td>{$cmessage}</td>";
```

**After:**
```php
$name_safe    = htmlspecialchars($name,    ENT_QUOTES, 'UTF-8');
$email_safe   = htmlspecialchars($email,   ENT_QUOTES, 'UTF-8');
$message_safe = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

$body .= "<td>{$name_safe}</td>";
$body .= "<td>{$email_safe}</td>";
$body .= "<td>{$message_safe}</td>";
```

---

#### Fix 3 — Server-Side Validation (Critical)

Added full validation in `contact_process.php`:
```php
if (mb_strlen($name) < 2 || mb_strlen($name) > 100) { $errors[] = '...'; }
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 254) { $errors[] = '...'; }
if (mb_strlen($subject) < 4 || mb_strlen($subject) > 200) { $errors[] = '...'; }
if (mb_strlen($message) < 20 || mb_strlen($message) > 5000) { $errors[] = '...'; }
```

---

#### Fix 4 — CSRF Protection (High)

**New file** `csrf_token.php`:
```php
session_start();
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
echo json_encode(['csrf_token' => $_SESSION['csrf_token']]);
```

**In `index2.html`** — hidden field + JS fetch on page load:
```html
<input type="hidden" name="csrf_token" id="csrf_token" value="">
<script>
  fetch('csrf_token.php', { credentials: 'same-origin' })
    .then(r => r.json())
    .then(data => { document.getElementById('csrf_token').value = data.csrf_token; });
</script>
```

**In `contact_process.php`** — verification using timing-safe comparison:
```php
if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
    http_response_code(403); exit;
}
```

---

#### Fix 5 — `$_REQUEST` → `$_POST` (High)

All `$_REQUEST[...]` replaced with `$_POST[...]` — form data only accepted via HTTP POST body.

---

#### Fix 6 — Undefined Variable Bug (High)

**Before:** `$body .= "<td>{$csubject}</td>";` (undefined — always empty)

**After:** `$body .= "<td>{$subject_safe}</td>";` (correct variable, HTML-encoded)

---

#### Fix 7 — jQuery Upgrade (High)

Downloaded jQuery 3.7.1 to `js/jquery-3.7.1.min.js`. Updated script tags in both `index.html` and `index2.html`.

Old file `js/jquery-2.1.4.min.js` retained for reference but is no longer loaded.

---

#### Fix 8 — HTTP Security Headers (Medium)

**New file** `.htaccess`:
```apache
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
Header always set Content-Security-Policy "default-src 'self'; ..."
Options -Indexes
```

Security meta tags also added to the `<head>` of both `index.html` and `index2.html`:
```html
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
<meta name="referrer" content="strict-origin-when-cross-origin">
```

---

#### Fix 9 — Tab-Napping via `target="_blank"` (Medium)

A Python script was used to add `rel="noopener noreferrer"` to all 35+ `target="_blank"` links across `index.html` and `index2.html`. Verified zero remaining unprotected links.

**Pattern applied:**
```html
<!-- Before -->
<a href="https://..." target="_blank">...</a>

<!-- After -->
<a href="https://..." target="_blank" rel="noopener noreferrer">...</a>
```

---

#### Fix 10 — Rate Limiting (Medium)

Session-based rate limiting added to `contact_process.php`:
```php
if ($_SESSION['contact_attempts'] >= 3) {
    http_response_code(429);
    echo json_encode(['status' => 'error', 'message' => 'Too many requests...']);
    exit;
}
// Window resets every 600 seconds (10 minutes)
```

---

#### Fix 11 — Suspicious Shortened URL (Low)

`http://urlkub.co/wRzTv4` (unverifiable HTTP short link used as a scholar Resume link) was **removed**. The table cell now shows plain text "Resume" with no link until a direct verified URL is provided.

---

#### Fix 12 — HTTP → HTTPS Links (Low)

| Before | After |
|---|---|
| `http://www.researcherid.com/rid/R-6109-2017` | `https://www.webofscience.com/wos/author/record/R-6109-2017` |
| `http://orcid.org/0000-0002-1239-9843` | `https://orcid.org/0000-0002-1239-9843` |

---

#### Fix 13 — Missing Academicons Font (Bug)

Downloaded and added:
- `css/academicons.min.css` — icon stylesheet
- `fonts/academicons.eot` — legacy IE font
- `fonts/academicons.ttf` — TrueType font
- `fonts/academicons.woff` — Web Open Font Format
- `fonts/academicons.svg` — SVG font

This restored 6 broken social icons: ResearcherID, ORCID, Mendeley, Google Scholar, DBLP, Publons.

---

### 8.3 File-by-File Change Log

| File | Changes Made |
|---|---|
| `contact_process.php` | Complete rewrite — POST only, CSRF, rate limiting, server validation, header injection fix, XSS fix, undefined variable fix, JSON responses |
| `csrf_token.php` | **New file** — session-backed CSRF token generator |
| `.htaccess` | **New file** — security headers, directory listing disabled, sensitive file blocking |
| `js/jquery-3.7.1.min.js` | **New file** — jQuery 3.7.1 (replaces 2.1.4) |
| `css/academicons.min.css` | **New file** — academicons stylesheet |
| `fonts/academicons.*` | **New files** (eot, ttf, woff, svg) — academicons font |
| `index.html` | Security meta tags, jQuery 3.7.1, HTTPS links, removed shortened URL, rel=noopener on all external links |
| `index2.html` | Security meta tags, jQuery 3.7.1, CSRF hidden field, CSRF fetch script, maxlength/autocomplete on inputs, rel=noopener on all external links |

---

## 9. Deployment Notes

### Faculty Website (Apache/PHP)

1. Upload all files to the server at `public_html/` (or equivalent)
2. Ensure **mod_headers** and **mod_rewrite** are enabled for `.htaccess` to work:
   ```bash
   sudo a2enmod headers rewrite
   sudo systemctl restart apache2
   ```
3. PHP sessions must be enabled (they are by default on most hosts)
4. To enforce HTTPS, uncomment these lines in `.htaccess`:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```
   And also uncomment the HSTS header:
   ```apache
   Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
   ```
   **Only enable HSTS after confirming the SSL certificate is active** — enabling it without HTTPS will break the site.

### Alumni Portal Backend (Node.js)

1. Copy `.env.example` to `.env` and fill in all values:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run database migrations:
   ```bash
   npm run migrate
   npm run migrate:v2
   ```
4. Start the server:
   ```bash
   npm start          # production
   npm run dev        # development (nodemon)
   ```
5. The API runs on port 5000 by default (configurable via `PORT` in `.env`)

For Render.com deployment, refer to `RENDER_DEPLOYMENT_GUIDE.md`.

### Environment Variables (Alumni Backend)

| Variable | Description |
|---|---|
| `PORT` | Port the API listens on (default: 5000) |
| `NODE_ENV` | `development` or `production` |
| `DB_HOST` | PostgreSQL host |
| `DB_PORT` | PostgreSQL port (default: 5432) |
| `DB_NAME` | Database name |
| `DB_USER` | Database user |
| `DB_PASSWORD` | Database password |
| `JWT_SECRET` | Secret key for signing JWT tokens (use a strong random string) |
| `JWT_EXPIRES_IN` | Token expiry (default: `7d`) |
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | SMTP port (587 for TLS) |
| `SMTP_USER` | SMTP login email |
| `SMTP_PASS` | SMTP app password |
| `EMAIL_FROM` | Sender address for outbound emails |
| `FRONTEND_URL` | Alumni portal frontend URL (for CORS) |
| `ALLOWED_EMAIL_DOMAINS` | Comma-separated allowed alumni email domains |

---

## 10. Remaining Recommendations

These items were not changed in this audit session but are recommended for future improvement:

| Priority | Recommendation |
|---|---|
| High | Enable HTTPS on the Apache host and activate the HSTS header in `.htaccess` |
| High | Add a CAPTCHA (e.g., Cloudflare Turnstile or hCaptcha) to the contact form to prevent bot spam |
| High | Replace `mail()` in `contact_process.php` with a proper SMTP library (PHPMailer or Symfony Mailer) for authenticated email sending and delivery reliability |
| Medium | Upgrade Bootstrap from version 3 (EOL) to Bootstrap 5 |
| Medium | Replace Font Awesome 4 with Font Awesome 6 (version 4 is no longer maintained) |
| Medium | Add a `robots.txt` to prevent search engines from indexing sensitive sub-paths |
| Medium | Remove or password-protect legacy files: `index2.html`, `CW_old.html`, `index_updated.html`, `organised_events.htm` |
| Medium | The alumni portal frontend (`alumni-portal/index.html`) still contains a hardcoded `localhost:5000` API URL shim — update to the live API URL for production |
| Low | Replace the `document.write()` call in the footer copyright with `textContent` assignment |
| Low | Add `alt` text to images that are missing it |
| Low | Minify and bundle custom CSS/JS for faster page loads |
| Low | Add a `<meta name="description">` tag to `index.html` for better SEO |

---

*Documentation generated: 21 May 2026*
*Maintained by: Dr. Annavarapu Chandra Sekhara Rao, Department of CSE, IIT(ISM) Dhanbad*
