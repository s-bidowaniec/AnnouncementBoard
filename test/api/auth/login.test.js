const server = require('../../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../../../models/user.model')
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const agent = chai.request.agent(server);

describe('POST /auth/register', () => {
    after(async () => {
        await User.deleteMany();

    });

    it('should register user login', async () => {
        const resRegister = await request(server).post('/auth/register').send({
            login: "testUserOne",
            password: "password1",
            avatar: "avatar",
            phoneNumber: "123456789" });
        expect(resRegister.status).to.be.equal(201);
    });

    it('should login', async () => {
        const res = await request(server).post('/auth/login')
            .send({
                login: "testUserOne",
                password: "password1" })
        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.be.equal("Login successful");
    });

    // logOut

});