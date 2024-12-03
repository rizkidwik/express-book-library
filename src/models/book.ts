import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../config/database";

export interface Book extends RowDataPacket {
    id: number;
    title: string;
    description: string;
    image_url: string;
    release_year: number;
    price: string;
    total_page: number;
    thickness: string;
    created_at: Date;
    updated_at: Date;
    category_id: number;
}

export interface CreateBookDTO {
    title: string;
    description: string;
    image_url: string;
    release_year: number;
    price: string;
    total_page: number;
    category_id: number;
}

export class BookModel {
    static async findById(id: number): Promise<Book | null> {
        const [rows] = await pool.execute<Book[]>(
            'SELECT * FROM books WHERE id = ?',
            [id]
        );
        return rows[0] || null;
    }

    static async create(data: CreateBookDTO): Promise<number> {
        let thickness = ''
        if(data.total_page <= 100){
            thickness = 'tipis'
        } else if(data.total_page > 100 && data.total_page <= 200){
            thickness = 'sedang'
        } else {
            thickness = 'tebal'
        }
        
        const [result] = await pool.execute<ResultSetHeader>(
            'INSERT INTO books (title,description,image_url,release_year,price,total_page,thickness,category_id) VALUES (?,?,?,?,?,?,?,?)',
            [data.title, data.description, data.image_url, data.release_year,data.price, data.total_page, thickness, data.category_id]
        );

        return result.insertId;
    }

    static async getAll(): Promise<object> {
        const [result] = await pool.execute<ResultSetHeader>(
            'SELECT books.*, categories.name as category_name from books LEFT JOIN categories ON books.category_id = categories.id'
        );

        return result;
    }

    static async update(id: number, data: CreateBookDTO):Promise<number> {
        let thickness = ''
        if(data.total_page <= 100){
            thickness = 'tipis'
        } else if(data.total_page > 100 && data.total_page <= 200){
            thickness = 'sedang'
        } else {
            thickness = 'tebal'
        }
        
        const [result] = await pool.execute<ResultSetHeader>(
            'UPDATE books SET title = ?, description = ?, image_url = ?, release_year = ?, price = ?, total_page = ?, thickness = ?, category_id = ? WHERE id = ?',
            [data.title, data.description, data.image_url, data.release_year,data.price, data.total_page, thickness, data.category_id, id]
        )

        return result.affectedRows
    }

    static async delete(id: number): Promise<number>{
        const [result] = await pool.execute<ResultSetHeader>('DELETE FROM books WHERE id = ?',
            [id]
        )

        return result.affectedRows
    }
}