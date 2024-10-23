import styled from "styled-components";
import '../../css/headerAndFooter.css';
import { useNavigate } from 'react-router-dom';
import {getNewList} from "../../api/restaurant.api";
import { useEffect, useState } from "react";
import { RestaurantDto } from "../../dto/RestaurantDto";

const PHOTO_API_URL = 'https://maps.googleapis.com/maps/api/place/photo';
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;



const HeaderNav = styled.nav`
    display:flex;
    justify-content: space-between;
    position: fixed;
    height: 50px;
    top: 0;
    box-sizing: border-box;
    background-color: white;
`;

const Logo = styled.img`
    width: 2rem;
`;

const LogoDiv =styled.div`
    display: flex;
    align-items: center;
`;

const Href = styled.a`
    text-decoration-line: none;
    color: black;
`;

const BannerBox = styled.div`
    height: 150px;
    background-image: url(assets/img/home_banner.jpg);
    background-size: cover;
    margin-top: 50px;
`;

const ListTitle = styled.h3`
    margin: 1rem 1rem 0 1rem;
    font-weight: 400;
`;

const Blocks = styled.div`
    display: flex;
    overflow-x: scroll;
    height: 17rem;
    scrollbar-width: none;
`;

const ResBlock = styled.div`
    margin: 1rem;
    height: 12rem;
    width: 10rem;
    display: flex;
    flex-direction: column;

`;

const ResImg = styled.img`
    flex: 1;
    box-shadow: 3px 3px 3px #cfcbcba6;
`;

const ResInfo = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
`;

const ResName = styled.h4`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`;

const ResAddr1 = styled.div`
    font-size: 0.9rem;
`;


function Home() {
    const [ restaurants, setRestaurants ] = useState<RestaurantDto[]>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const navigate = useNavigate();


    const fetchData = async()=> {
        try{
            setLoading(true);
            const response = (await getNewList()).response.restaurants;
            console.log(response);
            // loadImg(newData);
            setRestaurants(response);   
            setLoading(false);
        } catch(error) {
            console.error('데이터 가져오기 실패:', error);
        }
    };

    // 상세 페이지 이동
    const restaurantPage = (id:string) => {
        navigate(`/restaurant/${id}`);
        
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <HeaderNav className="header">
                <LogoDiv>
                    <Href href="/">
                    <Logo src="/assets/img/logo.jpg" />
                    </Href>
                </LogoDiv>
                <LogoDiv>
                    <Href style={{fontSize:"13px"}} href="/searchPage">
                       <img src="/assets/img/icon/search.png" />
                    </Href>
                </LogoDiv>
            </HeaderNav>

            <BannerBox>
            </BannerBox>
        
            <div id="newList">
                <ListTitle>⚡최근 등록된 맛집 New 5</ListTitle>
                <Blocks>
                {loading && 
                    <div> 로 딩 중</div>
                }
                {restaurants.map((item) => (
                    <ResBlock key={item.restaurantId} onClick={() =>restaurantPage(item.restaurantId)}>
                        <ResImg src={PHOTO_API_URL+`?photo_reference=${item.restaurantImg}&maxheight=100&key=${API_KEY}`}/>
                        <ResInfo>
                            <ResName>{item.restaurantName}</ResName>
                            <ResAddr1>{item.restaurantAddr1}</ResAddr1>
                        </ResInfo>
                    </ResBlock>
                ))}
                </Blocks>
            </div>
        </div>
    );
}

export default Home;