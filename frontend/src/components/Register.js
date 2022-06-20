import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function Register(props) {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handlePasswordChange(evt) {
    setPassword(evt.target.value)
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(password, email);
  }

  return (
    <>
      <form className="form" id='registerForm' onSubmit={handleSubmit}>
        <fieldset className="form__fieldset">
          <legend className="form__title">Регистрация</legend>
          <input
            type="email" id="register-email" value={email || ''} onChange={handleEmailChange}
            className="form__input form__input_type_email"
            name="registerEmail" placeholder="Email" required minLength="2" maxLength="40"
          />
          <span id="register-email-error" className="form__error"></span>
          <input
            type="password" id="register-password" value={password || ''} onChange={handlePasswordChange}
            className="form__input form_input_type_password"
            name="registerPassword" placeholder="Пароль" required minLength="2" maxLength="200"
          />
          <span id="login-password-error" className="form__error"></span>
        </fieldset>
        <button className="form__button" type="submit">Зарегистрироваться</button>
      </form>
      <div className="capture">
        <p className="capture__text">Уже зарегистрированы?</p>
        <Link to="sign-in" className="capture__link">Войти</Link>
      </div>
    </>
  )
}

export default Register;