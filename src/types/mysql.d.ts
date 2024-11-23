import { ResultSetHeader, RowDataPacket } from "mysql2";


type MySQLRows<T extends RowDataPacket> = T[];
type MySQLResult = ResultSetHeader;