import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { search, joinRestaurant } from "../../api/restaurant.api";
import { SimpleRestaurantDto } from "../../dto/RestaurantDto";
import Card from "../../components/Card";
import Swal, { SweetAlertResult } from "sweetalert2";
import { googleSearch } from "../../api/googlePlace.api";
import { LOCAL_STORAGE_KEYS } from "../../constants";
import { GoogleSearchDto } from "../../dto/RestaurantDto";

function Search() {
  const [restaurants, setRestaurants] = useState<SimpleRestaurantDto[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const [query, setQuery] = useState<string>("");
  const Swal = require("sweetalert2");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryValue = queryParams.get("query");
    if (queryValue) {
      setQuery(queryValue);
    }
  }, [location.search]);

  const navigate = useNavigate();

  // 구글 api 실행
  const handleGoogle = async (keyword: string) => {
    setLoading(true);

    try {
      const response = await googleSearch(keyword);

      // api 검색 결과 있을 때
      if (response.success) {
        const r = response.data;
        Swal.fire({
          title: `<div class="emoji">🍽️</div>${r?.name}`,
          text: "맞으신가요?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "맞아요!",
          cancelButtonText: "아니요..",
        }).then((result: SweetAlertResult) => {
          // 검색한 결과가 옳을때
          if (result.isConfirmed) {
            if (r) {
              addRestaurant(r);
            }
          } else {
            searchRestaurant();
          }
        });
      } else {
        Swal.fire({
          title: `찾을 수 없는 가게입니다<span class='emoji'>😢</span>`,
          text: "다시 검색해주세요",
          icon: "error",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "네!",
          cancelButtonText: "싫어요..",
        }).then((result: SweetAlertResult) => {
          if (result.isConfirmed) {
            searchRestaurant();
          }
        });
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  // 구글에서 받은 식당 데이터베이스에 추가
  const addRestaurant = async (r: GoogleSearchDto) => {
    const addressParts = r.formatted_address.split(" ");
    const addr1 = addressParts[0] + " " + addressParts[1];
    const addr2 = addressParts[2] + " " + addressParts[3];
    const body = {
      restaurantId: r.place_id,
      restaurantName: r.name,
      restaurantTel: r.formatted_phone_number,
      restaurantImg: r.photos[0].photo_reference,
      restaurantAddr1: addr1,
      restaurantAddr2: addr2,
      restaurantStar: 0,
    };
    try {
      const response = await joinRestaurant(body);
      if (response.code === 201) {
        navigate(`/search?query=${encodeURIComponent(r.name)}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 식당 입력값 받기
  const searchRestaurant = async () => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
    const memberId = localStorage.getItem(LOCAL_STORAGE_KEYS.MEMBER_ID);
    if (token && memberId) {
      const { value: restaurantName } = await Swal.fire({
        title: "추가할 식당 이름을 입력해주세요.",
        input: "text",
        inputLabel: "(현재는 식당 포함 모든 가게 검색)",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "완료",
        cancelButtonText: "취소",
        inputValidator: (value: string) => {
          if (!value) {
            return "식당 이름을 입력해주세요.";
          } else {
            handleGoogle(value);
          }
        },
      });
    } else {
      alert("로그인 후 이용할 수 있습니다.");
      navigate("/login");
    }
  };

  useEffect(() => {}, [restaurants]);

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        setLoading(true); // API 호출 전 로딩 상태 설정
        try {
          const response = await search(query, page, size); // API 호출
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
      <div className="p-8">
        {loading && <div className="mx-4 text-center">로 딩 중</div>}
        {restaurants.length > 0 ? (
          <div className="">
            <div className="w-full h-9 flex justify-between">
              <div className="flex items-center text-lg text-white">
                <span className="emoji">🥰</span>검색 결과
              </div>
            </div>
            <div className="w-full   p-5">
              <div className="grid grid-cols-4 gap-4">
                {restaurants.slice(0, 8).map((item) => (
                  <Card key={item.restaurantId} restaurant={item} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-4 text-center">
            <div className="text-white text-lg font-bold p-6">
              검색 결과가 없습니다<span className="emoji">💦</span>
            </div>
            <button
              className="rounded-lg bg-[#FCCD2A] p-2"
              onClick={searchRestaurant}
            >
              가게 추가
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
