import { RestaurantDto } from "./RestaurantDto";

export interface ReviewDto {

    // 리뷰아이디
    reviewId: number;

    // 작성자 아이디
    writerId: string;

    // 가게 아이디
    restaurantId: RestaurantDto;

    // 리뷰 항목
    reviewItem: ReviewItem;

    // 리뷰 내용
    reviewContents: string;

    // 최신 리뷰인지 Y/N
    isNewest: 'Y' | 'N'; // 'Y' 또는 'N' 중 하나로 가정

    // 리뷰 등록 날짜
    reviewDate: Date;
}

export enum ReviewItem {
    TASTE = '맛',
    SERVICE = '서비스',
    PARKING = '주차'
}