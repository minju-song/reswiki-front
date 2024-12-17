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

  commentEmoji: CommentEmoji;
}

export interface ListCommentDto {
  comments: CommentDto[];
  totalElement: number;
  totalPages: number;
  number: number;
  size: number;
}

enum CommentCategory {
  TASTE,
  SERVICE,
  PARKING,
}

enum CommentEmoji {
  GOOD,
  WELL,
  BAD,
}
