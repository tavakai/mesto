import './pages/index.css';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithSubmit from './components/PopupWithSubmit.js';
import PopupWithImage from './components/PopupWithImage.js';
import UserInfo from './components/UserInfo.js';
import Api from './components/Api.js';
import {
  popupEdit,
  popupAdd,
  btnEditOpenPopup,
  btnAddOpenPopup,
  nameInput,
  jobInput,
  userInputs,
  listCards,
  openedCard,
  popupConfirm,
  formCardAdd,
  formEditProfile,
  formEditAvatar,
  cardTemplate,
  avatarPencil,
  popupAvatar
} from './utils/constants.js';
// Базовая константа с данными для запросов
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: '7c009fa5-838d-4eed-9e1c-8223a7c4bd46',
    'Content-Type': 'application/json'
  }
});

// Получаем данные юзера
// Далее отрисовываем карточки
api.getAllData()
  .then((values) => { //попадаем сюда, когда оба промиса будут выполнены
    const [userData, cards] = values;
    user.setUserInfo(userData);
    cards.reverse();
    cardList.renderItems(cards);
  })
  .catch((err) => { //попадаем сюда если один из промисов завершится ошибкой
    console.log(`Ошибка: ${err}`);
  })

// Экземпляр открытой карточки
const popupCard = new PopupWithImage(openedCard);
popupCard.setEventListeners();

// Экземпляр пользователя
const user = new UserInfo(userInputs);

// Функция добавления новой карточки
const renderNewCard = function (cardData) {
  const card = new Card({
    data: {
      name: cardData.name,
      link: cardData.link,
      owner: cardData.owner,
      likes: cardData.likes,
      cardId: cardData._id
    },
    handleCardClick: (title, src) => {
      // Открытия карточки
      popupCard.openCard(title, src);
    },
    addLikeClick: (arrayLikes, userId, cardId) => {
      // Удаление лайка, если уже стоит лайк
      // Создаем массив лайкнувших
      let arrayLikesPosts = arrayLikes;
      if (arrayLikesPosts.includes(userId)) {
        api.removeLike(cardId).then((res) => {
            const userIndex = arrayLikesPosts.indexOf(userId);
            if (userIndex > -1) {
              arrayLikesPosts.splice(userIndex, 1)
            }
            card.likeAmount(res);
          })
          .catch(err => {
            console.log(`Ошибка: ${err}`);
          })
      } else {
        // Постановка лайка
        api.addLike(cardId).then((res) => {
            arrayLikesPosts.push(userId);
            card.likeAmount(res);
          })
          .catch(err => {
            console.log(`Ошибка: ${err}`);
          })
      }
    },
    handleDeleteIconClick: (cardId, removeCard) => {
      // Окрытие попапа подтверждения удаления карточки
      popupDelete.open();
      popupDelete.createSubmit(() => {
        api.removePost(cardId).then(() => {
            removeCard();
            popupDelete.close();
          })
          .catch(err => {
            console.log(`Ошибка: ${err}`);
          })
      })
    }
  }, cardTemplate, user.getDataUser());
  return card;
}
// Создание экземпляра попапа
const popupDelete = new PopupWithSubmit(popupConfirm);
popupDelete.setEventListeners();

// Функция  генерации стартовых карточек
const cardList = new Section({
  renderer: (item) => {
    const element = renderNewCard(item);
    cardList.addItem(element.createCard());
  }
}, listCards);

// Создание экземпляра попапа редактирования + описываем коллбэк
const popupEditPopup = new PopupWithForm(popupEdit, (inputsValues) => {
  popupEditPopup.addPreloader(true);
  api.doChangeUserInfo(inputsValues).then(res => {
      user.setUserInfo(res);
      popupEditPopup.close();
    })
    .catch((err) => {
      return console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      popupEditPopup.addPreloader(false, 'Сохранить');
    })
});

// Создание экземпляра попапа добавления карточки + описываем коллбэк
const popupAddCard = new PopupWithForm(popupAdd, (inputsValues) => {
  const dataArr = {
    name: inputsValues.card_title,
    link: inputsValues.card_img_url,
    likes: []
  }
  popupAddCard.addPreloader(true);
  api.addPost(dataArr).then((res) => {
      const element = renderNewCard(res);
      cardList.addItem(element.createCard());
      popupAddCard.close();
    })
    .catch((err) => {
      return console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      popupAddCard.addPreloader(false, 'Создать');
    })
});
// Слушатель на открытие попапа профиля
btnEditOpenPopup.addEventListener('click', () => {
  popupEditPopup.open();
  resetPopupEdit.resetValidation();
  const userData = user.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.info;
});

popupEditPopup.setEventListeners();
popupAddCard.setEventListeners();

// Слушатель на открытие попапа новой карточки
btnAddOpenPopup.addEventListener('click', () => {
  popupAddCard.open();
  resetPopupAdd.resetValidation();
});

// Экземпляр для попапа аватарки + описываем коллбэк
const popupAvatarEdit = new PopupWithForm(popupAvatar, (inputsValues) => {
  popupAvatarEdit.addPreloader(true);
  api.doChangeAvatar(inputsValues).then(res => {
      user.setUserInfo(res);
    })
    .catch((err) => {
      return console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      popupAvatarEdit.close();
      popupAvatarEdit.addPreloader(false, 'Сохранить');
    })
});

//Слушатель для попапа изменения аватара
avatarPencil.addEventListener('click', () => {
  popupAvatarEdit.open();
  resetPopupAvatar.resetValidation();
});

popupAvatarEdit.setEventListeners();

const validateObj = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Создание экземпляра формы для валидации
const resetPopupEdit = new FormValidator(validateObj, formEditProfile);
resetPopupEdit.enableValidation();

// Создание экземпляра формы для валидации
const resetPopupAdd = new FormValidator(validateObj, formCardAdd);
resetPopupAdd.enableValidation();

const resetPopupAvatar = new FormValidator(validateObj, formEditAvatar);
resetPopupAvatar.enableValidation();