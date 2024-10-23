import styled from "styled-components";
import '../css/headerAndFooter.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";



const FooterContainer = styled.div`
    position: fixed;
    bottom: 0;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 1rem 1rem 0 0;
    border: 1px solid rgb(233 233 236);
    background-color: #00712D;
`;

function Footer() {
    const navigate = useNavigate();


    const loginHandler = async() => {
        navigate('/login');
    }

    return (
        <FooterContainer className="footer">
            <a href="/">
                <img src="/assets/img/icon/menu.png" />
            </a>
            <a href="/">
                <img src="/assets/img/icon/home.png" />
            </a>
            <div className="cursor-pointer" onClick={loginHandler}>
                <img src="/assets/img/icon/profile.png" />
            </div>
        </FooterContainer>
    );
}

export default Footer;