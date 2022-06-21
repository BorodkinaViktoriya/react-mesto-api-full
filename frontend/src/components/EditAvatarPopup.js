import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputAvatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputAvatarRef.current.value,
    });
    inputAvatarRef.current.value = ""
  }

  return (
    <PopupWithForm
      name="avatar-form"
      title="Обновить аватар"
      buttonText="Сохранить"
      buttonLoadingText="Сохранение..."
      isLoading={props.isLoading}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url" id="avatar-link" ref={inputAvatarRef}
        className="popup__input popup__input_type_place-link"
        name="avatarLink" placeholder="Ссылка на аватар" required
      />
      <span id="avatar-link-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;