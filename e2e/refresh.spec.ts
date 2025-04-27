import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import app from 'src/app';
import { FAKE_USER, FAKE_USER_SIGN_IN } from 'src/utils/constants/fake-user';

describe('Refresh token e2e', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('shoud be able to refresh a token', async () => {
        await request(app.server).post('/user').send({
            name: FAKE_USER.name,
            email:  FAKE_USER.email,
            password:  FAKE_USER_SIGN_IN.password,
            username: FAKE_USER.username
        });

        const authResponse = await request(app.server).post('/sign-in').send({
            email:  FAKE_USER.email,
            password:  FAKE_USER_SIGN_IN.password
        });

        const cookies = authResponse.get('Set-Cookie');
        const response = await request(app.server).post('/refresh-token').set('Cookie', cookies ?? []).send();

        expect(response.statusCode).toEqual(200);
    });
});
