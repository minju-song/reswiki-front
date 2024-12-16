import "../css/header.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchComponent from "../components/SearchComponent";
import { LOCAL_STORAGE_KEYS } from "../constants";

function Header() {
  const navigate = useNavigate();

  const [searchMonter, setSearchMonter] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSearchPress = async (keyword: string) => {
    if (keyword.trim()) {
      try {
        console.log(keyword);
        navigate(`/search?query=${encodeURIComponent(keyword)}`);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="header flex pb-5  bg-black border-b border-b-gray-500 justify-between px-[190px]">
      <img
        className="flex-1"
        src={`${process.env.PUBLIC_URL}/assets/img/icon/home/burger.svg`}
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="flex flex-col justify-around" style={{ flex: "4" }}>
        <SearchComponent
          searchMonter={searchMonter}
          setSearchMonter={setSearchMonter}
          onKeyPress={handleSearchPress}
        />
      </div>
      <div className="flex-1 text-white flex items-center p-5">
        {isLoggedIn ? (
          <span className="text-white">회원</span> // 로그인 상태일 때 표시
        ) : (
          <button
            className="button bg-[#FCCD2A] p-2 rounded-lg font-medium"
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
