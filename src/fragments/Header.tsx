import "../css/header.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchComponent from "../components/SearchComponent";
import { LOCAL_STORAGE_KEYS } from "../constants";
import { logout } from "../api/member.api";
import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { authLogout } from "../authSlice";

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const [searchMonter, setSearchMonter] = useState("");

  // 검색
  const handleSearchPress = async (keyword: string) => {
    if (keyword.trim()) {
      try {
        navigate(`/search?query=${encodeURIComponent(keyword)}`);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  // 로그아웃
  const handleLogout = async () => {
    try {
      const response = await logout();
      localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
      dispatch(authLogout());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

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
          <button
            className="button bg-[#FCCD2A] p-2 rounded-lg font-medium"
            onClick={handleLogout}
          >
            로그아웃
          </button>
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
