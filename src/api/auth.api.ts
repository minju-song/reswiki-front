// 소셜 로그인 API
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// 구글 로그인
export const googleLogin = async (): Promise<any> => {
  const url = `${SERVER_URL}/oauth2/authorization/google`;

  window.location.href = url;
};

// 카카오 로그인
export const kakaoLogin = async (): Promise<any> => {
  const url = `${SERVER_URL}/oauth2/authorization/kakao`;

  window.location.href = url;
};

// 네이버 로그인
export const naverLogin = async (): Promise<any> => {
  const url = `${SERVER_URL}/oauth2/authorization/naver`;

  window.location.href = url;
};
