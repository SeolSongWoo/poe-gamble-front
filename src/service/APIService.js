import FetchUtil from "./FetchUtil.js";

const customFetch = new FetchUtil('http://localhost:8080/api/v1');

export default class APIService {

    static getUserCards() {
        return customFetch.fetch({
            method: FetchUtil.HTTP_METHOD.GET,
            headers: FetchUtil.CONTENT_TYPE.JSON,
            url: `/users/cards`
        });
    }
}