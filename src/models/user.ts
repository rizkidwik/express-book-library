import pool from '../config/database';
import bcrypt from 'bcryptjs';
interface UserCreateDTO {
  email: string;
  password: string;
  name?: string;
}

interface UserResponseDTO {
  id: number;
  email: string;
  name?: string;
}

import mysql from 'mysql2/promise';

class UserModel {
  static async findByEmail(email: string): Promise<UserResponseDTO | null> {
    const [rows] = await pool.execute<mysql.RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );
    return rows[0] as UserResponseDTO | null;
  }

  static async create(userData: UserCreateDTO): Promise<number> {
    const { email, password, name } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute<mysql.ResultSetHeader>(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)', 
      [email, hashedPassword, name]
    );

    return result.insertId;
  }

  static async findById(id: number): Promise<UserResponseDTO | null>{
    const [rows] = await pool.execute<mysql.RowDataPacket[]>(
        'SELECT id,email,name FROM users where id = ? ',
        [id]
    );
    return rows[0] as UserResponseDTO | null;
  }
}

export default UserModel;
