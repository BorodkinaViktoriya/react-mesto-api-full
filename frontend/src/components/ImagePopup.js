import React from 'react';

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_image${props.card.link && props.card.name ? ` popup_opened` : ''}` }>

      <div className="popup__overlay" onClick={props.onClose}></div>
      <div className="popup__container popup__container_type_image">
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <h2 className="popup__caption">{props.card.name}</h2>
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;