import express from 'express';
import BookController from '../controller/book.controller';
import fileUploadMiddleware from '../middleware/file-upload.middleware';
import { roleMiddleware } from '../middleware/roles.middleware';

const router = express.Router();

router.get('/', BookController.index);
router.post('/', fileUploadMiddleware('image_url','books'),roleMiddleware, BookController.create);
router.patch('/:id', roleMiddleware, BookController.update);
router.delete('/:id', roleMiddleware, BookController.delete);

export default router;