# Job Posting Dashboard

A Laravel-based job posting dashboard with full CRUD functionality, built with Bootstrap and vanilla JavaScript.

## Features

- ✅ Complete CRUD operations for job postings
- ✅ Responsive dashboard UI matching the provided design
- ✅ RESTful API endpoints
- ✅ Real-time statistics display
- ✅ Modal-based job creation and editing
- ✅ Status badges and application tracking
- ✅ Bootstrap 5 styling (no Tailwind)
- ✅ Axios for API communication

## Tech Stack

- **Backend**: Laravel 10+
- **Frontend**: HTML, CSS, Bootstrap 5, Vanilla JavaScript
- **Database**: MySQL/SQLite
- **HTTP Client**: Axios
- **Icons**: Font Awesome

## Installation & Setup

### Prerequisites

- PHP 8.1+
- Composer
- Node.js & NPM
- MySQL/SQLite

### Backend Setup

1. Clone the repository
```bash
git clone <repository-url>
cd job-dashboard
```

2. Install PHP dependencies
```bash
composer install
```

3. Copy environment file
```bash
cp .env.example .env
```

4. Generate application key
```bash
php artisan key:generate
```

5. Configure database in `.env`
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=job_dashboard
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

6. Run migrations
```bash
php artisan migrate --seed
```

7. Start the development server
```bash
php artisan serve
```



### Jobs API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | Get all jobs |
| POST | `/api/jobs` | Create a new job |
| PUT | `/api/jobs/{id}` | Update job |
| DELETE | `/api/jobs/{id}` | Delete job |
| GET | `/api/dashboard/stats` | Get dashboard statistics |
