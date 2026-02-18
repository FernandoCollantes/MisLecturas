const BookService = require('../src/services/BookService');

(async () => {
    try {
        console.log('Testing BookService.createBook...');
        const userId = 1; // Assuming user 1 exists
        const bookData = {
            title: 'Test Book ' + Date.now(),
            author: 'Test Author',
            status: 'pending'
        };

        const book = await BookService.createBook(userId, bookData);
        console.log('Book created successfully:', JSON.stringify(book, null, 2));
        process.exit(0);
    } catch (error) {
        console.error('Test failed:', error.message);
        process.exit(1);
    }
})();
