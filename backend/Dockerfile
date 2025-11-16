# Start with an official PHP 8.2 image
FROM php:8.2-fpm

# Install system dependencies & required PHP extensions
# We add libpq-dev for PostgreSQL (pgsql)
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_pgsql bcmath zip

# Install Composer (the PHP package manager)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set the working directory inside the container
WORKDIR /var/www/html

# Copy composer files
COPY composer.json composer.lock ./

# Install dependencies WITHOUT running scripts
# This prevents errors about 'artisan' not existing yet
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Now, copy the rest of the application code
COPY . .

# --- THIS IS THE FIX ---
# We must manually create the cache directory and make it writable
# because we (correctly) added it to .gitignore
RUN mkdir -p bootstrap/cache
RUN chmod -R 777 bootstrap/cache
# --- END OF FIX ---
    
# Run 'artisan optimize'. This caches everything AND
# safely runs 'package:discover'
RUN php artisan optimize

# Expose the port. Render will use the $PORT variable.
EXPOSE 8000