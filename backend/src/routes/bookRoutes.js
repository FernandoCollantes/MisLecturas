const express = require('express');
const BookController = require('../controllers/BookController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

router.get('/', BookController.getAll);
router.post('/', BookController.create);
router.put('/:id', BookController.update);
router.delete('/:id', BookController.delete);

module.exports = router;
