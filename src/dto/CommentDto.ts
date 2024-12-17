export interface CommentDto {
  // 리뷰아이디
  commentId: number;

  // 작성자 아이디
  memberId: string;

  // 가게 아이디
  restaurantId: string;

  // 리뷰 항목
  commentCategory: CommentCategory;

  // 리뷰 내용
  commentContents: string;

  // 리뷰 등록 날짜
  commentDate: Date;

  // 리뷰 이모지
  commentEmoji: CommentEmoji;
}

// 리뷰 아이디
export interface CommentIdDto {
  commentId: number;
}

// 리뷰 리스트
export interface ListCommentDto {
  comments: CommentDto[];
  totalElement: number;
  totalPages: number;
  number: number;
  size: number;
}

// 리뷰 카테고리
enum CommentCategory {
  TASTE,
  SERVICE,
  PARKING,
}

// 리뷰 이모지
enum CommentEmoji {
  GOOD,
  WELL,
  BAD,
}
