class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me `, {
      headers: this._headers
    })
      .then(this._handleResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._handleResponse)
  }

  setUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me `, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._handleResponse)
  }

  editUserAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(this._handleResponse)
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._handleResponse)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._handleResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
      .then(this._handleResponse)
  }

}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-35',
  headers: {
    authorization: '1a9c130a-42c2-4c9b-811e-578089f7924f',
    'Content-Type': 'application/json'
  }
});
export default api;