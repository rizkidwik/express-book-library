import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { ApiResponse } from '../types/common';
import { CategoryModel } from '../models/category';
interface CategoryRequest {
    name: string;
}

class CategoryController {

    public async index(
        req: Request,
        res: Response
    ): Promise<any>{
        try {
            const result = await CategoryService.getAll()

            return res.status(200).json({
                success: true,
                message: 'Data fetched successfully',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Create category failed'
            });
        }
    }
    public async create(
        req: Request<{}, ApiResponse,CategoryRequest>,
        res: Response<ApiResponse>
    ): Promise<any> {
        try {
            const { name }  = req.body;

            if (!name ) {
                return res.status(400).json({
                    success: false,
                    message: 'Name is required'
                });
            }

            const result = await CategoryService.create({name});

            return res.status(201).json({
                success: true,
                message: 'Category successfully created',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Create category failed'
            });
        }
    }

    public async update(
        req: Request,
        res: Response
    ): Promise<any> {
        const { id } = req.params;
        const { name } = req.body;
        try {
            if(!id){
                return res.status(400).json({
                    success: false,
                    message: 'ID is required'
                });
            }

            const result = await CategoryService.update(parseInt(id), name)
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

            const result = await CategoryService.delete(parseInt(id))
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

export default new CategoryController;