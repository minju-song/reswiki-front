import { useEffect, useState } from "react";
import styled from "styled-components";
import { myPage, logout } from "../../api/member.api";
import { MyPageDto } from "../../dto/MemberDto";
import { useNavigate } from 'react-router-dom';

const HeaderNav = styled.nav`
    display:flex;
    justify-content: center;
    position: fixed;
    width: 480px;
    height: 50px;
    top: 0;
    box-sizing: border-box;
    background-color: white;
    align-items: center;
`;

const ResultDiv = styled.div`
    padding: 5rem;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
`;

const MyInfo = styled.div`
    width: 100%;
    height: 10rem;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    padding: 1rem;
`;

const Nickname = styled.div`
    font-size: 20px;
    font-weight: 700;
    flex: 2;
`;

const MemberEmail = styled.div`
    font-size: 10px;
    color: gray;
    flex: 1;
`;

const BtnDiv = styled.div`
    display: flex;
    justify-content: space-around;
    flex: 3;
    align-items: center;
`;

function Mypage() {
    const navigate = useNavigate();
    const [member, setMember] = useState<MyPageDto>();

    // 회원정보 받아오기
    const getMember = async() => {
        const response = await myPage();
        setMember(response.response);
    }

    // 로그아웃
    const handleLogoutClick = async () => {
        try {
            const response = await logout();
            if (response.status === 200) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('logged_email');
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }

    }


    useEffect(() => {
        getMember();
    }, [])

    return (
        <div>
            <HeaderNav>
                <div>마이페이지</div>
            </HeaderNav>
            <ResultDiv>
                <MyInfo className="border border-success">
                    <Nickname className="underline decoration-green-500 decoration-wavy text-primary-content">{member?.memberNickname}</Nickname>
                    <MemberEmail>{member?.memberId}</MemberEmail>
                    <BtnDiv>
                        <button className="btn btn-success" onClick={handleLogoutClick}>로그아웃</button>
                        <button className="btn btn-outline btn-success">회원탈퇴</button>
                    </BtnDiv>
                </MyInfo>
            </ResultDiv>
        </div>

    )
}

export default Mypage;