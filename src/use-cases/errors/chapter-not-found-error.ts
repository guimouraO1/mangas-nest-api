export class ChapterNotFoundError extends Error {
    constructor() {
        super('Chapter not found');
    }
}
