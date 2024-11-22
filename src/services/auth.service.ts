import UserModel from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResult {
  userId: number;
  token: string;
}

class AuthService {
  static async register(
    userData: LoginCredentials & { name?: string }
  ): Promise<AuthResult> {
    const existingUser = await UserModel.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const userId = await UserModel.create(userData);

    const token = this.generateToken(userId, userData.email);

    return { userId, token };
  }

  private static generateToken(userId: number, email: string): string {
    return jwt.sign(
      { id: userId, email },
      process.env.JWT_SECRET || "jwt_secret",
      { expiresIn: "8h" }
    );
  }
}

export default AuthService;
