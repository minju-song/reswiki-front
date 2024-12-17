import { useEffect } from "react";
import { LOCAL_STORAGE_KEYS } from "../../constants";
import { getMyInfo } from "../../api/member.api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authLogin } from "../../authSlice";

const RedirectHandler: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGetToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenWithBearer = urlParams.get("token");

      if (tokenWithBearer) {
        dispatch(authLogin());
        const token = tokenWithBearer.replace("Bearer ", "");
        localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
        getMyInfo().then((response) => {
          if (response.code === 200 && response.data?.id) {
            localStorage.setItem(
              LOCAL_STORAGE_KEYS.MEMBER_ID,
              response.data.id
            );
            navigate("/");
          }
        });
      } else {
        console.error("토큰이 존재하지 않습니다.");
      }
    };

    handleGetToken();
  }, []);

  return null;
};

export default RedirectHandler;
