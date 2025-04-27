export class UsernameAlreadyRegistredError extends Error {
    constructor() {
        super('Username already registred');
    }
}
