import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository';
import { FAKE_USER, FAKE_USER_SIGN_IN } from 'src/utils/constants/fake-user';
import { EmailAlreadyRegistredError } from 'src/utils/errors/email-already-registred-error';
import { UsernameAlreadyRegistredError } from 'src/utils/errors/username-already-registred-error';

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register use case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new RegisterUseCase(usersRepository);
    });

    it('should be able to register', async () => {
        const user  = await sut.execute({
            email: FAKE_USER.email,
            name: FAKE_USER.name,
            password: FAKE_USER_SIGN_IN.password,
            username: FAKE_USER.username
        });

        expect(user.id).toEqual(expect.any(String));
        expect(user.email).toEqual(FAKE_USER.email);
        expect(user.username).toEqual(FAKE_USER.username);
    });

    it('should hash user password upon registration', async () => {
        const user  = await sut.execute({
            email: FAKE_USER.email,
            name: FAKE_USER.name,
            password: FAKE_USER_SIGN_IN.password,
            username: FAKE_USER.username
        });

        const isPasswordCorrectlyHashed = await compare(FAKE_USER_SIGN_IN.password, user.password_hash);
        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it('should not be able to register with same email twice', async () => {
        const user  = await sut.execute({
            email: FAKE_USER.email,
            name: FAKE_USER.name,
            password: FAKE_USER_SIGN_IN.password,
            username: FAKE_USER.username
        });

        await expect(() => sut.execute({
            email: FAKE_USER.email,
            name: FAKE_USER.name,
            password: FAKE_USER_SIGN_IN.password,
            username: FAKE_USER.username
        })).rejects.toBeInstanceOf(EmailAlreadyRegistredError);
    });

    it('should not be able to register with same username twice', async () => {
        const user  = await sut.execute({
            email: FAKE_USER.email,
            name: FAKE_USER.name,
            password: FAKE_USER_SIGN_IN.password,
            username: FAKE_USER.username
        });

        await expect(() => sut.execute({
            email: FAKE_USER.email.replace('user', 'user2'),
            name: FAKE_USER.name,
            password: FAKE_USER_SIGN_IN.password,
            username: FAKE_USER.username
        })).rejects.toBeInstanceOf(UsernameAlreadyRegistredError);
    });
});
