import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import app from 'src/app';

describe('Refresh token controller', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('shoud be able to refresh a token', async () => {
        await request(app.server).post('/user').send({
            name: 'Jhon Dow',
            email: 'jhondoe@example.com',
            password: '123456',
            username: 'jhondoe'
        });

        const authResponse = await request(app.server).post('/auth/session').send({
            email: 'jhondoe@example.com',
            password: '123456'
        });

        const cookies = authResponse.get('Set-Cookie');

        const response = await request(app.server)
            .patch('/auth/refresh-token')
            .set('Cookie', cookies ?? [])
            .send();

        // console.log(response.body);
        // expect(response.statusCode).toEqual(200);
        // expect(response.body).toEqual({ token: expect.any(String) });
        // expect(response.get('Set-Cookie')).toEqual([expect.stringContaining('refreshToken=')]);
    });
});
