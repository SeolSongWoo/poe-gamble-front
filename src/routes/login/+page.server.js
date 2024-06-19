import {Valid} from "../../util/Valid.js";
import APIService from "../../service/APIService.js";
import {
    InvalidEmailFormatException,
    ObjectNullException,
    PasswordLengthExceededException, UnauthorizedException
} from "../../util/Exception.js";
import {fail, redirect} from "@sveltejs/kit";

/** type {import('./$types').Actions} */
export const actions = {
    default: async ({cookies, request, url}) => {
        const apiService = new APIService(cookies);
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');
        try {
            let account = {email, password};
            Valid.login(account);
            const {body:response} = await apiService.login(account);
            if(response?.status === 401 || response?.status !== 200) {
                return fail(401, {email, unAuthorized: true})
            }
            cookies.set('Authorization', response.data.accessToken, {path: '/', sameSite: 'strict', httpOnly: true});
            cookies.set('RefreshToken', response.data.refreshToken, {path: '/', sameSite: 'strict', httpOnly: true});
        } catch (e) {
            switch (e) {
                case InvalidEmailFormatException:
                    return fail(400, {email, invalidEmail: true})
                case PasswordLengthExceededException:
                    return fail(400, {email, passwordLength: true})
                case ObjectNullException:
                default:
                    return fail(400, {email, badRequest: true})
            }
        }
        redirect(302, '/main');
    }
}