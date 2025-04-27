export class ChapterAlreadyExistsError extends Error {
    constructor() {
        super('Chapter already exists');
    }
}
