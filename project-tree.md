📦 root/
├── 📄 .env
├── 📄 .env.example
│
├── 📁 backend/                          # 🔧 백엔드 (Node.js + Express + Prisma)
│   ├── 📁 src/
│   │   ├── 📁 config/                   # DB 및 설정
│   │   │   └── prisma.service.ts        
│   │   ├── 📁 controllers/             # 도메인별 컨트롤러
│   │   │   ├── auth.controller.ts
│   │   │   ├── disease.controller.ts
│   │   │   ├── llm.controller.ts       # ✅ Ollama 연동 증상 추출 컨트롤러
│   │   │   ├── prediction.controller.ts
│   │   │   ├── record.controller.ts
│   │   │   ├── symptom.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── 📁 data/
│   │   │   └── symptom-en-ko-map.json  # ✅ 영어 → 한글 증상 매핑 JSON
│   │   ├── 📁 middlewares/
│   │   │   └── auth.middleware.ts
│   │   ├── 📁 mock/                    # ✅ 더미 데이터
│   │   │   ├── diseases.ts
│   │   │   ├── predictions.ts
│   │   │   ├── symptomOnRecords.ts
│   │   │   ├── symptomRecords.ts
│   │   │   ├── symptoms.ts
│   │   │   ├── userDiseases.ts
│   │   │   └── users.ts
│   │   ├── 📁 routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── disease.routes.ts
│   │   │   ├── llm.routes.ts
│   │   │   ├── prediction.routes.ts
│   │   │   ├── record.routes.ts
│   │   │   ├── symptom.routes.ts
│   │   │   ├── user.routes.ts
│   │   │   └── index.ts               # ✅ 모든 라우터 통합
│   │   ├── 📁 services/                # ✅ 서비스 계층
│   │   │   ├── auth.service.ts
│   │   │   ├── disease.service.ts
│   │   │   ├── llm.service.ts           # ✅ LLM 증상 추출 요청
│   │   │   ├── prediction.service.ts
│   │   │   ├── record.service.ts
│   │   │   ├── symptom.service.ts
│   │   │   └── user.services.ts
│   │   ├── 📁 utils/                   # ✅ 공통 유틸 함수
│   │   │   ├── getKoreanLabels.ts       # 👉 증상 한글 라벨 반환
│   │   │   ├── jwt.util.ts              # JWT 생성/검증
│   │   │   ├── normalizeSymptoms.ts     # 👉 증상 표준화
│   │   │   ├── symptomLabel.ko.ts       # 👉 라벨링 정의
│   │   │   └── symptomMap.ts            # 👉 영어 증상 키 매핑
│   ├── server.ts
│   │
│   ├── 📁 types/
│   │   └── 📁 express/
│   │       └── index.d.ts
│   │   
│   ├── 📁 prisma/
│   │   └── schema.prisma
│   │
│   ├── package.json
│   └── tsconfig.json
│   
├── 📦 frontend/                   # 🎨 프론트엔드 앱 (React Native + Expo)
│   ├── 📁 app/
│   │   ├── 📁 (auth)/            # 로그인, 프로필 입력 등 인증 흐름
│   │   │   ├── login.tsx
│   │   │   └── profile-form.tsx
│   │   ├── 📁 (record)/          # 증상 입력 및 결과 확인 흐름
│   │   │   ├── result.tsx
│   │   │   └── symptom.tsx
│   │   ├── 📁 (tabs)/             # 하단 탭 네비게이션
│   │   │   ├── _layout.tsx         
│   │   │   ├── home.tsx            # 홈화면
│   │   │   ├── history.tsx         # 진단 기록
│   │   │   ├── setting.tsx         # 설정 화면
│   │   │   └── index.tsx           # 기본 라우팅 인덱스
│   │
│   ├── 📁 src/
│   │   ├── 📁 hooks/             # 커스텀 훅
│   │   │   └── useAuth.ts
│   │   ├── 📁 services/          # 서버 API 연동 모음
│   │   │   ├── auth.api.ts
│   │   │   ├── prediction.api.ts
│   │   │   ├── record.api.ts
│   │   │   ├── user.api.ts
│   │   │   └── axios.ts            # ✅ Axios 설정
│   │   ├── 📁 store/             # 상태관리 (예: auth.store.ts)
│   │   │   └── auth.store.ts
│   │   ├── 📁 types/             # 타입 정의
│   │   │   └── user.api.ts
│   │   ├── 📁 controllers/
│   │   ├── 📁 routes/
│   │   ├── 📁 services/
│   │   ├── 📁 models/
│   │   ├── 📁 middlewares/
│   │   ├── 📁 config/
│   │   ├── 📁 utils/
│   │   └── server.ts
│   │
│   ├── package.json
│   └── tsconfig.json 
|
├── 📦 ai-model/
├── 📦 database/
│   └── 📄 init.sql


📦 frontend/
├── 📁 app/                          # ✅ App Router 기반 페이지 구조
│   ├── 📁 (auth)/                   # 인증 관련
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   ├── welcome.tsx
│   │   └── profile-form.tsx
│   │
│   ├── 📁 (tabs)/                   # 하단 탭 네비게이션 구조
│   │   ├── _layout.tsx
│   │   ├── home.tsx
│   │   ├── history.tsx
│   │   ├── setting.tsx
│   │   └── index.tsx               # 앱 진입 후 최초 페이지 결정
│   │
│   ├── 📁 (record)/                 # 증상 입력 → 결과 확인
│   │   ├── symptom.tsx
│   │   └── result.tsx
│   │
│   ├── 📁 (user)/                   # 프로필 상세, 편집 등
│   │   └── ProfileDetailScreen.tsx
│   │
│   │
│   └── index.tsx                   # 유저 상태에 따라 리디렉션 처리
│
├── 📁 src/                          # 비 UI 영역 (비즈니스 로직)
│   ├── 📁 services/                 # API 통신 (Axios)
│   │   ├── axios.ts
│   │   ├── auth.api.ts
│   │   ├── user.api.ts
│   │   ├── prediction.api.ts
│   │   ├── record.api.ts
│   │   └── llm.api.ts              # ✅ 증상 추출 API
│   │
│   ├── 📁 hooks/                    # 커스텀 훅
│   │   ├── useAuth.ts
│   │   └── useSymptomPrediction.ts
│   │
│   ├── 📁 store/                    # Zustand or Redux 상태 관리
│   │   ├── auth.store.ts
│   │   └── user.store.ts
│   │
│   ├── 📁 types/                    # 공통 타입 정의
│   │   ├── user.api.ts
│   │   ├── record.types.ts
│   │   └── symptom.types.ts
│   │
│   ├── 📁 utils/                    # 헬퍼 함수
│   └── 📁 constants/                # 상수 정의 
│
├── 📁 components/                  # 재사용 가능한 UI 컴포넌트
│   ├── 📁 modals/
│   │   ├── DiseaseSelectModal.tsx
│   │   └── MedicationSelectModal.tsx
│
├── 📁 assets/                      # 이미지, 아이콘, 폰트 등 리소스
│
├── 📄 app.json
├── 📄 tsconfig.json
├── 📄 package.json
└── 📄 metro.config.js
