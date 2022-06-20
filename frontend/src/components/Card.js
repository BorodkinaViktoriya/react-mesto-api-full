import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardDeleteButtonClassName = (
    `place__remove-button ${isOwn ? ' ' : 'place__remove-button_hidden'}`
  );
  const cardLikeButtonClassName = (`place__like-button ${isLiked ? 'place__like-button_active' : ` `}`);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <figure className="place">
      <img
        className="place__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <figcaption className="place__caption">
        <h2 className="place__title">{props.card.name}</h2>
        <div className="place__like-container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="place__like-counter">{props.card.likes.length}</p>
        </div>
      </figcaption>
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
    </figure>
  );
}

export default Card;