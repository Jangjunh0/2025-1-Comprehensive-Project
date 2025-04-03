/**
 * symptom.tsx
 * 증상 입력 → 증상 기록 저장 → 예측 요청 → 결과 출력까지의 API 연동 흐름을 담당하는 화면입니다.
 * 현재는 UI 없이 더미 데이터를 자동으로 전송하며, 실제 API 연동 로직만 구성됩니다.
 */

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { createSymptomRecord } from "@/services/record.api";
import { useRouter } from "expo-router";

export default function SymptomScreen() {
    const { user } = useAuthStore();
    const router = useRouter();

    /**
     * 🔹 handleSymptomPrediction
     * 1. 사용자의 증상을 기록 (POST /records/user/:userId/symptom-records)
     * 2. 해당 기록을 기반으로 예측 요청 (POST /predictions/symptom-records/:recordId/prediction)
     * 3. 예측 결과를 콘솔에 출력
     */
    const handleSymptomPrediction = async () => {
        if (!user) {
            console.warn("⚠️ 사용자 정보가 없습니다.");
            return;
        }

        try {
            // ✅ 1단계: 증상 기록 생성
            const record = await createSymptomRecord({
                userId: user.id,
                symptomIds: ["symptom-001", "symptom-003"] // ✅ 더미 증상
            });

            console.log("✅ 증상 기록 생성됨:", record);


            // ✅ 결과 페이지로 이동하며 recordId 전달
            router.push(`/result?recordId=${record.id}`);

        } catch (error) {
            console.error("❌ 예측 요청 실패:", error);
        }
    };

    // 화면 마운트 시 자동 실행
    useEffect(() => {
        handleSymptomPrediction();
    }, []);

    return null; // 👉 추후 UI 입력 폼/선택 UI로 대체 예정
}
