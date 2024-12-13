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
    console.log("입력 이메일", memberId);
    if (await emailCheck(memberId)) {
      try {
        const response = await checkMemberId(memberId);
        console.log(response);
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
    console.log(passwordRegEx.test(memberPassword), memberPassword);
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
          console.log("회원가입 완료");
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
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col w-[20rem] gap-5 text-center">
        <div className="text-3xl font-bold text-[#2E3339]">계정 만들기</div>
        <div className="relative">
          <input
            type="text"
            id="memberId"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className="px-2.5 pb-2.5 pt-4 w-3/4 text-sm text-primary-dark bg-transparent rounded-lg border border-primary-default appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="memberId"
            className="absolute text-sm text-primary-dark duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            이메일
          </label>
          {idFlag && <IdBtnTrue className="w-1/4">검사 완료</IdBtnTrue>}
          {!idFlag && (
            <IdBtnFalse className="w-1/4" onClick={handleCheckId}>
              중복 검사
            </IdBtnFalse>
          )}
        </div>
        <div className="relative">
          <input
            type="password"
            id="memberPassword"
            value={memberPassword}
            onChange={(e) => setMemberPassword(e.target.value)}
            onBlur={handleCheckPassword}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-dark bg-transparent rounded-lg border border-primary-default appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="memberPassword"
            className="absolute text-sm text-primary-dark duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            비밀번호
          </label>
        </div>
        <div className="relative">
          <input
            type="password"
            id="passwordCk"
            value={passwordCk}
            onChange={(e) => setPasswordCk(e.target.value)}
            onBlur={handleCheckCkPassword}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-dark bg-transparent rounded-lg border border-primary-default appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="passwordCk"
            className="absolute text-sm text-primary-dark duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            비밀번호 확인
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            id="memberNickname"
            value={memberNickname}
            onChange={(e) => setMemberNickname(e.target.value)}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-dark bg-transparent rounded-lg border border-primary-default appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="memberNickname"
            className="absolute text-sm text-primary-dark duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            닉네임
          </label>
        </div>
        <div
          className="flex items-center justify-center h-[50px] text-sm cursor-pointer text-green-700 font-bold bg-primary-default rounded-[0.25rem]"
          onClick={handleRegisterClick}
        >
          계속하기
        </div>
        <div className="relative flex items-center w-full">
          <div className="flex-grow border-t border-[#C3C8CF]"></div>
          <span className="mx-4 text-[#2E3339]">또는</span>
          <div className="flex-grow border-t border-[#C3C8CF]"></div>
        </div>
        <div className="flex flex-col gap-4 font-bold text-sm text-primary-default">
          <div>
            <span className="font-medium text-[#2E3339]">
              이미 계정이 있으신가요?
            </span>
            <span className="cursor-pointer" onClick={handleLoginClick}>
              로그인
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
