import {
    nameInput,
    jobInput,
} from '../utils/constants.js';

class UserInfo {
    constructor({ name, job }) {
        this._name = name;
        this._job = job;
    };

    getUserInfo() {
        return this._data = { name: this._name, job: this._job }
    };

    setUserInfo() {
        this.getUserInfo();
        nameInput.value = this._data.name.textContent;
        jobInput.value = this._data.job.textContent;
    };

};

export default UserInfo;