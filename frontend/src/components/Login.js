import React, {useState} from 'react';

function Login({onLogin}) {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handlePasswordChange(evt) {
    setPassword(evt.target.value)
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(password, email)
  }

  return (
    <form className="form" id='loginForm' onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <legend className="form__title">Вход</legend>
        <input
          type="email" id="login-email" value={email || ''} onChange={handleEmailChange}
          className="form__input form__input_type_email"
          name="loginEmail" placeholder="Email" required minLength="2" maxLength="40"
        />
        <span id="login-email-error" className="form__error"></span>
        <input
          type="password" id="login-password" value={password || ''} onChange={handlePasswordChange}
          className="form__input form_input_type_password"
          name="loginPassword" placeholder="Пароль" required minLength="2" maxLength="200"
        />
        <span id="login-password-error" className="form__error"></span>
      </fieldset>
      <button className="form__button" type="submit">Войти</button>
    </form>
  )
}

export default Login;

