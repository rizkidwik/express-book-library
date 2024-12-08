import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import bookRoutes from "./routes/book.routes";
import borrowRoutes from "./routes/borrow.routes";
import { authMiddleware } from "./middleware/auth.middleware";
import { roleMiddleware } from "./middleware/roles.middleware";
import cors from 'cors'
import path from "path";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use("/auth", authRoutes);
app.use("/categories", roleMiddleware, categoryRoutes);
app.use("/books", roleMiddleware, bookRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use("/borrows", roleMiddleware, borrowRoutes)

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app };