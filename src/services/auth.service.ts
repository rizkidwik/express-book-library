import { UserModel, CreateUserDTO } from "../models/user";
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../utils/jwt.util";

export class AuthService {
    static async register(userData: CreateUserDTO){
        const existingUser = await UserModel.findByEmail(userData.email);

        if(existingUser){
            throw new Error('User already exists');
        }

        const userId = await UserModel.create(userData);
        const token = generateToken({id: userId, email: userData.email})

        return { userId, token };
    }

    static async login(email:string, password: string){
        const user = await UserModel.findByEmail(email);

        if(!user){
            throw new Error('Invalid credentials');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            throw new Error('Invalid credentials');
        }

        const token = generateToken({id: user.id, email: user.email});
        return { user: user, token};
    }
}