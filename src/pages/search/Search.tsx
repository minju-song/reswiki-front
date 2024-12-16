import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { search } from "../../api/restaurant.api";
import { Restaurant } from "../../dto/RestaurantDto";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../../components/Card";

const PHOTO_API_URL = "https://maps.googleapis.com/maps/api/place/photo";
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// 결과 블록
const ResultDiv = styled.div`
  padding: 2rem;
`;

// 알림문 글자
const Notification = styled.div`
  margin: 1rem 0;
  text-align: center;
`;

function Search() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const [query, setQuery] = useState<string>("");
  const itemsPerPage = 8; // 한 페이지에 8개 카드

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryValue = queryParams.get("query");
    if (queryValue) {
      setQuery(queryValue); // 쿼리 값을 상태로 설정
    }
  }, [location.search]);

  const navigate = useNavigate();

  // search api 실행
  const searchRes2 = async (m: string) => {
    setLoading(true);
    try {
      const response = await search(m, page, size);
      if (response.success && response.data) {
        setRestaurants(response.data.restaurants);
      }
      setLoading(false);
    } catch {
      console.error("검색 실패");
    }
  };

  // 상세 페이지 이동
  const restaurantPage = (id: string) => {
    navigate(`/restaurant/${id}`);
  };

  const addRestaurant = () => {
    navigate("/restaurant/add");
  };

  // restaurants 상태가 변경될 때마다 실행
  useEffect(() => {
    console.log(restaurants.length); // restaurants가 변경될 때마다 길이 출력
  }, [restaurants]);

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        console.log("검색 ", query);
        setLoading(true); // API 호출 전 로딩 상태 설정
        try {
          const response = await search(query, page, size); // API 호출
          console.log(response.data);
          if (response.success && response.data) {
            setRestaurants(response.data?.restaurants);
          }
        } catch {
          console.error("검색 실패");
        } finally {
          setLoading(false); // 로딩 상태 해제
        }
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="body">
      <ResultDiv>
        {loading && <Notification>로 딩 중</Notification>}
        {restaurants.length > 0 ? (
          <div className="">
            <div className="w-full h-9 flex justify-between">
              <div className="flex items-center text-lg text-white">
                <span className="emoji">🥰</span>검색 결과
              </div>
            </div>
            <div className="w-full   p-5">
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
        ) : (
          // <div>
          //   {restaurants.map((item, index) => (
          //     <div
          //       key={item.restaurantId}
          //       className="card card-side bg-base-100 shadow-xl"
          //       style={{ maxHeight: "10rem", marginBottom: "1rem" }}
          //       onClick={() => restaurantPage(item.restaurantId)}
          //     >
          //       <figure>
          //         <img
          //           src={
          //             PHOTO_API_URL +
          //             `?photo_reference=${item.restaurantImg}&maxheight=100&key=${API_KEY}`
          //           }
          //           alt={item.restaurantName}
          //           style={{ height: "100%" }}
          //         />
          //       </figure>
          //       <div className="card-body">
          //         <h2 className="card-title">{item.restaurantName}</h2>
          //         <p>{item.restaurantAddr1}</p>
          //         <div className="card-actions justify-end"></div>
          //       </div>
          //     </div>
          //   ))}
          // </div>
          <Notification>
            <span>검색 결과가 없습니다.</span>
            <button onClick={addRestaurant}>추가</button>
          </Notification>
        )}
      </ResultDiv>
    </div>
  );
}

export default Search;
