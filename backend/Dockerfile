# ... (all the previous lines)
# Now, copy the rest of the application code
COPY . .

# We must manually create the cache directory and make it writable
RUN mkdir -p bootstrap/cache
RUN chmod -R 777 bootstrap/cache

# --- THIS IS THE FIX ---
# Run the optimize commands individually and skip 'view:cache',
# which is not needed for an API and is causing the build to fail.
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan event:cache
# --- END OF FIX ---

# Expose the port. Render will use the $PORT variable.
EXPOSE 8000