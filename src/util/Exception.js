export class PasswordLengthExceededException extends Error {
    constructor(message) {
        super(message);
        this.name = "PasswordLengthExceededException";
    }
}

export class InvalidEmailFormatException extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidEmailFormatException";
    }
}

export class ObjectNullException extends Error {
    constructor(message) {
        super(message);
        this.name = "ObjectNullException";
    }
}

export class UnauthorizedException extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedException";
    }
}