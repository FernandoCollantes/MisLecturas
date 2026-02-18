const pool = require('./src/config/db');

(async () => {
    try {
        console.log('Starting migration...');

        // Add review column if missing
        try {
            await pool.execute('ALTER TABLE books ADD COLUMN review TEXT');
            console.log('Added review column');
        } catch (e) {
            console.log('Review column might already exist or error:', e.message);
        }

        // Add finished_at column if missing
        try {
            await pool.execute('ALTER TABLE books ADD COLUMN finished_at DATE DEFAULT NULL');
            console.log('Added finished_at column');
        } catch (e) {
            console.log('Finished_at column might already exist or error:', e.message);
        }

        // Add rating column if missing (though it might be there)
        try {
            await pool.execute('ALTER TABLE books ADD COLUMN rating INT DEFAULT 0');
            console.log('Added rating column');
        } catch (e) {
            console.log('Rating column might already exist or error:', e.message);
        }

        console.log('Migration finished');
        process.exit(0);
    } catch (error) {
        console.error('Fatal error:', error.message);
        process.exit(1);
    }
})();
