import { useEffect, useState } from "react";
import { getRestaurant } from "../api/restaurant.api";
import { getComments } from "../api/comment.api";
import { RestaurantDto } from "../dto/RestaurantDto";
import { CommentDto } from "../dto/CommentDto";
import { LOCAL_STORAGE_KEYS } from "../constants";

const API_URL = process.env.REACT_APP_API_URL;

interface RestaurantModalProps {
  isOpen: boolean;
  restaurantId: string;
  onClose: () => void;
}

const RestaurantModal: React.FC<RestaurantModalProps> = ({
  isOpen,
  restaurantId,
  onClose,
}) => {
  const [restaurant, setRestaurant] = useState<RestaurantDto>();
  const [comments, setComments] = useState<CommentDto[]>();
  const [page, setPage] = useState(1);
  const memberId = localStorage.getItem(LOCAL_STORAGE_KEYS.MEMBER_ID);

  // 가게 정보 받아오기
  const fetchRestaurant = async () => {
    try {
      const response = await getRestaurant(restaurantId);
      if (response.code === 200 && response.data) {
        setRestaurant(response.data);
      }
    } catch (error) {}
  };

  // 해당 식당 코멘트 받아오기
  const fetchComments = async () => {
    try {
      const response = await getComments(restaurantId, page);
      if (response.code === 200 && response.data) {
        setComments(response.data.comments);
      }
    } catch (error) {}
  };

  const handleDeleteComment = async () => {};

  useEffect(() => {
    fetchRestaurant();
    fetchComments();
  }, []);

  if (!isOpen) return null;
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black z-50 bg-opacity-50  h-screen `}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div
        className="flex flex-col w-1/2 bg-[#222222] rounded-[1.5rem]  max-w-md mx-auto shadow-lg modal-open"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-52 flex border-b border-b-gray-500 p-6">
          <div className="w-2/5">
            <img
              className="w-full h-full"
              src={`${API_URL}/images?imageName=${restaurant?.restaurantImg}`}
            />
          </div>
          <div className="w-3/5 flex flex-col text-white px-3 justify-around">
            <div className="font-bold text-lg">
              {restaurant?.restaurantName}
            </div>
            <div className="font-light text-sm">
              {restaurant?.restaurantAddr1}
            </div>
            <div className="font-light text-sm">
              {restaurant?.restaurantAddr2}
            </div>
            <div className="font-light text-sm">
              {restaurant?.restaurantTel}
            </div>
            <div className="flex items-center">
              {Array.from({
                length: Math.round(restaurant?.restaurantStar || 0),
              }).map((_, index) => (
                <img
                  key={index}
                  src={`${process.env.PUBLIC_URL}/assets/img/icon/yellow_heart.svg`}
                />
              ))}

              {/* 나머지 개수 (5 - 반올림된 숫자) */}
              {Array.from({
                length: 5 - Math.round(restaurant?.restaurantStar || 0),
              }).map((_, index) => (
                <img
                  key={index}
                  src={`${process.env.PUBLIC_URL}/assets/img/icon/white_heart.svg`}
                />
              ))}
              <span>({restaurant?.restaurantStar})</span>
            </div>
          </div>
        </div>
        <div className="h-96 text-white text-sm font-light flex flex-col-reverse p-6 overflow-scroll gap-3">
          {comments?.map((comment, index) => (
            <div key={index} className="flex py-2 px-1 gap-2 items-center">
              <div>
                <div>
                  {comment.commentEmoji.toString() === "GOOD" && (
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/img/icon/emoji/good_emoji.svg`}
                    />
                  )}
                  {comment.commentEmoji.toString() === "WELL" && (
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/img/icon/emoji/well_emoji.svg`}
                    />
                  )}
                  {comment.commentEmoji.toString() === "BAD" && (
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/img/icon/emoji/bad_emoji.svg`}
                    />
                  )}
                </div>
              </div>
              <div
                className={`flex flex-col rounded-lg 
              ${comment.memberId === memberId ? "bg-white" : "bg-[#FCCD2A]"}
              
               text-black p-2 gap-1 max-w-52`}
              >
                <div className="text-sm font-normal">
                  {comment.commentContents}
                </div>
                <div className="text-xs text-gray-500">
                  {(() => {
                    const date = new Date(comment.commentDate);
                    if (isNaN(date.getTime())) {
                      return "유효하지 않은 날짜";
                    }
                    return `${date.toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })} ${date.toLocaleTimeString("ko-KR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}`;
                  })()}
                </div>
              </div>
              <div className="flex items-center">
                <span className="emoji text-lg  ">
                  {comment.commentCategory.toString() === "PARKING" && "🚕"}
                  {comment.commentCategory.toString() === "TASTE" && "🍔"}
                  {comment.commentCategory.toString() === "SERVICE" && "👩‍🍳"}
                </span>
              </div>
              {comment.memberId === memberId && (
                <button onClick={handleDeleteComment}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="red"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantModal;
