const app = require('../../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const path = require("path");
const User = require('../../../models/user.model')
chai.use(chaiHttp);

const expect = chai.expect;
const agent = chai.request.agent(app);

describe('POST /auth/', () => {
    after(async () => {
        await User.deleteMany();
        agent.close();
    });

    it('should register user', async () => {
            const resRegister = await agent.post('/auth/register').set('Content-Type', 'application/x-www-form-urlencoded')
                .field('login', "testUserOne")
                .field('password', "password1")
                .field('phoneNumber', "123456789")
                .attach('avatar',
                    fs.readFileSync(path.resolve(__dirname, "../../img/artemis.jpg")),
                    'artemis.jpg');
            expect(resRegister.status).to.be.equal(201);
        });

    it('should login', async () => {
        const res = await agent.post('/auth/login')
            .send({
                login: "testUserOne",
                password: "password1" });
        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.be.equal("Login successful");
    });

    it('should logout', async () => {
        const res = await agent.get('/auth/logout');
        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.be.equal("Logout successful");
    });

});
