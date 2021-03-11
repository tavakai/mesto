export default class UserInfo {
  constructor(
    userInfoSelector
  ) {
    this._userName = document.querySelector(userInfoSelector.name);
    this._userCurrent = document.querySelector(userInfoSelector.info);
  }

  getUserInfo() {
    const userProfile = {
      name: this._userName.textContent,
      info: this._userCurrent.textContent
    }
    return userProfile;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userCurrent.textContent = data.current;
  }
}