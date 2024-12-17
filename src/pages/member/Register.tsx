import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkMemberId } from "../../api/member.api";
import { join } from "../../api/member.api";
import axios from "axios";
import { handleOAuthLogin } from "../../utils/\bsocialUtil";

function Register() {
  const navigate = useNavigate();
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  const passwordRegEx =
    /^(?=.*[a-zA-Z])(?=.*[\d@#$%^&!])([a-zA-Z\d@#$%^&!]{8,64})$/;

  const [idFlag, setIdFlag] = useState(false);
  const [passwordFlag, setPasswordFlag] = useState(false);
  const [passwordCkFlag, setPasswordCkFlag] = useState(false);

  const [memberId, setMemberId] = useState("");
  const [memberPassword, setMemberPassword] = useState("");
  const [passwordCk, setPasswordCk] = useState("");

  const emailCheck = async (email: string) => {
    return emailRegEx.test(email);
  };

  const handleLoginClick = async () => {
    navigate("/login");
  };

  // 아이디 중복 확인
  const handleCheckId = async () => {
    if (await emailCheck(memberId)) {
      try {
        const response = await checkMemberId(memberId);
        if (response.code === 200) {
          alert("사용 가능한 아이디입니다.");
          setIdFlag(true);
        } else if (response.code == 461) {
          alert("이미 사용하고 있는 아이디입니다.");
          setMemberId("");
        } else console.error("아이디 중복 조회 데이터 오류");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error);
          alert(error.response?.data.message);
          setMemberId("");
        }
      }
    } else {
      alert("올바른 이메일을 입력해주세요.");
      setMemberId("");
    }
  };

  // 비밀번호 형식 확인
  const handleCheckPassword = async () => {
    if (passwordRegEx.test(memberPassword)) {
      setPasswordFlag(true);
    } else {
      alert(
        "비밀번호는 8자 이상으로, 최소 하나의 영어 알파벳과 하나의 숫자 또는 특수문자를 포함해야 합니다."
      );
      setPasswordFlag(false);
      setMemberPassword("");
    }
  };

  // 비밀번호 체크 확인
  const handleCheckCkPassword = async () => {
    if (passwordCk === memberPassword) {
      setPasswordCkFlag(true);
    } else {
      alert("비밀번호가 다릅니다.");
      setPasswordCk("");
      setPasswordCkFlag(false);
    }
  };

  // 회원 가입 진행
  // 빈칸 경우의 수 처리
  const handleRegisterClick = async () => {
    if (idFlag && passwordFlag && passwordCkFlag) {
      try {
        const response = await join(memberId, memberPassword);
        if (response.code === 201) {
          navigate("/login");
        } else console.log("불가");
      } catch {
        console.error("에러");
      }
    } else {
      alert("모든 정보를 올바르게 입력하셨는 지 확인해주세요.");
    }
  };

  useEffect(() => {
    setIdFlag(false);
  }, [memberId]);

  return (
    <div className="flex items-center justify-center h-full body">
      <div className="flex flex-col w-[26rem] gap-5 text-center py-[40px] px-[32px] bg-[#222222] rounded-2xl">
        <div className="flex justify-between items-center">
          <div className="text-white text-left font-normal text-base">
            회원가입을
            <br />
            진행해주세요<span className="emoji">🥳</span>
          </div>
          <div className="text-right text-[#8D8D8D] text-sm">
            회원이신가요?
            <br />
            <button className="text-[#FCCD2A]" onClick={handleLoginClick}>
              로그인
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
          <div className="flex">
            <input
              type="text"
              id="loginId"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              className="block p-2.5  w-3/4 text-sm text-primary-dark bg-white rounded-lg  appearance-none "
              placeholder="@포함"
            />
            <div className="w-1/4 flex items-center justify-end">
              {!idFlag ? (
                <button
                  className="bg-[#FCCD2A] p-2 flex  text-sm cursor-pointer text-white font-bold rounded-[0.25rem]"
                  onClick={handleCheckId}
                >
                  중복확인
                </button>
              ) : (
                <button
                  className="bg-gray-500 p-2 flex  text-sm cursor-pointer text-white font-bold rounded-[0.25rem]"
                  onClick={handleCheckId}
                >
                  사용가능
                </button>
              )}
            </div>
          </div>
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
            onBlur={handleCheckPassword}
            className="block p-2.5 w-full text-sm text-primary-dark bg-white rounded-lg  appearance-none"
            placeholder="8자 이상, 영어와 숫자/특수문자를 포함"
          />
        </div>
        <div className="flex flex-col">
          <label
            className="w-full text-left text-white text-xs font-thin pb-1"
            htmlFor="password"
          >
            비밀번호를 한번 더 입력해주세요.
          </label>
          <input
            type="password"
            id="passwordCk"
            value={passwordCk}
            onChange={(e) => setPasswordCk(e.target.value)}
            onBlur={handleCheckCkPassword}
            className="block p-2.5 w-full text-sm text-primary-dark bg-white rounded-lg  appearance-none"
            placeholder=" "
          />
        </div>

        <div
          className="bg-[#FCCD2A] my-3 flex items-center justify-center h-[50px] text-sm cursor-pointer text-white font-bold rounded-[0.25rem]"
          onClick={handleRegisterClick}
        >
          회원가입
        </div>
        <div className="relative flex items-center w-full">
          <div className="flex-grow border-t border-[#C3C8CF]"></div>
          <span className="mx-4 text-white">OR</span>
          <div className="flex-grow border-t border-[#C3C8CF]"></div>
        </div>
        <div className="relative flex items-center justify-center w-full gap-4">
          <img
            className="w-9"
            onClick={() => handleOAuthLogin("kakao")}
            src={`${process.env.PUBLIC_URL}/assets/img/icon/social/kakao.svg`}
          />
          <img
            className="w-9"
            onClick={() => handleOAuthLogin("naver")}
            src={`${process.env.PUBLIC_URL}/assets/img/icon/social/naver.svg`}
          />

          <img
            className="w-9"
            onClick={() => handleOAuthLogin("google")}
            src={`${process.env.PUBLIC_URL}/assets/img/icon/social/google.svg`}
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
