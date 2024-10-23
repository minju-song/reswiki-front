import { ApiResponse } from './../dto/ApiResponse';
import { get, post, del, patch } from '../utils/serverHelper';

const baseUrl = '/member';

export const checkMemberId = async(
    checkId: string
): Promise<ApiResponse<any>> => {
    const url = `${baseUrl}/checkMemberId?checkId=${checkId}`;
    const apiResponse: ApiResponse<any> = (await get(url)).data as ApiResponse<any>;

    return apiResponse;
}

export const join = async(
    memberId: string,
    memberPassword: string,
    memberNickname: string
): Promise<ApiResponse<any>> => {
    console.log(memberId);
    const url = `${baseUrl}/join`;
    const body = {
        memberId,
        memberPassword,
        memberNickname
    };

    const apiResponse: ApiResponse<any> = (await post(url, body)).data as ApiResponse<any>;

    return apiResponse;
}