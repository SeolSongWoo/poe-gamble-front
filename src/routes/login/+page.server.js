import {Valid} from "../../util/Valid.js";
import APIService from "../../service/APIService.js";
import {
    InvalidEmailFormatException,
    ObjectNullException,
    PasswordLengthExceededException
} from "../../util/Exception.js";
import {fail, redirect} from "@sveltejs/kit";

/**
 * 1 : 비밀번호 길이 오류
 * 2 : 이메일 형식 오류
 * 3 : BAD REQUEST 오류
 */

/** type {import('./$types').Actions} */
export const actions = {
    login: async ({cookies, request, url}) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');
        try {
            let account = {email, password};
            Valid.account(account);
            const response = await APIService.login(account);
            cookies.set('Authorization', response.data, {path: '/', sameSite: 'strict', httpOnly: true, maxAge: 60 * 60 * 24});
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
        redirect(302, '/');
    }
}