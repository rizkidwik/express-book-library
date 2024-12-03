import express from 'express';
import BookController from '../controller/book.controller';
import fileUploadMiddleware from '../middleware/file-upload.middleware';

const router = express.Router();

router.get('/', BookController.index);
router.post('/', fileUploadMiddleware('image','books'), BookController.create);
router.patch('/:id', BookController.update);
router.delete('/:id', BookController.delete);

export default router;