import express from 'express';
import CategoryController from '../controller/category.controller';

const router = express.Router();

router.get('/', CategoryController.index);
router.post('/', CategoryController.create);
router.patch('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);

export default router;