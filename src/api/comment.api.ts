// 리뷰 관련 API
import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "./../dto/ApiResponse";
import { get, post, del, patch } from "../utils/serverHelper";
import { ListCommentDto, CommentIdDto } from "../dto/CommentDto";
import { LOCAL_STORAGE_KEYS } from "../constants";

const baseUrl = "/comments";

// 해당 식당의 리뷰들 조회
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

// 리뷰 삭제
export const deleteComment = async (
  commentId: number
): Promise<ApiResponse<CommentIdDto>> => {
  const url = `${baseUrl}?commentId=${commentId}`;
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const apiResponse: ApiResponse<CommentIdDto> = (await del(url, config))
    .data as ApiResponse<CommentIdDto>;

  return apiResponse;
};
