import React, {useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";

function AddPlacePopup(props) {
  const inputNameRef = React.useRef();
  const inputLinkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdatePlace({
      name: inputNameRef.current.value,
      link: inputLinkRef.current.value,
    });
  }

  useEffect(() => {
    inputNameRef.current.value = '';
    inputLinkRef.current.value = '';
  }, [props.isOpen])

  return (
    <PopupWithForm
      name="places"
      title="Новое место"
      buttonText="Создать"
      buttonLoadingText="Сохранение..."
      isLoading={props.isLoading}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text" id="place-name" ref={inputNameRef}
        className="popup__input popup__input_type_place-name"
        name="placeName" placeholder="Название" required minLength="2" maxLength="30"
      />
      <span id="place-name-error" className="popup__error"></span>
      <input
        type="url" id="place-link" ref={inputLinkRef}
        className="popup__input popup__input_type_place-link"
        name="placeLink" placeholder="Ссылка на картинку" required
      />
      <span id="place-link-error" className="popup__error"></span>
    </PopupWithForm>
  )
};

export default AddPlacePopup;