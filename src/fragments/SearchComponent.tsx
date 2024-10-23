import styled from "styled-components";
import { useEffect, useState } from "react";


// 헤더 네비게이션
const SearchNav = styled.nav`
    display: flex;
    align-items: center;
`;

// 뒤로 가기 버튼
const BackBtn = styled.button`
    background: none;
    border: none;
`;

// 뒤로 가기 이미지
const BackIcon = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 8px;
`;

// 검색 블록
const SearchDiv = styled.div`
    display: flex; 
    align-items: center;
    // height: 100%;
    background: rgb(245, 246, 248);
    padding: 0px 12px;
    border-radius: 100px;
    flex-grow: 1;
`;

// 검색어 입력창
const SearchInput = styled.input`
    width: 100%;
    border: 0;
    background: none;
    color: rgb(36, 39, 41);
    caret-color: pink;
`;

const displayBox = styled.div`
    display: contents;
`;

// 프롭스 타입 정의
interface SearchComponentProps {
    searchMonter: string; // 검색어
    setSearchMonter: (value: string) => void;
    onSearch: (keyword: string) => void; // 검색 함수 타입
    inputtext: string;
}
    

const SearchComponent: React.FC<SearchComponentProps> = ({ searchMonter,setSearchMonter,onSearch, inputtext }) => {

    const handleBack = () => {
        window.history.back();
    };

    useEffect(() => {
        // searchMonter가 변경될 때마다 searchRes2 실행
        if (searchMonter.trim() !== "") {  // 공백이 아닐 때만 실행
            onSearch(searchMonter);
            console.log(searchMonter," 검색어")
        }
    }, [searchMonter]);

    return (
        <SearchNav>
            <BackBtn onClick={handleBack}>
                <BackIcon src="/assets/img/icon/back.png"/>
            </BackBtn>
            <SearchDiv>
                <img src="/assets/img/icon/search.png" />
                <SearchInput placeholder={inputtext}
                value={searchMonter}
                onChange={(e) => setSearchMonter(e.target.value)} />
            </SearchDiv>
        </SearchNav>
    );
}

export default SearchComponent;