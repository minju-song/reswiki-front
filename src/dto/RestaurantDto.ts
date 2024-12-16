import { ReviewDto } from "./ReviewDto";

export interface RestaurantDto {
  // 가게 아이디
  restaurantId: string;

  // 가게 이름
  restaurantName: string;

  // 가게 전화번호
  restaurantTel: string;

  // 가게 이미지
  restaurantImg: string;

  // 가게 주소1
  restaurantAddr1: string;

  // 가게 주소2
  restaurantAddr2: string;

  // 별점
  restaurantStar: number;
}

// Restaurant 타입 정의
export interface Restaurant {
  restaurantId: string;
  restaurantName: string;
  restaurantImg: string;
  restaurantAddr1: string;
  restaurantAddr2: string;
  restaurantStar: number;
}

export interface ListRestaurantResponse {
  restaurants: Restaurant[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export interface RestaurantAndReviews {
  restaurants: RestaurantDto;
  reviews: ReviewDto[];
}
