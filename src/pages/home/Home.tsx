import { useEffect, useState } from "react";
import { getRestaurants } from "../../api/restaurant.api";
import "swiper/css";
import "swiper/css/pagination";
import { SimpleRestaurantDto } from "../../dto/RestaurantDto";
import Card from "../../components/Card";
import { useMemo } from "react";

function Home() {
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<SimpleRestaurantDto[]>([]);

  // 식당 데이터 받아오기
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
    fetchData();
  }, []);

  return (
    <div className="body">
      <div className="">
        <div className="p-6">
          <span className="main-text alfa-slab-one-regular animate-typingCursor">
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
          {/* <Swiper
            style={{ overflow: "visible" }}
            spaceBetween={3}
            onSlideChange={(swiper: any) => setPage(swiper.activeIndex)}
          >

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
          </Swiper> */}
          <div className="grid grid-cols-4 gap-4">
            {restaurants.slice(0, 8).map((item) => (
              <Card key={item.restaurantId} restaurant={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
