import React, {useState, useEffect} from 'react';
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Header from './Header.js';
import ProtectedRoute from './ProtectedRoute';
import Main from './Main'
import {CurrentUserContext} from "../contexts/CurrentUserContext";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api";
import {register, authorize, getToken} from '../utils/auth.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: null, link: null});
  const [currentUser, setCurrentUser] = useState({name: null, about: null});
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = React.useState(false);
  const [authorisationEmail, setAuthorisationEmail] = React.useState("ghj@dfbfdb");
  const history = useHistory();

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()]).then(([data, cardList]) => {
        setCurrentUser(data)
        setCards(cardList.reverse())
      })
        .catch((err) => console.log('Ошибка при звгрузке данных c сервера'))
    }
  }, [loggedIn])

  // Функции обработки кликов на кнопки редактирования профиля, карточек, аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(data) {
    setSelectedCard({name: data.name, link: data.link})
  }

  // Функция обновления профиля пользователя
  function handleUpdateUser(user) {
    setIsLoading(true);
    api.setUserInfo(user.name, user.about)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log('Ошибка при звгрузке данных c сервера'))
      .finally(() => {
        setIsLoading(false);
      })
  }

  // Функция обновления аватара пользователя
  function handleUpdateAvatar({avatar}) {
    setIsLoading(true);
    api.editUserAvatar(avatar)
      .then((res) => {
          setCurrentUser(res)
          closeAllPopups()
        }
      )
      .catch((err) => console.log('Ошибка при звгрузке данных c сервера'))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log('Ошибка при лайке'))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((b) => b._id !== card._id));
      }).catch((err) => console.log('Ошибка при удалении карточки'))
  }

  // Функция добавления карточки места
  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.addCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      }).catch((err) => console.log('Ошибка при добавлении карточки места'))
      .finally(() => {
        setIsLoading(false);
      })
  }

  // функция закрытия всех попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({name: null, link: null})
    setIsInfoTooltipOpen(false)
  }

  function handleRegister(password, email) {
    register(password, email)
      .then((res) => {
        if (res) {
          setMessage(true);
          history.push('/sign-in');
        }
      })
      .catch(() => setMessage(false))
      .finally(() => setIsInfoTooltipOpen(true))
  }

  function handleLogin(password, email) {
    authorize(password, email)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          setAuthorisationEmail(email);
          history.push('/')
        }
      })
      .catch(() => {
        setMessage(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getToken(jwt)
        .then((res) => {
          if (res) {
            setAuthorisationEmail(res.email)
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          authorisationEmail={authorisationEmail}
          onSignOut={handleSignOut}/>
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cardList={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-in">
            <Login onLogin={handleLogin} name='login'/>
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegister}/>
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
          </Route>

        </Switch>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdatePlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          message={message}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
