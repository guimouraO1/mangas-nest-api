export class AlreadySubscribedError extends Error {
    constructor() {
        super('Already subscribed');
    }
}
