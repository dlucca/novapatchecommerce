# NovaPatch
Subscription-based e-commerce platform dedicated to the sale of medical patches with different benefits for users.

## Stack 

* **Frontend:** Next.js 15 
* **Backend:** Medusa.js 
* **Authentication:** Clerk.com 
* **Emails:** Resend 
* **Payment Gateways:** Openpay (México) & Mercado Pago (Brasil) 
* **E2E Tests:** Cypress

## Requirements

* Node.js (v18 or higher recommended)
* npm (or your preferred package manager like pnpm or yarn)
* Docker & Docker Compose
* PostgreSQL (via Docker)

## Setup & Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd novapatchecommerce
```

### 2. Environment Variables Setup
Copy the example environment file and configure your variables:
```bash
# Copy the unified .env.example to both projects
cp .env.example commerce-storefront/.env.local
cp .env.example commerce/.env
```

Edit the environment files with your actual values:
- `commerce-storefront/.env.local` - Frontend configuration
- `commerce/.env` - Backend configuration

### 3. Database Setup
Start PostgreSQL with Docker:
```bash
docker-compose up -d database
```

### 4. Backend Setup (Medusa.js)
```bash
cd commerce
npm install
npm run build
npm run dev
```

The backend will be available at:
- **API:** http://localhost:9000
- **Admin Panel:** http://localhost:9000/app

### 5. Frontend Setup (Next.js)
In a new terminal:
```bash
cd commerce-storefront
npm install
npm run dev
```

The frontend will be available at:
- **Storefront:** http://localhost:8000

## Development URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:8000 | Next.js Storefront |
| Backend API | http://localhost:9000 | Medusa.js API |
| Admin Panel | http://localhost:9000/app | Medusa Admin |
| Database | localhost:5432 | PostgreSQL |

## Project Structure

```
novapatchecommerce/
├── commerce/                 # Medusa.js Backend
│   ├── src/                 # Backend source code
│   ├── package.json         # Backend dependencies
│   └── .env                 # Backend environment variables
├── commerce-storefront/     # Next.js Frontend
│   ├── src/                 # Frontend source code
│   ├── package.json         # Frontend dependencies
│   └── .env.local           # Frontend environment variables
├── docker-compose.yml       # Docker services
└── .env.example            # Environment variables template
```

## Available Scripts

### Backend (commerce/)
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run seed         # Seed database with sample data
```

### Frontend (commerce-storefront/)
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Common Issues

**Database Connection Error:**
```bash
# Make sure PostgreSQL is running
docker-compose up -d database

# Check if the database is accessible
docker-compose logs database
```

**Port Already in Use:**
```bash
# Check what's using the port
lsof -i :8000  # Frontend
lsof -i :9000  # Backend

# Kill the process if needed
kill -9 <PID>
```

## License

This project is proprietary software for NovaPatch.