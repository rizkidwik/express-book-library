import { ResultSetHeader, RowDataPacket } from "mysql2";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
            }
        }
    }
}

type MySQLRows<T extends RowDataPacket> = T[];
type MySQLResult = ResultSetHeader;