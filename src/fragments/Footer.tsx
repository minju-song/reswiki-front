import styled from "styled-components";
import '../css/headerAndFooter.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";



const FooterContainer = styled.div`
    position: fixed;
    bottom: 0px;
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding-bottom: env(safe-area-inset-bottom);
    height: 4rem;
    --tw-bg-opacity: 1;
    background-color: var(--fallback-b1, oklch(var(--b1) / var(--tw-bg-opacity)));
    color: currentColor;
    max-width: 480px;
`;

function Footer() {
    const navigate = useNavigate();


    const loginHandler = async() => {
        if(localStorage.getItem('access_token') === null) {
            navigate('/login');
        }
        else {
            navigate('/mypage');
        }
    }

    const homeHandler = async() => {
        navigate('/');
    }

    return (
        // <FooterContainer className="footer bg-gray-300">
        //     <a href="/">
        //         <img src="/assets/img/icon/menu.png" />
        //     </a>
        //     <a href="/">
        //         <img src="/assets/img/icon/home.png" />
        //     </a>
        //     <div className="cursor-pointer" onClick={loginHandler}>
        //         <img src="/assets/img/icon/profile.png" />
        //     </div>
        // </FooterContainer>
        <FooterContainer>
            <button>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            <button onClick={homeHandler}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            </button>
            <button className="active" onClick={loginHandler}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </FooterContainer>
    );
}

export default Footer;