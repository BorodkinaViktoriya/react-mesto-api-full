import React, {useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(evt) {
    setName(evt.target.value)
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value)
  }

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser,props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });

    console.log({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      buttonLoadingText="Сохранение..."
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <input
        type="text" id="user-name" value={name || ' '} onChange={handleNameChange}
        className="popup__input popup__input_type_name"
        name="name" placeholder="Ваше имя" required minLength="2" maxLength="40"
      />
      <span id="user-name-error" className="popup__error"></span>
      <input
        type="text" id="user-job" value={description || ' '} onChange={handleDescriptionChange}
        className="popup__input popup__input_type_job"
        name="job" placeholder="Род занятий" required minLength="2" maxLength="200"
      />
      <span id="user-job-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;