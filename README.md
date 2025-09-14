# 🎮 LostBoard

> Lost Ark 플레이어를 위한 레이드 효율성 분석 및 캐릭터 관리 도구

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=flat-square&logo=redux)](https://redux-toolkit.js.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-6.3.1-0081CB?style=flat-square&logo=mui)](https://mui.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## 📋 프로젝트 소개

LostBoard는 Lost Ark 플레이어들이 보다 효율적으로 게임을 즐길 수 있도록 도와주는 웹 애플리케이션입니다. 
Lost Ark 공식 API를 활용하여 캐릭터 정보를 조회하고, 레이드별 효율성을 분석하여 최적의 플레이 전략을 제공합니다.

### ✨ 주요 기능

- **🔍 캐릭터 검색**: Lost Ark 캐릭터명으로 계정 내 모든 캐릭터 정보 조회
- **📊 레이드 현황판**: 캐릭터별 입장 가능한 레이드 목록 및 클리어 체크
- **💰 효율성 계산**: 레이드별 골드 수익과 재료 획득량 기반 효율성 분석
- **🧮 계산기**: 레이드 파티 구성에 따른 적정 입찰가 계산
- **📱 반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 환경 지원

## 🛠 기술 스택

### Frontend
- **React 18.3.1** - 사용자 인터페이스 구축
- **Redux Toolkit** - 전역 상태 관리
- **React Router DOM** - 클라이언트 사이드 라우팅
- **Material-UI** - UI 컴포넌트 라이브러리
- **Bootstrap** - 반응형 레이아웃

### API & Data
- **Axios** - HTTP 클라이언트
- **Lost Ark Open API** - 게임 데이터 연동

### Development Tools
- **Create React App** - 프로젝트 설정 및 빌드
- **React Testing Library** - 컴포넌트 테스팅
- **Jest** - 단위 테스트 프레임워크

## 🚀 시작하기

### 사전 요구사항
- Node.js 16.0.0 이상
- npm 또는 yarn 패키지 매니저
- Lost Ark Open API 키 ([발급받기](https://developer-lostark.game.onstove.com/))

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone https://github.com/jo-kwanwoo/lostboard.git
   cd lostboard
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **환경변수 설정**
   ```bash
   # .env 파일 생성 후 다음 내용 추가
   REACT_APP_API_TOKEN=Bearer_YOUR_API_TOKEN
   REACT_APP_API_ID=YOUR_API_ID
   ```

4. **개발 서버 실행**
   ```bash
   npm start
   ```
   브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속

5. **프로덕션 빌드**
   ```bash
   npm run build
   ```

## 📱 사용법

### 1. 캐릭터 검색
- 메인 페이지에서 Lost Ark 캐릭터명 입력
- 해당 계정의 모든 캐릭터 정보 확인

### 2. 레이드 현황 관리
- 캐릭터별 입장 가능한 레이드 목록 확인
- 클리어 여부 체크 및 골드 획득 관리
- 더보기 보상 선택을 통한 추가 재료 획득

### 3. 효율성 분석
- 티어별 레이드 효율성 비교
- 실시간 재료 가격 기반 수익성 계산
- 최적의 레이드 우선순위 제안

### 4. 계산기 활용
- 레이드 파티 구성(4인/8인/16인)에 따른 적정 입찰가 계산
- 10% 이득 기준 권장 가격 제시

## 🎯 주요 화면

### 메인 페이지
- 캐릭터 검색 인터페이스
- 직관적인 검색 기능

### 현황판
- 캐릭터별 레이드 입장 가능 목록
- 체크박스를 통한 클리어 상태 관리
- 실시간 재료 계산 및 표시

### 효율성 분석
- 4티어/3티어 레이드별 효율성 비교
- 더보기 보상 대비 비용 분석

## 🔧 개발 스크립트

```bash
# 개발 서버 실행
npm start

# 테스트 실행
npm test

# 프로덕션 빌드
npm run build

# 빌드 파일 분석
npm run build && npx serve -s build
```

## 📂 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
├── pages/              # 페이지 컴포넌트
│   ├── Board.js        # 레이드 현황판
│   ├── Efficiency.js   # 효율성 분석
│   ├── Calculation.js  # 계산기
│   └── MainNavbar.js   # 네비게이션
├── store.js            # Redux 스토어 설정
├── instance.js         # API 인스턴스
├── Data.js             # 레이드 데이터
└── utils/              # 유틸리티 함수
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 연락처

- **개발자**: [jo-kwanwoo](https://github.com/jo-kwanwoo)
- **프로젝트 링크**: [https://github.com/jo-kwanwoo/lostboard](https://github.com/jo-kwanwoo/lostboard)
- **데모 사이트**: [https://jo-kwanwoo.github.io/lostboard](https://jo-kwanwoo.github.io/lostboard)

## 🙏 감사의 말

- [Lost Ark Open API](https://developer-lostark.game.onstove.com/) - 게임 데이터 제공
- [Create React App](https://github.com/facebook/create-react-app) - 프로젝트 초기 설정
- [Material-UI](https://mui.com/) - UI 컴포넌트 라이브러리

---

⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!
