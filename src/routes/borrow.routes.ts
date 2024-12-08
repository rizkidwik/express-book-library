import express from 'express';
import BorrowController from '../controller/borrow.controller';

const router = express.Router();

router.get('/', BorrowController.list)
router.post('/request', BorrowController.request)
router.post('/approve', BorrowController.approve)
router.post('/return', BorrowController.return)
export default router;