import {InvalidEmailFormatException, ObjectNullException, PasswordLengthExceededException} from "./Exception.js";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export class Valid {
    static login(account) {
        if (!account) {
            throw new ObjectNullException('account is null');
        }
        if (!account.email || !account.password) {
            throw new ObjectNullException('email or password is null');
        }

        if (account.password.length < 8) {
            throw new PasswordLengthExceededException('password length is less than 8');
        }

        if (!emailRegex.test(account.email)) {
            throw new InvalidEmailFormatException('email format is invalid');
        }

        return true
    }


    static register(account) {
        if (!account) {
            throw new ObjectNullException('account is null');
        }
        if (!account.email || !account.poeName || !account.password) {
            throw new ObjectNullException('email or password is null');
        }

        if (account.password.length < 8) {
            throw new PasswordLengthExceededException('password length is less than 8');
        }

        if (!emailRegex.test(account.email)) {
            throw new InvalidEmailFormatException('email format is invalid');
        }

        return true
    }
}