const server = require('../../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../../../models/user.model')
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const agent = chai.request.agent(server);

describe('GET /auth/user', () => {
    after(async () => {
        await User.deleteMany();
        agent.close();
    });

    it('should return confirm session after login', async () => {
        const resRegister = await request(server).post('/auth/register').send({
            login: "testUserOne",
            password: "password1",
            avatar: "avatar",
            phoneNumber: "123456789" });
        expect(resRegister.status).to.be.equal(201);
        agent
            .post('/auth/login')
            .send({
            login: "testUserOne",
            password: "password1" })
            .then(function (res){
                expect(res.status).to.be.equal(200);
                return agent.get('/auth/user')
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        expect(res.body.login).to.be.equal('testUserOne');
                    });
            });
        agent.close();
    });
});