import styled from "styled-components";
import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { getRestaurants } from "../../api/restaurant.api";
import { get, post, del, patch } from "../../utils/serverHelper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const PHOTO_API_URL = "https://maps.googleapis.com/maps/api/place/photo";
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
// Restaurant 타입 정의
interface Restaurant {
  restaurantId: string;
  restaurantName: string;
  restaurantImg: string;
  restaurantAddr1: string;
  restaurantAddr2: string;
  restaurantStar: number;
}

function Card({ restaurant }: { restaurant: Restaurant }) {
  const [cardHover, setCardHover] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      const fetchImage = async () => {
        try {
          const url = `${SERVER_URL}/images?imageName=${restaurant.restaurantImg}`;
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

function Home() {
  const itemsPerPage = 8; // 한 페이지에 8개 카드
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getRestaurants();
      console.log(response.data.restaurants);
      setRestaurants(response.data.restaurants);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="body">
      <div className="w-full h-9">
        <span>
          <span className="emoji">🔥</span>현재 핫한 맛집이에요!
        </span>
      </div>
      <div className="w-full h-[489px]">
        <Swiper
          spaceBetween={3}
          onSlideChange={(swiper: any) => setPage(swiper.activeIndex)}
        >
          {/* 슬라이드 수 계산 */}
          {Array.from({
            length: Math.ceil(restaurants.length / itemsPerPage),
          }).map((_, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-4 gap-4">
                {restaurants
                  .slice(
                    index * itemsPerPage,
                    index * itemsPerPage + itemsPerPage
                  )
                  .map((item) => (
                    <Card key={item.restaurantId} restaurant={item} />
                  ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Home;
