import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getRestaurants } from "../../api/restaurant.api";
import "swiper/css";
import "swiper/css/pagination";
import { SimpleRestaurantDto } from "../../dto/RestaurantDto";
import Card from "../../components/Card";
import { useMemo } from "react";

function Home() {
  const mainTitle = useMemo(() => {
    return `R E S T A U R A N T \nW I K I`;
  }, []);
  const [landingTitle, setLandingTitle] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    console.log(titleIndex);

    const interval = setInterval(() => {
      // 만약, titleIndex가 mainTitle의 길이와 같거나 커지면 반복을 멈춘다.
      if (titleIndex >= mainTitle.length) {
        clearInterval(interval); // 타이머 클리어
        return;
      }

      setLandingTitle((prev) => {
        console.log(prev);
        // 빈 문자열("")은 false이므로 mainTitle의 가장 앞 글자가 prev에 할당된다.
        // 그 뒤로는 landingTitle이 빈 문자열이 아니므로
        // 이전에 존재하던 것과 titleIndex에 존재하는 문자열을 합쳐서
        // 다시 result에 할당한다.
        let result = prev ? prev + mainTitle[titleIndex] : mainTitle[0];

        // titleIndex를 증가시킨다.
        setTitleIndex((prev) => prev + 1);

        // 연산된 result를 반환한다.
        return result;
      });
    }, 200);

    // 컴포넌트 언마운트 시 타이머 클리어
    return () => clearInterval(interval);
  }, [mainTitle, titleIndex]);

  const [loading, setLoading] = useState(false);
  const [searchMonter, setSearchMonter] = useState("");
  const [restaurants, setRestaurants] = useState<SimpleRestaurantDto[]>([]);

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
