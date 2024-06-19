import FetchUtil from "./FetchUtil.js";

const customFetch = new FetchUtil('http://localhost:8080/api/v1');

export default class APIService {
    cookies;
    constructor(cookies) {
        this.cookies = cookies;
    }

    async getUserCards() {
        const response = await customFetch.fetch({
            method: FetchUtil.HTTP_METHOD.GET,
            headers: {...FetchUtil.CONTENT_TYPE.JSON, Authorization: this.cookies.get('Authorization'), RefreshToken: this.cookies.get('RefreshToken')},
            url: `/users/cards`
        });
        if(response?.body.status === 205) {
            this._tokenRefresh(response.headers);
            return await this.getUserCards();
        }
        return response;
    }

    async postTryGambling(cardData) {
        const response = await customFetch.fetch({
            method: FetchUtil.HTTP_METHOD.POST,
            headers: {...FetchUtil.CONTENT_TYPE.JSON, Authorization: this.cookies.get('Authorization'), RefreshToken: this.cookies.get('RefreshToken')},
            url: `/gamble/try`,
            body: cardData
        });
        if(response?.body.status === 205) {
            this._tokenRefresh(response.headers);
            return await this.postTryGambling(cardData);
        }
        return response;
    }

    async login(userData) {
        return await customFetch.fetch({
            method: FetchUtil.HTTP_METHOD.POST,
            headers: FetchUtil.CONTENT_TYPE.JSON,
            url: `/login`,
            body: userData
        })
    }

    async register(account) {
        return await customFetch.fetch({
            method: FetchUtil.HTTP_METHOD.POST,
            headers: FetchUtil.CONTENT_TYPE.JSON,
            url: `/users/create`,
            body: account
        })
    }

    _tokenRefresh(headers) {
        if(headers['new-access-token'] && headers['new-refresh-token']) {
            this.cookies.set('Authorization', headers['new-access-token'], {path: '/', sameSite: 'strict'});
            this.cookies.set('RefreshToken', headers['new-refresh-token'], {path: '/', sameSite: 'strict'});
        }
    }
}