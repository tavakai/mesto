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
        return res.json()
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
  // Получить карточки
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
        headers: this.headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
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
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
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
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
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
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
  // Постановка лайка
  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
  // Снятие лайка
  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  // Удаление поста
  removePost(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}