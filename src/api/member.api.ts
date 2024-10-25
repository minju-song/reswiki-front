import { ApiResponse } from './../dto/ApiResponse';
import { get, post, del, patch } from '../utils/serverHelper';
import axios, { AxiosRequestConfig } from "axios";

const baseUrl = '/member';

// 아이디 중복 검사
export const checkMemberId = async(
    checkId: string
): Promise<ApiResponse<any>> => {
    const url = `${baseUrl}/checkMemberId?checkId=${checkId}`;
    const apiResponse: ApiResponse<any> = (await get(url)).data as ApiResponse<any>;

    return apiResponse;
}

// 회원 가입
export const join = async(
    memberId: string,
    memberPassword: string,
    memberNickname: string
): Promise<ApiResponse<any>> => {
    const url = `${baseUrl}/join`;
    const body = {
        memberId,
        memberPassword,
        memberNickname
    };

    const apiResponse: ApiResponse<any> = (await post(url, body)).data as ApiResponse<any>;

    return apiResponse;
}

// 로그인
export const login = async(
    memberId: string,
    memberPassword: string
): Promise<any> => {
    const url = `${baseUrl}/login`;
    const body = {
        memberId,
        memberPassword
    };

    const apiResponse = (await post(url, body));
    
    return apiResponse;
}

// 로그아웃
export const logout = async(): Promise<any> => {
    let url = `${baseUrl}/logout`;

    const apiResponse = (await post(url));

    return apiResponse;
}

// 아이디 받아오기
export const getMyInfo = async (): Promise<ApiResponse<any>> => {
    let url = `${baseUrl}/myInfo`;
  
    const accessToken = localStorage.getItem("access_token");
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const apiResponse: ApiResponse<any> = (await get(url, config)).data as ApiResponse<any>;
  
    return apiResponse;
  };

  // 마이페이지
  export const myPage = async ():Promise<ApiResponse<any>> => {
      const memberId = localStorage.getItem("logged_id");
      let url = `${baseUrl}/myPage?memberId=${memberId}`;

      const apiResponse: ApiResponse<any> = (await get(url)).data as ApiResponse<any>;

      return apiResponse;
  }
