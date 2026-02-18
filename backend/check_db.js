const pool = require('./src/config/db');
const fs = require('fs');

(async () => {
    try {
        const [tables] = await pool.execute('SHOW TABLES');
        const results = { tables };

        const [columns] = await pool.execute('DESCRIBE books');
        results.columns = columns;

        fs.writeFileSync('db_info.json', JSON.stringify(results, null, 2));
        console.log('DB info written to db_info.json');
        process.exit(0);
    } catch (error) {
        fs.writeFileSync('db_error.txt', error.stack);
        console.error('Error:', error.message);
        process.exit(1);
    }
})();
