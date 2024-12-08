import { ResultSetHeader, RowDataPacket } from "mysql2";
import {pool} from "../config/database";

export interface Borrow extends RowDataPacket {
    id: number;
    user_id: number;
    book_id: number;
    day: number;
    start_date: Date;
    end_date: Date;
    status: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

export interface CreateBorrowRequest {
    user_id?: number;
    book_id: number;
    day: number;
    status: number;
}

export interface UpdateBorrow {
    id: number;
    status: number;
    start_date?: Date;
    end_date?: Date;
}

export interface ReturnBorrow {
    id: number;
    status: number;
    end_date?: Date;
}

export enum STATUS {
    PENDING = 0,
    APPROVED = 1,
    RETURN = 2,
    LATE = 3
}

export class BorrowModel {
    static async findById(id: number): Promise<Borrow | null> {
        const [rows] = await pool.execute<Borrow[]>(
            'SELECT * FROM borrows WHERE id = ?',
            [id]
        );
        return rows[0] || null;
    }

    static async create(data: CreateBorrowRequest): Promise<number> {
        const [result] = await pool.execute<ResultSetHeader>(
            'INSERT INTO borrows (user_id, book_id, day, status) VALUES (?,?,?,?)',
            [data.user_id, data.book_id, data.day, data.status]
        )

        return result.insertId;
    }

    static async approve(data: UpdateBorrow): Promise<number> {
        const [result] = await pool.execute<ResultSetHeader>(
            'UPDATE borrows SET status = ?, start_date = ?, end_date = ? WHERE id = ?',
            [data.status, data.start_date, data.end_date, data.id]
        )

        return result.affectedRows
    }
    
    static async return(data: ReturnBorrow): Promise<number> {
        const [result] = await pool.execute<ResultSetHeader>(
            'UPDATE borrows SET status = ?, end_date = ? WHERE id = ?',
            [data.status, data.end_date, data.id]
        )

        return result.affectedRows
    }

    static async userLateCheck(id: number): Promise<number> {
        const status = STATUS['LATE']
        const dateMax = new Date()
        dateMax.setDate(dateMax.getDate() - 30)
        
        const [result] = await pool.execute<RowDataPacket[]>(
            `SELECT count(*) as total from borrows where user_id = ? AND 
            status = ?  AND end_date > ? LIMIT 1
            `,
            [id, status, dateMax]
        )

        return result[0].total
    }
}