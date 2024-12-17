import { useState, useEffect } from "react";
import { SimpleRestaurantDto } from "../dto/RestaurantDto";

const API_URL = process.env.REACT_APP_API_URL;

function Card({ restaurant }: { restaurant: SimpleRestaurantDto }) {
  const [cardHover, setCardHover] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

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

    fetchImage(); // 이미지 요청
  }, [restaurant.restaurantImg]);

  return (
    <div
      className="relative h-[230px] rounded-3xl perspective"
      onMouseEnter={() => setCardHover(true)} // 마우스가 카드에 들어올 때
      onMouseLeave={() => setCardHover(false)} // 마우스가 카드에서 나갈 때
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
            backfaceVisibility: "hidden", // 앞면이 보이지 않도록 설정
          }}
        ></div>
      )}
    </div>
  );
}

export default Card;
