import { beforeEach, describe, expect, it } from 'vitest';
import { AuthenticateUseCase } from './authenticate';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';
import { FAKE_USER, FAKE_USER_SIGN_IN } from '../../utils/constants/fake-user';
import { UserNotFound } from '../../utils/errors/user-not-found';
import { InvalidPasswordError } from '../../utils/errors/invalid-password-error';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate use case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new AuthenticateUseCase(usersRepository);
    });

    it('should be able to authenticate', async () => {
        await usersRepository.create({
            name: FAKE_USER.name,
            email: FAKE_USER.email,
            password_hash: FAKE_USER.password_hash,
            username: FAKE_USER.username
        });

        const user = await sut.execute(FAKE_USER_SIGN_IN);
        expect(user.id).toEqual(expect.any(String));
        expect(user.username).toEqual(FAKE_USER.username);
        expect(user.email).toEqual(FAKE_USER.email);
    });

    it('should not be able to authenticate with wrong email', async () => {
        await usersRepository.create({
            name: FAKE_USER.name,
            email: FAKE_USER.email,
            password_hash: FAKE_USER.password_hash,
            username: FAKE_USER.username
        });

        await expect(() => sut.execute({ email: 'wrong_email', password: FAKE_USER_SIGN_IN.password }))
            .rejects.toBeInstanceOf(UserNotFound);
    });

    it('should not be able to authenticate with wrong password', async () => {
        await usersRepository.create({
            name: FAKE_USER.name,
            email: FAKE_USER.email,
            password_hash: FAKE_USER.password_hash,
            username: FAKE_USER.username
        });

        await expect(() => sut.execute({ email: FAKE_USER_SIGN_IN.email, password: 'wrong_password' }))
            .rejects.toBeInstanceOf(InvalidPasswordError);
    });
});
