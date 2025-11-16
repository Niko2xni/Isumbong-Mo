# Start with an official PHP 8.2 image
FROM php:8.2-cli

# Install system dependencies & required PHP extensions
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
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Now, copy the rest of the application code
COPY . .

# We must manually create the cache directory and make it writable
RUN mkdir -p bootstrap/cache
RUN chmod -R 777 bootstrap/cache

# Run the optimize commands individually and skip 'view:cache'
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan event:cache

# Expose the port. Render will use the $PORT variable.
EXPOSE 8000

# --- THIS IS THE FIX ---
# This command will run when the container starts.
# We use sh -c to handle the '&&' operator correctly.
CMD sh -c "php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=$PORT"