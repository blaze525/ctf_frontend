//registrasiya
import React from "react";
import Image2 from "../images/icon.svg";
import "../fontawesome/css/font-awesome.css";
import {Link, useNavigate} from "react-router-dom";
import { useEffect } from "react";

export default function Header({login, setLogin}) {
  const navigate = useNavigate()
  const [toggleMenu, setToggleMenu] = React.useState(false);
  useEffect(() => {
    if (toggleMenu) {
      document.body.style.paddingLeft = "235px";
    } else {
      document.body.style.paddingLeft = "0";
    }
    return () => {
      document.body.style.paddingLeft = '';
    }
  }, [toggleMenu])


  function toggleFunction() {
    if (toggleMenu) {
      setToggleMenu(false);
    } 
    else {
      setToggleMenu(true);
    }
  }

  function logout() {
    window.localStorage.removeItem("isLogedIn")
    window.localStorage.removeItem("my_ctf_token")
    window.localStorage.removeItem("realAdmin")
    setLogin(window.localStorage.getItem("isLogedIn"))
    navigate("/")
  }

  return (
    <div className="header">
        {!toggleMenu ? 
        <button className="dots-sidebar" onClick={toggleFunction}>
          <div className="div-dots">
          </div>
        </button> : 
        <div className="open-dots-sidebar">
          <div className="main-column-sidebar">
            <div className="row-sidebar">
              <img src={Image2} className="logo-img" />
              <button className="hamburger-menu" onClick={toggleFunction}>
                <i className="fa fa-bars bars-icon fa-lg" aria-hidden="true" />
              </button>
            </div>
            <Link to="/" className={login ? "sidebar-item" : "offscreen"}>
              <i className="fa fa-home fa-lg icons" aria-hidden="true"></i>
              <p className="sidebar-link">Baş sahypa</p>
            </Link>
            <hr className={login ? "ssss" : "offscreen"}/>
            <Link to="/statistika" className={login ? "sidebar-item" : "offscreen"}>
              <i className="fa fa-bar-chart icons"></i>
              <p className="sidebar-link">Statistika</p>
            </Link>
            <hr className={login ? "ssss" : "offscreen"}/>
            <Link to="/maglumatlar" className={login ? "sidebar-item" : "offscreen"}>
              <i className="fa fa-book icons"></i>
              <p className="sidebar-link">Maglumatlar</p>
            </Link>
            <hr className={login ? "ssss" : "offscreen"}/>
          </div>
      </div>}
      { !login ? <div>
      <Link to="/giris" className="giris-button">Giriş</Link>
      <Link to="/agza-bol" className="agza-bol-button">Agza bol</Link> </div> :
        <div>
          <button className="agza-bol-button" onClick={()=>logout()}>
            Çykyş
          </button>
        </div>
      }
    </div>
  )
}