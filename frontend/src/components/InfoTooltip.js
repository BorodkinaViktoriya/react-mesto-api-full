import React from 'react';
import SucsessRegistration from '../images/SucsessRegistration.svg';
import FailRegistration from '../images/FailRegistration.svg';

function InfoTooltip(props) {
  return (
    <div
      className={props.isOpen ? `popup popup_type_info popup_opened` : `popup popup_type_info`}>

      <div className="popup__overlay" onClick={props.onClose}></div>
      <div className="popup__container popup__container_type_registration">
        <img className="popup__status-image" src={props.message ? SucsessRegistration : FailRegistration}/>
        <p
          className="popup__text">{props.message ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip;