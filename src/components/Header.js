import React from "react";
import './Header.css'

const Header = ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://uploaddeimagens.com.br/images/003/378/882/original/pngwing.com.png?1628793312" alt="logo"></img>
                </a>
            </div>
            <div className="header--user">
            <a href="/">
                    <img src="https://i.pinimg.com/564x/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.jpg" alt="user"></img>
                </a>
            </div>
        </header>
    )
}

export default Header