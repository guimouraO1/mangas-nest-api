export class MangaNotFoundError extends Error {
    constructor() {
        super('Manga not found.');
    }
}
