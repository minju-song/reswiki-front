import { get, post, del, patch } from "../utils/serverHelper";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const googleLogin = async (): Promise<any> => {
  const url = `${SERVER_URL}/oauth2/authorization/google`;

  window.location.href = url;
};

export const kakaoLogin = async (): Promise<any> => {
  const url = `${SERVER_URL}/oauth2/authorization/kakao`;

  window.location.href = url;
};

export const naverLogin = async (): Promise<any> => {
  const url = `${SERVER_URL}/oauth2/authorization/naver`;

  window.location.href = url;
};
