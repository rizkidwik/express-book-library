import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../config/database";

export interface Category extends RowDataPacket {
    id: number;
    name: string;
    created_at: Date;
}

export interface CreateCategoryDTO {
    name: string;
}

export class CategoryModel {
    static async findById(id: number): Promise<Category | null> {
        const [rows] = await pool.execute<Category[]>(
            'SELECT * FROM categories WHERE id = ?',
            [id]
        );
        return rows[0] || null;
    }

    static async create(data: CreateCategoryDTO): Promise<number> {
        const [result] = await pool.execute<ResultSetHeader>(
            'INSERT INTO categories (name) VALUES (?)',
            [data.name]
        );

        return result.insertId;
    }

    static async getAll(): Promise<object> {
        const [result] = await pool.execute<ResultSetHeader>(
            'SELECT * from categories'
        );

        return result;
    }

    static async update(id: number, name: string):Promise<number> {
        const [result] = await pool.execute<ResultSetHeader>('UPDATE categories SET name = ? WHERE id = ?',
            [name, id]
        )

        return result.affectedRows
    }

    static async delete(id: number): Promise<number>{
        const [result] = await pool.execute<ResultSetHeader>('DELETE FROM categories WHERE id = ?',
            [id]
        )

        return result.affectedRows
    }
}