// 구글 API
import { ApiResponse } from "../dto/ApiResponse";
import { get } from "../utils/serverHelper";
import { LOCAL_STORAGE_KEYS } from "../constants";
import { AxiosRequestConfig } from "axios";
import { GoogleSearchDto } from "../dto/RestaurantDto";

const baseUrl = "/googlePlaces";

// 서버 거쳐서 google api 장소 검색
export const googleSearch = async (
  keyword: string
): Promise<ApiResponse<GoogleSearchDto>> => {
  const url = `${baseUrl}/search?keyword=${keyword}`;

  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const apiResponse: ApiResponse<GoogleSearchDto> = (await get(url, config))
    .data as ApiResponse<GoogleSearchDto>;

  return apiResponse;
};
