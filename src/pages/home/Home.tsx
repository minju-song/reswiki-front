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
    // background-color: white;
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
    // color: black;
`;

const BannerBox = styled.div`
    height: 150px;
    background-image: url(assets/img/home_banner.jpg);
    background-size: cover;
    margin-top: 50px;
`;

const ListTitle = styled.h3`
    margin: 1rem 1rem 0 1rem;
    // font-weight: 400;
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

    // 검색 페이지 이동
    const handleSearchClick = () => {
        navigate('/searchPage')
    }

    // 상세 페이지 이동
    const restaurantPage = (id:string) => {
        navigate(`/restaurant/${id}`);
        
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a>Homepage</a></li>
                            <li><a>Portfolio</a></li>
                            <li><a>About</a></li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <a href="/" className="btn btn-ghost text-xl">맛 집 위 키</a>
                </div>
                <div className="navbar-end">
                    <button onClick={handleSearchClick} className="btn btn-ghost btn-circle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    </button>
                </div>
            </div>

            {/* <BannerBox>
            </BannerBox> */}
        {/* 
            <div id="newList">
                <ListTitle>⚡최근 등록된 맛집 New 5</ListTitle> */}
                {/* <Blocks>
                {loading && 
                    <div> 로 딩 중</div>
                }
                {restaurants.map((item) => (
                    // <div className="carousel-item">
                    //     <img src={PHOTO_API_URL+`?photo_reference=${item.restaurantImg}&maxheight=100&key=${API_KEY}`}/>
                    // </div>
                    <div></div>

                    // <ResBlock key={item.restaurantId} onClick={() =>restaurantPage(item.restaurantId)}>
                    //     <ResImg src={PHOTO_API_URL+`?photo_reference=${item.restaurantImg}&maxheight=100&key=${API_KEY}`}/>
                    //     <ResInfo>
                    //         <ResName>{item.restaurantName}</ResName>
                    //         <ResAddr1>{item.restaurantAddr1}</ResAddr1>
                    //     </ResInfo>
                    // </ResBlock>
                ))}
                </Blocks> */}
            {/* </div> */}
        </div>
    );
}

export default Home;