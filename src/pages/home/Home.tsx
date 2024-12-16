import styled from "styled-components";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getRestaurants } from "../../api/restaurant.api";
import { search } from "../../api/restaurant.api";
import "swiper/css";
import "swiper/css/pagination";
import { Restaurant } from "../../dto/RestaurantDto";
import Card from "../../components/Card";

function Home() {
  const itemsPerPage = 8; // 한 페이지에 8개 카드
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [searchMonter, setSearchMonter] = useState("");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getRestaurants();
      if (response.success && response.data) {
        setRestaurants(response.data.restaurants);
      }
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    if (searchMonter.trim() === "") {
      fetchData();
    }
  }, [searchMonter]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="body">
      <div className="">
        <div className="">
          <span className="main-text alfa-slab-one-regular">
            Restaurant
            <br />
            Wiki
          </span>
        </div>
        <div className="w-full h-9 flex justify-between">
          <div className="flex items-center text-lg text-white">
            <span className="emoji">🔥</span>현재 핫한 맛집이에요!
          </div>
        </div>
        <div className="w-full p-5">
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
    </div>
  );
}

export default Home;
