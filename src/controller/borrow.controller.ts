import { Request, Response } from 'express';
import { BorrowService } from '../services/borrow.service';
import { ApiResponse } from '../types/common';
import { CreateBookDTO } from '../models/book';
import { BookService } from '../services/book.service';
import { CreateBorrowRequest, STATUS, UpdateBorrow } from '../models/borrow';

class BorrowController {

    public async list(
        req: Request<{}, ApiResponse>,
        res: Response<ApiResponse>
    ): Promise<any> {
        try {

            const result = await BorrowService.list()
            return res.status(200).json({
                success: true,
                message: 'Successfully processed',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Create book failed'
            });
        }
    }
    public async request(
        req: Request<{}, ApiResponse, CreateBorrowRequest>,
        res: Response<ApiResponse>
    ): Promise<any> {
        try {
            await BookService.findById(req.body?.book_id)

            const lateCheck = await BorrowService.userLateCheck(req.user.id)
            console.log(lateCheck)
            if(lateCheck > 0){
                throw Error('User is temporary banned for books borrow because late return.')
            }
            req.body.user_id = req.user.id
            req.body.status = STATUS['PENDING']

            const result = await BorrowService.request(req.body)

            return res.status(200).json({
                success: true,
                message: 'Request successfully processed',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed'
            });
        }
    }

    public async approve(
        req: Request<{}, ApiResponse, UpdateBorrow>,
        res: Response<ApiResponse>
    ): Promise<any> {
        try {            
            const result = await BorrowService.approve(req.body)
            return res.status(200).json({
                success: true,
                message: 'Approved',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed'
            });
        }
    }

    public async return(
        req: Request<{}, ApiResponse,UpdateBorrow>,
        res: Response<ApiResponse>
    ): Promise<any> {
        try {
            const result = await BorrowService.return(req.body)
            return res.status(200).json({
                success: true,
                message: 'Book return successfully',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Create book failed'
            });
        }
    }
}

export default new BorrowController;