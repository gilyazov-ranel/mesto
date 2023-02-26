class UserInfo {
    constructor({ name, job }) {
        this._name = name;
        this._job = job;
    };

    getUserInfo() {
        return { name: this._name.textContent, job: this._job.textContent }
    };

    setUserInfo(data) {
        this._name.textContent = data.formName;
        this._job.textContent = data.formJob;
    };

};

export default UserInfo;