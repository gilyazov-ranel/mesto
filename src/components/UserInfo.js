class UserInfo {
    constructor(item) {
        this._name = item.name;
        this._about = item.about;
        this._avatar = item.avatar;
    };

    getUserInfo() {
        return { name: this._name.textContent, about: this._about.textContent }
    };

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
    };

    installAvatar(data) {
        this._avatar.src = data.avatar;
    }

    linkAvatar() {
        return {avatar: this._avatar.src}
    }


};

export default UserInfo;