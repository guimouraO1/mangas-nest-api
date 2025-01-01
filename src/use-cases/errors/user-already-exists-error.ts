export class UserAlreadyExistsError extends Error {
    constructor() {
        super("E-mail or username already exists");
    }
}
