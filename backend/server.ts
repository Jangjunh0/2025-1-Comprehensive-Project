import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import apiRouter from './src/routes';
import { corsMiddleware } from "./src/config/cors.config";

// .env 파일이 root 경로에 있다는 것을 명시적으로 지정
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();

const BACKEND_PORT = process.env.BACKEND_PORT || 5000;

console.log(`Loaded PORT from .env: ${process.env.BACKEND_PORT}`);
console.log(`Using PORT: ${BACKEND_PORT}`);
console.log("Database URL:", process.env.DATABASE_URL);
console.log("Origin URL:", process.env.FRONTEND_ORIGIN);

app.use(corsMiddleware);
app.use(bodyParser.json());

// 라우터 연결
app.use('/api', apiRouter);



app.listen(BACKEND_PORT, () => {
    console.log(`Server is running on http://localhost:${BACKEND_PORT} `);
});
