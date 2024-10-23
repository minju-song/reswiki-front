import { ApiResponse } from './../dto/ApiResponse';
import { get, post, del, patch } from '../utils/serverHelper';

const baseUrl = '/restaurant';

// 메인 식당리스트
export const getNewList = async(): Promise<ApiResponse<any>> => {
    const url = `${baseUrl}/getNewList`;
    const apiResponse: ApiResponse<any> = (await get(url)).data as ApiResponse<any>;
    
    return apiResponse;
}

// 검색
export const search = async(
    keyword: string,
    page: number,
    size: number
): Promise<ApiResponse<any>> => {
    const url = `${baseUrl}/search?keyword=${keyword}&page=${page}&size=${size}`;
    const apiResponse: ApiResponse<any> = (await get(url)).data as ApiResponse<any>;

    return apiResponse;
}

// 상세 페이지
export const getRestaurant = async(id: string): Promise<ApiResponse<any>> => {
    const url = `${baseUrl}/getRestaurant?id=${id}`;
    const ApiResponse: ApiResponse<any> = (await get(url)).data as ApiResponse<any>;

    return ApiResponse;
}
