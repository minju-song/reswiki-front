import styled from "styled-components";
import { useEffect, useState } from "react";
import { search} from "../../api/googleMap.api";
import SearchComponent from "../../fragments/SearchComponent";

const PHOTO_API_URL = 'https://maps.googleapis.com/maps/api/place/photo';
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Container = styled.div`
    //height: 100%;
`;

const ResultDiv = styled.div`
    padding: 2rem;
`;

// 알림문 글자
const Notification = styled.div`
    margin: 1rem 0;
    text-align: center;
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

const ResIcon = styled.img`
    height: 15px;
`

const ResName = styled.h4`
    margin-top: 0;
    margin-bottom: 0.5rem;
`;

const ResInfoText = styled.p`
    margin: 0 0 1rem 0;
    font-size: 13px;
`;


function AddRestaurant () {
    const [searchMonter, setSearchMonter] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any | null>(null);

    // 검색 레스토랑
    const [restaurant, setRestaurant] = useState<any>();
    // 검색 레스토랑의 이미지
    const [imageUrl, setImageUrl] = useState("");
    // 검색 레스토랑의 영업 유무
    const [businessStatus, setBusinessStatus] = useState(false);
    // 결정 유무
    const [addFlag, setAddFlag] = useState(false);
    // 버튼 텍스트
    const [addResTxt, setAddResTxt] = useState('맛집위키 추가');

    const [reviewItem, setReviewItem] = useState('TASTE');
    const [reviewContents, setReviewContents] = useState('');

    const [restaurantDto, setRestaurantDto] = useState({
        restaurantId: '',
        restaurantName: '',
        restaurantImg: '',
        restaurantAddr1: ''
    })

    const handleSearch = async () => {
        if (!searchMonter.trim()) return;
        
        setLoading(true);
        setError(null);
        console.log(searchMonter)

        try {
            // 검색어 입력하면 값 받아옴
            const response = await search(searchMonter);
            if(response.types.includes('food') || response.types.includes('restaurant') || response.types.includes('cafe')) {
                setRestaurant(response);
                console.log(response);
                setImageUrl(response.photos[0].photo_reference);
                if(response.business_status == 'OPERATIONAL') {
                    setBusinessStatus(true);
                }else setBusinessStatus(false);
            }
            else {
                setRestaurant(null);
                setImageUrl('');
                setBusinessStatus(false);
            }
        } catch (err) {
            setError(err);
            console.log(err);
        } finally {
            setLoading(false);
        }
    }; 

    const addRes = () => {
        if(addFlag) {
            setAddFlag(false);
            setAddResTxt('맛집위키 추가');
            setReviewItem('TASTE')
            setReviewContents('');
        }
        else {
            setAddFlag(true);
            setAddResTxt('취소');
        }
    }

    const addReview = () => {
        console.log(reviewItem,' ',reviewContents);
        console.log(restaurantDto);

        setRestaurantDto({...restaurantDto,
            restaurantId: restaurant.place_id});
        setRestaurantDto({...restaurantDto,
            restaurantName: restaurant.name});
        setRestaurantDto({...restaurantDto,
            restaurantImg: imageUrl});
        setRestaurantDto({...restaurantDto,
            restaurantAddr1: restaurant.formatted_address});

        console.log(restaurantDto);

    }

    
    return (
        <Container>
            {addFlag ? (
                <nav>
                    <h3>{restaurant.name}</h3>
                </nav>
            ) : (
                <SearchComponent onSearch={handleSearch} 
                searchMonter={searchMonter}
                setSearchMonter={setSearchMonter}
                inputtext="추가하고자 하는 가게를 검색해주세요."/>
            )}


            <ResultDiv>
                {loading && <p>로딩 중...</p>}
                {searchMonter.trim() === "" ? 
                    (
                        <Notification>🔎 키워드 검색 🔎</Notification>
                    ) : 
                    (restaurant ? 
                        (
                            <Restaurant>
                                {imageUrl ? 
                                    (<ResImg src={PHOTO_API_URL+`?photo_reference=${imageUrl}&maxheight=100&key=${API_KEY}`} />
                                    ) : (
                                        <ResImg src="/assets/img/logo.jpg" />
                                    )
                                
                                }
                                <ResInfo>
                                    <ResName><ResIcon src={restaurant.icon} /> {restaurant.name}</ResName>
                                    <ResInfoText>{restaurant.formatted_address}</ResInfoText>
                                    {businessStatus &&<ResInfoText>영업 중</ResInfoText> }
                                    <input type="button" onClick={addRes} value={addResTxt} />
                                </ResInfo>
                            </Restaurant> 

                    ) : (
                        <Notification>
                            <span>검색 결과가 없습니다.</span>
                        </Notification>
                        )
                    )
                    
                }

                {addFlag && (
                 <div>
                    <select name="reviewItem" onChange={(e) => setReviewItem(e.target.value)}>
                        <option value='TASTE'>맛</option>
                        <option value='SERVICE'>서비스</option>
                        <option value='PARKING'>주차</option>
                    </select>
                    <textarea onChange={(e) => setReviewContents(e.target.value)}></textarea>
                    <button onClick={addReview}>등록</button>
                 </div>
                )}
            </ResultDiv>
        </Container>

    )
};

export default AddRestaurant;