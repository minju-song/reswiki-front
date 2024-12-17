import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkMemberId } from "../../api/member.api";
import { join } from "../../api/member.api";

const IdBtnTrue = styled.button`
  background-color: green;
`;
const IdBtnFalse = styled.button`
  background-color: red;
`;

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
  const [memberNickname, setMemberNickname] = useState("");

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
      } catch {
        console.error("아이디 중복 조회 실패");
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
      alert("영문, 숫자, 특수문자 중 최소 2종류를 포함해야 합니다.");
      setPasswordFlag(false);
      setMemberPassword("");
    }
  };

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
    if (idFlag && passwordFlag && passwordCkFlag && memberNickname !== "") {
      try {
        const response = await join(memberId, memberPassword, memberNickname);
        if (response.code === 200) {
          navigate("/login");
        } else console.log("불가");
      } catch {
        console.error("에러");
      }
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
            <button className="text-[#FCCD2A]" onClick={handleRegisterClick}>
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
              <button className="bg-[#FCCD2A] p-2 flex  text-sm cursor-pointer text-white font-bold rounded-[0.25rem]">
                중복확인
              </button>
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
            className="block p-2.5 w-full text-sm text-primary-dark bg-white rounded-lg  appearance-none"
            placeholder=" "
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
            src={`${process.env.PUBLIC_URL}/assets/img/icon/social/kakao.svg`}
          />
          <img
            className="w-9"
            src={`${process.env.PUBLIC_URL}/assets/img/icon/social/naver.svg`}
          />
          <a
          // href={`${SERVER_URL}/oauth2/authorization/google`}
          >
            <img
              className="w-9"
              // onClick={() => handleOAuthLogin("google")}
              src={`${process.env.PUBLIC_URL}/assets/img/icon/social/google.svg`}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
