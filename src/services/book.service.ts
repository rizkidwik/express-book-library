import { BookModel, CreateBookDTO } from "../models/book";

export class BookService {
    static async create(data: CreateBookDTO){
        const resultId = await BookModel.create(data);

        return { resultId };
    }

    static async getAll(){
        const data = await BookModel.getAll();

        return data
    }

    static async update(id: number, data: CreateBookDTO){
        const book = await BookModel.findById(id);
        if(!book){
            throw new Error('Book not found');
        }
        
        const result = await BookModel.update(id,data)

        return { result }
    }

    static async delete(id: number){
        const book = await BookModel.findById(id);
        if(!book){
            throw new Error('Book not found');
        }
        const result = await BookModel.delete(id)

        return { result }
    }
}