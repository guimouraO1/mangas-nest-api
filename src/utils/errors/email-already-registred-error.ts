export class EmailAlreadyRegistredError extends Error {
    constructor() {
        super('Email already registred');
    }
}
