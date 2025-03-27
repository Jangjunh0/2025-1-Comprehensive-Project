"use strict";
// 🔹 prediction.service.ts
// 이 파일은 예측(Prediction) 관련 비즈니스 로직을 담당하는 서비스 계층입니다.
// 증상 기록 기반으로 예측 결과를 생성하거나, 기존 예측 결과를 조회합니다.
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByRecordId = exports.create = void 0;
const predictions_1 = require("../mock/predictions"); // 더미 예측 데이터
/**
 * 예측 생성 (임시 더미 결과 기반)
 * @param recordId 예측 대상 증상 기록 ID
 */
const create = (recordId) => {
    const already = predictions_1.predictions.find((p) => p.recordId === recordId);
    if (already)
        return { message: "Prediction already exists" };
    const newPrediction = {
        id: `pred-${Date.now()}`,
        recordId,
        result: "감기",
        confidence: 0.91,
        guideline: "수분 섭취와 휴식을 충분히 취하세요.",
        createdAt: new Date().toISOString(),
    };
    predictions_1.predictions.push(newPrediction);
    return newPrediction;
};
exports.create = create;
/**
 * 특정 증상 기록 ID로 예측 결과 조회
 * @param recordId 대상 증상 기록 ID
 */
const findByRecordId = (recordId) => {
    return predictions_1.predictions.find((p) => p.recordId === recordId);
};
exports.findByRecordId = findByRecordId;
