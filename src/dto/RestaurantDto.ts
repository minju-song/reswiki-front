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

// 리스트에 들어갈 식당
export interface SimpleRestaurantDto {
  restaurantId: string;
  restaurantName: string;
  restaurantImg: string;
  restaurantAddr1: string;
  restaurantAddr2: string;
  restaurantStar: number;
}

// 식당 리스트
export interface ListRestaurantDto {
  restaurants: SimpleRestaurantDto[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

// 구글 검색 후 받을 식당 데이터
export interface GoogleSearchDto {
  formatted_address: string;
  formatted_phone_number: string;
  name: string;
  opening_hours: any;
  photos: any;
  place_id: string;
  type: any;
}
