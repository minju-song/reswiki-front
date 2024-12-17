import { googleLogin, kakaoLogin, naverLogin } from "../api/auth.api";

export const handleOAuthLogin = async (social: string) => {
  if (social == "google") {
    try {
      const response = await googleLogin();
    } catch (err) {
      console.log(err);
    }
  } else if (social == "kakao") {
    try {
      const response = await kakaoLogin();
    } catch (err) {
      console.log(err);
    }
  } else if (social == "naver") {
    try {
      const response = await naverLogin();
    } catch (err) {
      console.log(err);
    }
  }
};
