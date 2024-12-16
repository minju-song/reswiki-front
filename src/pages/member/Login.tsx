import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getMyInfo } from "../../api/member.api";
import { LOCAL_STORAGE_KEYS } from "../../constants";

function Login() {
  const navigate = useNavigate();

  const [memberId, setMemberId] = useState("");
  const [memberPassword, setMemberPassword] = useState("");

  const handleFindPasswordClick = () => {
    navigate("/login/find-password");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  // 로그인
  const handleLoginClick = async () => {
    if (memberId !== "" && memberPassword !== "") {
      try {
        const response = await login(memberId, memberPassword);
        console.log(response);
        if (response.data.success) {
          console.log("??");
          const accessToken = response.headers["authorization"].split(" ")[1];
          localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, accessToken);
          navigate("/");
          // getMyInfo().then((response) => {
          //   if (response.code == 200) {
          //     localStorage.setItem("logged_id", response.data);
          //     navigate("/");
          //   }
          // });
        }
      } catch {
        console.error("에러");
      }
    } else {
      alert("아이디와 비밀번호 모두 입력해주세요.");
    }
  };

  return (
    <div className="flex items-center justify-center h-full body">
      <div className="flex flex-col w-[26rem] gap-5 text-center py-[40px] px-[32px] bg-[#222222] rounded-2xl">
        <div className="flex justify-between items-center">
          <div className="text-white text-left font-normal text-base">
            로그인을
            <br />
            진행해주세요<span className="emoji">🥳</span>
          </div>
          <div className="text-right text-[#8D8D8D] text-sm">
            회원이
            <br />
            아니신가요?
            <br />
            <button className="text-[#FCCD2A]" onClick={handleRegisterClick}>
              회원가입
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <label
            className="w-full text-left text-white text-xs font-thin pb-1"
            htmlFor="loginId"
          >
            이메일을 입력해주세요.
          </label>
          <input
            type="text"
            id="loginId"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className="block p-2.5  w-full text-sm text-primary-dark bg-white rounded-lg  appearance-none "
            placeholder=" "
          />
        </div>
        <div className="flex flex-col">
          <label
            className="w-full text-left text-white text-xs font-thin pb-1"
            htmlFor="password"
          >
            비밀번호를 입력해주세요.
          </label>
          <input
            type="password"
            id="password"
            value={memberPassword}
            onChange={(e) => setMemberPassword(e.target.value)}
            className="block p-2.5 w-full text-sm text-primary-dark bg-white rounded-lg  appearance-none"
            placeholder=" "
          />
        </div>
        <div
          onClick={handleLoginClick}
          className="bg-[#FCCD2A] my-3 flex items-center justify-center h-[50px] text-sm cursor-pointer text-white font-bold rounded-[0.25rem]"
        >
          계속하기
        </div>
        <div className="relative flex items-center w-full">
          <div className="flex-grow border-t border-[#C3C8CF]"></div>
          <span className="mx-4 text-white">OR</span>
          <div className="flex-grow border-t border-[#C3C8CF]"></div>
        </div>
        <div className="relative flex items-center justify-center w-full gap-4">
          <img
            className="w-9"
            src={`${process.env.PUBLIC_URL}/assets/img/icon/social/kakao.svg`}
          />
          <img
            className="w-9"
            src={`${process.env.PUBLIC_URL}/assets/img/icon/social/naver.svg`}
          />
          <img
            className="w-9"
            src={`${process.env.PUBLIC_URL}/assets/img/icon/social/google.svg`}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
