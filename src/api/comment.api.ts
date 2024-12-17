import { ApiResponse } from "./../dto/ApiResponse";
import { get, post, del, patch } from "../utils/serverHelper";
import { ListCommentDto } from "../dto/CommentDto";

const baseUrl = "/comments";

// 아이디 중복 검사
export const getComments = async (
  restaurantId: string,
  page: number
): Promise<ApiResponse<ListCommentDto>> => {
  const size = 10;
  const url = `${baseUrl}/${restaurantId}?page=${page}&size=${size}`;
  const apiResponse: ApiResponse<ListCommentDto> = (await get(url))
    .data as ApiResponse<ListCommentDto>;

  return apiResponse;
};
