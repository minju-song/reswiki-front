import { ApiResponse } from "../dto/ApiResponse";
import { get } from "../utils/serverHelper";
import { LOCAL_STORAGE_KEYS } from "../constants";
import { AxiosRequestConfig } from "axios";
import { GoogleSearchDto } from "../dto/RestaurantDto";

const baseUrl = "/googlePlaces";

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

  console.log(apiResponse);
  return apiResponse;
};
