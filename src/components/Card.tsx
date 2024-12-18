// 식당 카드
import { useState, useEffect } from "react";
import { SimpleRestaurantDto } from "../dto/RestaurantDto";
import RestaurantModal from "./RestaurantModal";

const API_URL = process.env.REACT_APP_API_URL;

function Card({ restaurant }: { restaurant: SimpleRestaurantDto }) {
  // 마우스 올려둔 상태인지 체크
  const [cardHover, setCardHover] = useState(false);
  // 식당 이미지 url
  const [imageUrl, setImageUrl] = useState("");
  // 모달 오픈 여부
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 가게 카드 이미지
  useEffect(() => {
    const fetchImage = async () => {
      const fetchImage = async () => {
        try {
          const url = `${API_URL}/images?imageName=${restaurant.restaurantImg}`;
          setImageUrl(url);
        } catch (error) {
          console.error("이미지를 가져오는 중 오류 발생:", error);
        }
      };

      fetchImage();
    };

    fetchImage();
  }, [restaurant.restaurantImg]);

  // 모달
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="relative h-[230px] rounded-3xl perspective"
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
      onClick={openModal}
    >
      {cardHover ? (
        <div className="bg-[#FCCD2A] py-3 px-[14px]  h-full rounded-3xl absolute inset-0 transition-transform duration-700 transform">
          <div className="font-Spoqa text-xl font-bold">
            {restaurant.restaurantName}
          </div>
          <div className="font-Spoqa text-sm font-light">
            {restaurant.restaurantAddr1}
          </div>
          <div className="font-Spoqa text-sm font-light">
            {restaurant.restaurantAddr2}
          </div>
        </div>
      ) : (
        <div
          className="bg-gray-600 h-full rounded-3xl absolute inset-0 transition-transform duration-700 transform"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backfaceVisibility: "hidden",
          }}
        ></div>
      )}
      {isModalOpen && (
        <RestaurantModal
          isOpen={isModalOpen}
          restaurantId={restaurant.restaurantId}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default Card;
