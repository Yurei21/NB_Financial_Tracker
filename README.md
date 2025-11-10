# Financial Tracker App

A **desktop and web financial tracking application** built with Laravel, React, and Inertia. This app helps small companies manage **orders, expenses, invoices, and reports**, with offline and online support.

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Database Schema](#database-schema)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Offline & Online Account Management](#offline--online-account-management)  
- [License](#license)  

---

## Features

- **Order Management**: Track client orders with amount, description, and creation metadata.  
- **Invoices**: Auto-generate invoices linked to orders.  
- **Expense Tracking**: Log expenses with labels and amounts.  
- **Reporting**: Monthly reports with daily income/expense snapshots.  
- **Offline & Online Account Management**:  
  - Registration codes for online account creation.  
  - Secret key in `.env` for offline account creation and password resets.  
- **PDF Data Handling**: Functions for reading PDFs and importing data into the SQLite database.  
- **Search & Filtering**: Filter orders, expenses, and invoices easily.  

---

## Tech Stack

- **Backend**: Laravel 12 + Inertia  
- **Frontend**: React (with Inertia)  
- **Database**: SQLite (local), PostgreSQL (cloud)  
- **Desktop App Wrapper**: Native PHP  
- **ORM**: Eloquent  

---

## Database Schema

Tables include:

- `users`: id, username, password, remember_token, timestamps  
- `orders`: id, patient_name, order_date, amount, description, created_by → users, modified_by → users, timestamps  
- `invoices`: id, order_id → orders, transaction_id, total_amount, description, timestamps  
- `expenses`: id, description, label, amount, expense_date, created_by → users, modified_by → users, timestamps  
- `reports`: id, month, total_orders, total_income, total_expenses, net_profit, generated_at, daily_data JSON, timestamps  
- `registration_codes`: id, code_hash, expires_at, timestamps  

---

## Installation

1. Clone the repository:  
```bash
git clone https://github.com/<your-username>/financial-tracker.git
cd financial-tracker
```

2. Install backend dependencies:  
```bash
composer install
```

3. Install frontend dependencies:  
```bash
npm install
npm run build
```

4. Configure environment:  
```bash
cp .env.example .env
php artisan key:generate
```

5. Run migrations:  
```bash
php artisan migrate
```

6. Run locally:  
```bash
php artisan serve
npm run dev
```

---

## Usage

- Access the app locally via `http://localhost:8000`.  
- Admin user receives registration codes via email for online setup.  
- Use secret key in `.env` for offline setup and password resets.  
- Reports auto-generate monthly, and you can view daily snapshots in JSON format.  

---

## Offline & Online Account Management

- **Online**: Registration code sent to the company owner’s email for account creation.  
- **Offline**: Secret backup key in `.env` allows trusted users to create accounts and reset passwords locally.  

> ⚠️ Only recommended for single-company, single-computer deployment with trusted users.  

---

## License

This project is licensed under the MIT License.
