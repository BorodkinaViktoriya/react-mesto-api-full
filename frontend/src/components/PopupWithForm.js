import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={props.isOpen
      ? `popup popup_type_${props.name} popup_opened`
      : `popup popup_type_${props.name}`}>
      <div className="popup__overlay" onClick={props.onClose}></div>
      <div className="popup__container">

        <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
          <fieldset className={`popup__fieldset popup__fieldset_type_${props.name}`}>
            <legend className="popup__title">{props.title}</legend>
            {props.children}
          </fieldset>
          <button className="popup__close-button" type="button" onClick={props.onClose}></button>
          <button className="popup__button"
                  type="submit">{props.isLoading ? props.buttonLoadingText : props.buttonText}</button>
        </form>

      </div>
    </div>
  );
}

export default PopupWithForm;