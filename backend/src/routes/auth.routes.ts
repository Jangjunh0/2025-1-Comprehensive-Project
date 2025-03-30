// 🔹 auth.routes.ts
// 이 파일은 사용자 인증(Authentication) 관련 라우터를 정의합니다.
// 회원가입 및 로그인 요청을 처리합니다.

import { Router } from "express";
import * as authController from "../controllers/auth.controller";

const router = Router();

// [POST] /auth/register - 회원가입
router.post("/register", authController.register);

// [POST] /auth/login - 로그인
router.post("/login", authController.login);

export default router;
