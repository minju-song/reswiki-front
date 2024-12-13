import "../css/header.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div
      className="header flex"
      onClick={() => {
        navigate("/");
      }}
    >
      <img src={`${process.env.PUBLIC_URL}/assets/img/icon/home/burger.svg`} />
    </div>
  );
}

export default Header;
