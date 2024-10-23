import { ReviewDto } from "./ReviewDto";

export interface RestaurantDto {

    // 가게 아이디
    restaurantId: string;

    // 가게 이름
    restaurantName: string;

    // 가게 등록일
    restaurantEnter: Date;

    // 가게 마지막 수정일
    restaurantUpdate: Date;

    // 가게 전화번호
    restaurantTel: string;

    // 가게 이미지
    restaurantImg: string;

    // 가게 주소1
    restaurantAddr1: string;

    // 가게 주소2
    restaurantAddr2: string;

}

export interface SearchRestaurantResponse {
    content: RestaurantDto[];
    totalPages: number;
    totalElements: number;
}

export interface RestaurantAndReviews {
    restaurants: RestaurantDto;
    reviews: ReviewDto[];
}


