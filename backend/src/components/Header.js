import React from 'react';
import headerLogo from '../images/logo.svg';
import "../index.css";
import { Link, Routes, Route } from "react-router-dom";

function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="логотип сайта" />
                <div className="header__nav">
                    <Routes>
                        <Route exact path="/" element={
                            <>
                                <p className="header__email">{props.email}</p>
                                <Link to="/sign-in" className="header__link" onClick={props.handleSignOut}>Выйти</Link>                                                           
                            </>
                        }/>
                        <Route path="sign-in" element={
                            <Link to="/sign-up" className="header__link">Регистрация</Link>
                        }/>
                        <Route path="sign-up" element={
                            <Link to="/sign-in" className="header__link">Войти</Link>
                        }/>
                    </Routes>                          
                </div>
        </header>
    )
}

export default Header;