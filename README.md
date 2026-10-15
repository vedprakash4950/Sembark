# Linkboard URL Shortener

A Laravel 12 URL shortener with company tenancy, role-based access, invitations, and public redirects.

## Requirements

- PHP 8.2+
- Composer
- Node.js/npm (only needed to compile the starter assets)

## Local setup

```sh
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
npm install
npm run build
php artisan serve
```

Open http://127.0.0.1:8000. The seeded Super Admin is `superadmin@crm.com` with password `Admin@987` 

## AI use disclosure

OpenAI Codex (ChatGPT) was used to write code according to instructions.
