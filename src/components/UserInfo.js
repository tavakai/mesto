export default class UserInfo {
  constructor(
    userInfoSelector
  ) {
    this._name = document.querySelector(userInfoSelector.name);
    this._info = document.querySelector(userInfoSelector.info);
    this._avatar = document.querySelector(userInfoSelector.avatar);
  }

  getUserInfo() {
    const userProfile = {
      name: this._name.textContent,
      info: this._info.textContent,
      avatar: this._avatar.src
    }
    return userProfile;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.about;
    this._avatar.src = data.avatar;
    this._user = data;
  }

  getDataUser() {
    return this._user;
  }
}