# 서울 실시간 혼잡도 사이트

서울시 실시간 인구데이터 API를 카카오맵과 연동한 혼잡도 모니터링 사이트입니다.

## 파일 구조

```
seoul-congestion/
├── api/
│   └── congestion.js      ← Vercel 서버리스 함수 (CORS 프록시)
├── public/
│   └── index.html         ← 메인 사이트
├── vercel.json            ← Vercel 설정
└── README.md
```

## Vercel 배포 방법 (무료, 5분 소요)

### 1단계 - GitHub에 올리기
1. [github.com](https://github.com) 접속 → 로그인
2. 우상단 **+** → **New repository** 클릭
3. Repository name: `seoul-congestion` 입력 → **Create repository**
4. 이 폴더의 파일들을 모두 업로드 (Upload files 버튼)

### 2단계 - Vercel에 배포하기
1. [vercel.com](https://vercel.com) 접속 → **GitHub로 로그인**
2. **Add New Project** 클릭
3. 방금 만든 `seoul-congestion` 저장소 선택 → **Import**
4. **Root Directory** 를 `public` 으로 변경 (중요!)
5. **Deploy** 클릭

### 3단계 - 완료
- 배포 완료 후 `https://seoul-congestion-xxx.vercel.app` 형태의 주소가 생성됩니다.
- 이 주소로 접속하면 실시간 혼잡도 사이트가 동작합니다.

## 로컬 테스트 방법

Node.js가 설치되어 있다면:

```bash
npm install -g vercel
vercel dev
```

브라우저에서 `http://localhost:3000` 접속

## 데이터 출처
- 서울시 실시간 인구데이터: https://data.seoul.go.kr/dataList/OA-21778/A/1/datasetView.do
- 갱신주기: 실시간 (5분마다 자동 갱신)
- 대상: 서울 주요 122개 장소
