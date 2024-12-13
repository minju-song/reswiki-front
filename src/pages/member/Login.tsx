import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getMyInfo } from "../../api/member.api";

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
        if (response.code == 200) {
          const accessToken = response.headers["authorization"].split(" ")[1];
          localStorage.setItem("access_token", accessToken);
          getMyInfo().then((response) => {
            if (response.code == 200) {
              localStorage.setItem("logged_id", response.response);
              navigate("/");
            }
          });
        }
      } catch {
        console.error("에러");
      }
    } else {
      alert("아이디와 비밀번호 모두 입력해주세요.");
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col w-[20rem] gap-5 text-center">
        <div className="text-3xl font-bold text-[#2E3339]">
          오신 걸 환영합니다
        </div>
        <div className="relative">
          <input
            type="text"
            id="loginId"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-dark bg-transparent rounded-lg border border-primary-default appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="loginId"
            className="absolute text-sm text-primary-dark duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            아이디
          </label>
        </div>
        <div className="relative">
          <input
            type="password"
            id="password"
            value={memberPassword}
            onChange={(e) => setMemberPassword(e.target.value)}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-dark bg-transparent rounded-lg border border-primary-default appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-primary-dark duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            비밀번호
          </label>
        </div>
        <div
          onClick={handleLoginClick}
          style={{ backgroundColor: "#EC6D62" }}
          className="flex items-center justify-center h-[50px] text-sm cursor-pointer text-white font-bold rounded-[0.25rem]"
        >
          계속하기
        </div>
        <div className="relative flex items-center w-full">
          <a
            href="http://localhost:9892/oauth2/authorization/google"
            className="flex-1"
          >
            구글
          </a>
          <a className="flex-1">카카오</a>
          <a className="flex-1">네이버</a>
        </div>
        <div className="relative flex items-center w-full">
          <div className="flex-grow border-t border-[#C3C8CF]"></div>
          <span className="mx-4 text-[#2E3339]">또는</span>
          <div className="flex-grow border-t border-[#C3C8CF]"></div>
        </div>
        <div className="flex flex-col gap-4 font-bold text-sm text-primary-default">
          <div className="cursor-pointer">비밀번호를 잊으셨나요?</div>
          <div>
            <span className="font-medium text-[#2E3339]">
              계정이 없으신가요?
            </span>{" "}
            <span className="cursor-pointer" onClick={handleRegisterClick}>
              회원 가입
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
