// 식당 관련 API
import { ListRestaurantDto, RestaurantDto } from "./../dto/RestaurantDto";
import { ApiResponse } from "./../dto/ApiResponse";
import { get, post, del, patch } from "../utils/serverHelper";

const baseUrl = "/restaurants";

// 메인 식당리스트
export const getRestaurants = async (): Promise<
  ApiResponse<ListRestaurantDto>
> => {
  const url = `${baseUrl}?size=8&page=0`;
  const apiResponse: ApiResponse<ListRestaurantDto> = (await get(url))
    .data as ApiResponse<ListRestaurantDto>;

  return apiResponse;
};

// 검색
export const search = async (
  keyword: string,
  page: number,
  size: number
): Promise<ApiResponse<ListRestaurantDto>> => {
  const url = `${baseUrl}/search?keyword=${keyword}&page=${page}&size=${size}`;
  const ApiResponse: ApiResponse<ListRestaurantDto> = (await get(url))
    .data as ApiResponse<ListRestaurantDto>;

  return ApiResponse;
};

// 상세 정보
export const getRestaurant = async (
  id: string
): Promise<ApiResponse<RestaurantDto>> => {
  const url = `${baseUrl}/${id}`;
  const ApiResponse: ApiResponse<RestaurantDto> = (await get(url))
    .data as ApiResponse<RestaurantDto>;

  return ApiResponse;
};

// 식당 추가
export const joinRestaurant = async (
  restaurant: RestaurantDto
): Promise<ApiResponse<any>> => {
  const url = `${baseUrl}`;
  const body = restaurant;

  const apiResponse: ApiResponse<any> = (await post(url, body))
    .data as ApiResponse<any>;
  return apiResponse;
};
