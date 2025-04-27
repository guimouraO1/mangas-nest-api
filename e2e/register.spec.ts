import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import app from 'src/app';
import { FAKE_USER, FAKE_USER_SIGN_IN } from 'src/utils/constants/fake-user';

describe('Register controller', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('shoud be able to register', async () => {
        const response = await request(app.server).post('/user').send({
            name: FAKE_USER.name,
            email:  FAKE_USER.email,
            password:  FAKE_USER_SIGN_IN.password,
            username: FAKE_USER.username
        });

        expect(response.statusCode).toEqual(201);
    });
});
