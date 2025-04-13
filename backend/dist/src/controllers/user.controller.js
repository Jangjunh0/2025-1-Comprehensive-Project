"use strict";
// 🔹 user.controller.ts
// 사용자 API 요청을 처리하는 컨트롤러 계층입니다.
// 요청 데이터를 파싱하고 서비스 로직을 호출하며 응답을 반환합니다.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = void 0;
const userService = __importStar(require("../services/user.services"));
const user_schema_1 = require("../schemas/user.schema");
const zod_1 = require("zod");
/**
 * 사용자 ID로 사용자 조회
 * GET /users/:id
 */
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
    res.json(user);
});
exports.getUserById = getUserById;
/**
 * 사용자 정보 업데이트
 * PATCH /users/:id
 */
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ✅ Zod 유효성 검사 수행
        const parsed = user_schema_1.userUpdateSchema.parse(req.body);
        const updated = yield userService.update(req.params.id, parsed);
        res.json(updated);
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return res.status(400).json({
                message: "입력값이 유효하지 않습니다.",
                errors: err.errors, // 배열 형태로 상세 필드 정보 포함
            });
        }
        console.error("❌ 사용자 업데이트 오류:", err);
        res
            .status(500)
            .json({ message: "사용자 정보를 수정하는 중 오류가 발생했습니다." });
    }
});
exports.updateUser = updateUser;
/**
 * 사용자 삭제
 * DELETE /users/:id
 */
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield userService.remove(req.params.id);
        res.json(deleted);
    }
    catch (err) {
        console.error("❌ 사용자 삭제 오류:", err);
        res.status(500).json({ message: "사용자를 삭제하는 중 오류가 발생했습니다." });
    }
});
exports.deleteUser = deleteUser;
