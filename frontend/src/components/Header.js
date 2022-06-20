import React from 'react';
import logo from '../images/logo.svg';
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';

function Header(props) {

  return (
    <header className="header">
      <img
        src={logo}
        className="header__logo" alt="Логотип"
      />
      <Route path="/sign-in">
        <Link to="sign-up" className="header__link">Регистрация</Link>
      </Route>
      <Route path="/sign-up">
        <Link to="sign-in" className="header__link">Войти</Link>
      </Route>
      <Route exact path="/">
        <div className="header__info">
          <p className="header__email">{props.authorisationEmail}</p>
          <button onClick={props.onSignOut} className="header__link header__button">Выйти</button>
        </div>
      </Route>
    </header>
  )
}

export default Header;