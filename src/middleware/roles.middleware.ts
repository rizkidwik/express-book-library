import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";
import { UserModel } from "../models/user";

export const roleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = verifyToken(token) as { id: number; email: string };
    const user = await UserModel.findById(decoded.id);
    
    if(user.roles != 'admin'){
        return res.status(403).json({
            success: false,
            message: 'You dont have access to this path'
        })
    }
    req.user = decoded;
    next();
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
