export default class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  // Получить все данные
  getAllData() {
    return Promise.all([this.getUserProfile(), this.getInitialCards()])
  }
  // Получить данные пользователя
  getUserProfile() {
    return fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers
      })
      .then((res) => {
        return this._getResponseData(res)
      })
  }
  // Получить карточки
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
        headers: this.headers
      })
      .then(res => {
        return this._getResponseData(res)
      });
  }
  // Изменить профиль пользователя
  doChangeUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          about: data.current
        })
      })
      .then(res => {
        return this._getResponseData(res)
      })
  }
  // Заменить аватар
  doChangeAvatar(pic) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: pic.user_img_url
        })
      })
      .then(res => {
        return this._getResponseData(res)
      })
  }
  // Добавить новый пост
  addPost(data) {
    return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(res => {
        return this._getResponseData(res)
      })
  }
  // Постановка лайка
  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this.headers
      })
      .then(res => {
        return this._getResponseData(res)
      })
  }
  // Снятие лайка
  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then(res => {
        return this._getResponseData(res)
      })
  }
  // Удаление поста
  removePost(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then(res => {
        return this._getResponseData(res)
      })
  }
  // Метод проверки ответа и преобразование в json
  _getResponseData(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }
}