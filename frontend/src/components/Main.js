import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Card from "./Card";
import Footer from "./Footer";


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="lead">
        <div className="profile">
          <div className="profile__foto" onClick={props.onEditAvatar}
               style={{backgroundImage: `url(${currentUser.avatar})`}}></div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button"
                    onClick={props.onEditProfile}></button>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button className="lead__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="places">
        {props.cardList.map((card) =>
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        )}
      </section>
      <Footer/>
    </main>
  );
}

export default Main;