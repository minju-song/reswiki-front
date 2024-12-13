import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RestaurantDto } from "../../dto/RestaurantDto";
import { ReviewDto } from "../../dto/ReviewDto";
import { getRestaurant } from "../../api/restaurant.api";

const PHOTO_API_URL = "https://maps.googleapis.com/maps/api/place/photo";
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const HeaderNav = styled.nav`
  display: flex;
  justify-content: center;
  position: fixed;
  width: 480px;
  height: 50px;
  top: 0;
  box-sizing: border-box;
  background-color: white;
  align-items: center;
`;

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled.h4`
  margin: 0;
`;

const Href = styled.a`
  text-decoration-line: none;
  color: black;
`;

const ResultDiv = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const Restaurant = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  margin-bottom: 1rem;
`;

const ResImg = styled.img`
  flex: 1;
  width: 50%;
`;

const ResInfo = styled.div`
  flex: 1;
  padding: 1rem 0 1rem 1rem;
  box-sizing: border-box;
`;

const ResName = styled.h4`
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const ResInfoText = styled.p`
  margin: 0 0 1rem 0;
  font-size: 13px;
`;

// 알림문 글자
const Notification = styled.div`
  margin: 1rem 0;
  text-align: center;
`;

// 리뷰 창
const Reviews = styled.div`
  border: 1px solid gray;
  border-radius: 1rem;
  padding: 1rem;
  box-sizing: border-box;
`;

const Review = styled.div``;

function RestaurantPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [restaurant, setRestaurant] = useState<RestaurantDto | null>(null);
  const [reviews, setReviews] = useState<ReviewDto[]>([]);

  const fetchRestaurantById = async (id: string) => {
    try {
      const result = (await getRestaurant(id)).response;
      setRestaurant(result);
      setReviews(result.reviews);
      setLoading(false);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    if (id) {
      // id가 유효할 때만 호출
      console.log("호출");
      fetchRestaurantById(id);
    }
  }, []);

  return (
    <div>
      <HeaderNav>
        <Href href="/">
          <Logo>맛집위키</Logo>
        </Href>
      </HeaderNav>
      <ResultDiv>
        {loading && <Notification>로 딩 중</Notification>}
        {!loading && restaurant != null && (
          <div>
            <Restaurant>
              <ResImg
                src={
                  PHOTO_API_URL +
                  `?photo_reference=${restaurant.restaurantImg}&maxheight=100&key=${API_KEY}`
                }
              />
              <ResInfo>
                <ResName>{restaurant.restaurantName}</ResName>
                <ResInfoText>
                  {restaurant.restaurantAddr1 +
                    " " +
                    restaurant.restaurantAddr2}
                </ResInfoText>
                <ResInfoText>{restaurant.restaurantTel}</ResInfoText>
              </ResInfo>
            </Restaurant>
            <h3>리뷰 모음</h3>
            <Reviews>
              {reviews.length > 0 &&
                reviews.map((review) => (
                  <Review key={review.reviewId}>
                    {review.reviewContents} / {review.reviewItem}
                  </Review>
                ))}
              {reviews.length == 0 && (
                <div>
                  <Notification>등록된 리뷰가 없습니다.</Notification>
                  <button>등록</button>
                </div>
              )}
            </Reviews>
          </div>
        )}
      </ResultDiv>
    </div>
  );
}

export default RestaurantPage;
