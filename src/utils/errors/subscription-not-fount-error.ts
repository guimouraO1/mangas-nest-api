export class SubscriptionNotFoundError extends Error {
    constructor() {
        super('Subscription not found.');
    }
}
