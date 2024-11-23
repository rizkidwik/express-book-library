import { CategoryModel, CreateCategoryDTO } from "../models/category";

export class CategoryService {
    static async create(data: CreateCategoryDTO){
        const resultId = await CategoryModel.create(data);

        return { resultId };
    }

    static async getAll(){
        const data = await CategoryModel.getAll();

        return { data }
    }

    static async update(id: number, name: string){
        const category = await CategoryModel.findById(id);
        if(!category){
            throw new Error('Category not found');
        }
        const result = await CategoryModel.update(id,name)

        return { result }
    }

    static async delete(id: number){
        const category = await CategoryModel.findById(id);
        if(!category){
            throw new Error('Category not found');
        }
        const result = await CategoryModel.delete(id)

        return { result }
    }
}