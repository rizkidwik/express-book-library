import { Request, Response } from 'express';
import { BookService } from '../services/book.service';
import { ApiResponse } from '../types/common';
import { CreateBookDTO } from '../models/book';

class BookController {

    public async index(
        req: Request,
        res: Response
    ): Promise<any>{
        try {
            const result = await BookService.getAll()

            return res.status(200).json({
                success: true,
                message: 'Data fetched successfully',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Create book failed'
            });
        }
    }
    public async create(
        req: Request<{}, ApiResponse,CreateBookDTO>,
        res: Response<ApiResponse>
    ): Promise<any> {
        try {
            if(req.body.release_year < 1980 || req.body.release_year > 2021){
                return res.status(400).json({
                    success: false,
                    message: 'Release year not valid. Valid year is 1980 - 2021'
                })
            }
            req.body.image_url = req.file?.path ?? '-'
            const result = await BookService.create(req.body);

            return res.status(201).json({
                success: true,
                message: 'Book successfully created',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Create book failed'
            });
        }
    }

    public async update(
        req: Request,
        res: Response
    ): Promise<any> {
        const { id } = req.params;
        try {
            if(!id){
                return res.status(400).json({
                    success: false,
                    message: 'ID is required'
                });
            }
            const release_year = parseInt(req.body.release_year)
            
            if(release_year < 1980 || release_year > 2021){
                return res.status(400).json({
                    success: false,
                    message: 'Release year not valid. Valid year is 1980 - 2021'
                })
            }
            const result = await BookService.update(parseInt(id), req.body)
            return res.status(200).json({
                success: true,
                message: 'Updated'
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Update failed'
            });
        }
    }

    public async delete(
        req: Request,
        res: Response
    ): Promise<any> {
        const { id } = req.params;
        try {
            if(!id){
                return res.status(400).json({
                    success: false,
                    message: 'ID is required'
                });
            }

            const result = await BookService.delete(parseInt(id))
            return res.status(200).json({
                success: true,
                message: 'Deleted'
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Delete failed'
            });
        }
    }
}

export default new BookController;