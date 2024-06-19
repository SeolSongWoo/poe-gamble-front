import fetch from 'node-fetch'

/**
 * @typedef {Object} FetchOption
 * @property {CONTENT_TYPE} headers
 * @property {HTTP_METHOD} method
 * @property {URL | string} [url]
 * @property {Object|null} [body]
 */

export default class FetchUtil {


    /**
     * 도메인 지정
     * @param {URL | string} domain
     */
    constructor(domain) {
        this.domain = domain;
    }

    /**
     * fetch
     * @param {FetchOption} fetchOption
     * @returns {Promise<Object>}
     */
    async fetch(fetchOption) {
        fetchOption.url = fetchOption.url ? `${fetchOption.url}` : '';
        let jsonResponse;
        try {
            const response = await fetch(`${this.domain}${fetchOption.url}`, {
                method: fetchOption.method,
                headers: fetchOption.headers,
                body: fetchOption.body ? JSON.stringify(fetchOption.body) : null
            });
            if(fetchOption.headers === FetchUtil.CONTENT_TYPE.ZIP) {
                jsonResponse = await response.blob();
            }else {
                const headers = {};
                response.headers.forEach((value, name) => {
                    headers[name] = value;
                });
                jsonResponse = {body:await response.json(), headers:headers};
            }
        } catch (error) {
            jsonResponse = error;
        }
        return jsonResponse;
    }


    /**
     * HTTP 헤더
     * @type {{JSON: {"Content-Type": string}, FORM: {"Content-Type": string}, ZIP: {"Content-Type": string}, CSV: {"Content-Type": string}}}
     */
    static CONTENT_TYPE = {
        JSON: {"Content-Type":"application/json"},
        FORM: {"Content-Type":"application/x-www-form-urlencoded"},
        ZIP: {"Content-Type":"application/zip"},
        CSV: {"Content-Type":"text/csv"}
    };


    /**
     * HTTP 메소드
     * @type {{DELETE: string, POST: string, GET: string, PUT: string}}
     */
    static HTTP_METHOD = {
        GET: "GET",
        POST: "POST",
        PUT: "PUT",
        DELETE: "DELETE"
    }

}