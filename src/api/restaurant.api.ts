import { ListRestaurantResponse } from "./../dto/RestaurantDto";
import { ApiResponse } from "./../dto/ApiResponse";
import { get, post, del, patch } from "../utils/serverHelper";

const baseUrl = "/restaurants";

// 메인 식당리스트
export const getRestaurants = async (): Promise<
  ApiResponse<ListRestaurantResponse>
> => {
  const url = `${baseUrl}?size=10&page=0`;
  const apiResponse: ApiResponse<ListRestaurantResponse> = (await get(url))
    .data as ApiResponse<ListRestaurantResponse>;

  return apiResponse;
};

export const search = async (
  keyword: string,
  page: number,
  size: number
): Promise<ApiResponse<ListRestaurantResponse>> => {
  const url = `${baseUrl}/search?keyword=${keyword}&page=${page}&size=${size}`;
  const ApiResponse: ApiResponse<ListRestaurantResponse> = (await get(url))
    .data as ApiResponse<ListRestaurantResponse>;

  return ApiResponse;
};

// 검색 - pre
// export const search = async (
//   keyword: string,
//   page: number,
//   size: number
// ): Promise<ApiResponse<any>> => {
//   const url = `${baseUrl}/search?keyword=${keyword}&page=${page}&size=${size}`;
//   const apiResponse: ApiResponse<any> = (await get(url))
//     .data as ApiResponse<any>;

//   return apiResponse;
// };

// 상세 페이지 - pre
export const getRestaurant = async (id: string): Promise<ApiResponse<any>> => {
  const url = `${baseUrl}/getRestaurant?id=${id}`;
  const ApiResponse: ApiResponse<any> = (await get(url))
    .data as ApiResponse<any>;

  return ApiResponse;
};
