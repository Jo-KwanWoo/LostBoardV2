// Axios 라이브러리를 가져옵니다.
import axios from "axios";

// 환경 변수에 저장된 API 토큰을 가져옵니다.
// REACT_APP_API_TOKEN은 .env 파일에 정의되어 있어야 하며, React 애플리케이션에서 사용하기 위해 REACT_APP_ 접두사가 필요합니다.
const accessToken = process.env.REACT_APP_API_TOKEN;

// Axios 인스턴스를 생성합니다.
// 기본적으로 사용될 API의 baseURL과 헤더를 설정합니다.
const instance = axios.create({
  // API의 기본 URL (LostArk API 엔드포인트)
  baseURL: "https://developer-lostark.game.onstove.com",
  // 기본적으로 모든 요청에 포함될 헤더를 설정합니다.
  headers: {
    "content-type": "application/json;charset-UTF-8", // 요청 데이터의 형식을 JSON으로 설정
    accept: "application/json,", // 응답 데이터 형식을 JSON으로 기대
  },
});

// 요청 인터셉터를 설정합니다.
// 요청이 서버로 전송되기 전에 특정 작업을 수행합니다.
instance.interceptors.request.use(
  function (config) {
    // 모든 요청에 Authorization 헤더를 추가합니다.
    // 여기서 `accessToken`은 API 서버에서 인증을 위해 요구하는 값입니다.
    config.headers.authorization = accessToken;
    return config; // 수정된 요청 설정을 반환
  },
  function (error) {
    // 요청을 보내기 전에 발생한 에러를 처리합니다.
    return Promise.reject(error); // 에러를 거부하여 이후의 처리를 중단
  }
);

// 위에서 설정한 Axios 인스턴스를 내보냅니다.
// 다른 파일에서 `instance`를 import하여 API 요청에 사용할 수 있습니다.
export default instance;
