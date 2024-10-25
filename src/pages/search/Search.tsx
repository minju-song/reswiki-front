import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { search } from "../../api/restaurant.api";
import { RestaurantDto } from "../../dto/RestaurantDto";
import { SearchRestaurantResponse } from "../../dto/RestaurantDto";
import SearchComponent from "../../fragments/SearchComponent";

const PHOTO_API_URL = 'https://maps.googleapis.com/maps/api/place/photo';
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Container = styled.div`
    //height: 100%;
`;

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
    const [searchMonter, setSearchMonter] = useState("");
    const [restaurants, setRestaurants] = useState<RestaurantDto[]>([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    // search api 실행
    const searchRes2 = async(m: string) => {
        setLoading(true);
        try {
            const response = (await search(m, page, size)).response.restaurants;
            setRestaurants(response);
            setLoading(false);
        } catch {
            console.error("검색 실패")
        }
    }

    // 상세 페이지 이동
    const restaurantPage = (id:string) => {
        navigate(`/restaurant/${id}`);
        
    }

    const addRestaurant = () => {
        navigate('/restaurant/add');
    }

    // restaurants 상태가 변경될 때마다 실행
    useEffect(() => {
        console.log(restaurants.length); // restaurants가 변경될 때마다 길이 출력
    }, [restaurants]);
    
    return (
        <Container>
            <SearchComponent 
            searchMonter={searchMonter}
            setSearchMonter={setSearchMonter}
            onSearch={searchRes2}
            inputtext="찾고자 하는 가게를 검색해주세요."/>
            <ResultDiv>
                {loading && <Notification>로 딩 중</Notification>}
                {searchMonter.trim() === "" ? 
                    (
                        <Notification>🔎 찾고 싶은 식당 검색 🔎</Notification>
                    ) :
                (restaurants.length > 0 ?  (
                    <div>
                        {restaurants.map((item, index) => (
                            <div key={item.restaurantId} className="card card-side bg-base-100 shadow-xl" 
                            style={{maxHeight:"10rem", marginBottom:"1rem"}} onClick={() =>restaurantPage(item.restaurantId)}>
                                <figure>
                                    <img
                                    src={PHOTO_API_URL+`?photo_reference=${item.restaurantImg}&maxheight=100&key=${API_KEY}`}
                                    alt={item.restaurantName}
                                    style={{height:"100%"}} />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{item.restaurantName}</h2>
                                    <p>{item.restaurantAddr1}</p>
                                    <div className="card-actions justify-end">
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) :
                 (
                    <Notification>
                        <span>검색 결과가 없습니다.</span>
                        <button onClick={addRestaurant}>추가</button>
                    </Notification>
                ))
            }
            </ResultDiv>
        </Container>
    );
}

export default Search;