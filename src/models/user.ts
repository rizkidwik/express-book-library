import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import {pool} from '../config/database';
import bcrypt from 'bcryptjs';

export interface User extends RowDataPacket {
    id: number;
    email: string;
    password: string;
    name?: string;
    roles?: string;
    created_at: Date;
}

export interface CreateUserDTO {
    email: string;
    password: string;
    name?: string;
    roles?: string;
}

export class UserModel {
    static async findByEmail(email: string): Promise<User | null> {
        const [rows] = await pool.execute<User[]>(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0] || null;
    }

    static async create(userData: CreateUserDTO): Promise<number> {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const roles = userData.roles ?? 'member'
        const [result] = await pool.execute<ResultSetHeader>(
            'INSERT INTO users (email, password, name, roles) VALUES (?,?,?,?)',
            [userData.email, hashedPassword, userData.name, roles]
        );

        return result.insertId;
    }

    static async findById(id: number): Promise<any>{
        const [rows] = await pool.execute<User[]>(
            'SELECT id, email,name,roles, created_at FROM users WHERE id = ?',
            [id]
        );
        
        return rows[0] || null;
    }
}