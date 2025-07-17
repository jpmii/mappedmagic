# MappedMagic

MappedMagic is a Laravel-based web application for managing theme park trips, reservations, hotel stays, and more. It provides a modern, user-friendly interface for planning and tracking your theme park adventures.

## Features

- User authentication and profile management
- Trip planning and daily itineraries
- Hotel and reservation management
- Attraction wait time tracking
- Subscription and contact support
- Responsive, modern UI built with React and Tailwind CSS

## Getting Started

### Prerequisites

- PHP 8.1+
- Composer
- Node.js & npm
- MySQL or compatible database

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/mappedmagic.git
   cd mappedmagic
   ```

2. **Install PHP dependencies:**
   ```bash
   composer install
   ```

3. **Install JavaScript dependencies:**
   ```bash
   npm install
   ```

4. **Copy and configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your database and mail settings
   ```

5. **Generate application key:**
   ```bash
   php artisan key:generate
   ```

6. **Run migrations and seeders:**
   ```bash
   php artisan migrate --seed
   ```

7. **Build frontend assets:**
   ```bash
   npm run build
   ```

8. **Start the development server:**
   ```bash
   php artisan serve
   ```

## Usage

- Visit `http://localhost:8000` in your browser.
- Register a new account and start planning your trips!

## Contributing

Contributions are welcome! Please open issues or submit pull requests for new features, bug fixes, or improvements.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Security

If you discover a security vulnerability, please email [your-email@example.com] instead of using the issue tracker.

## Acknowledgements

- [Laravel](https://laravel.com/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
