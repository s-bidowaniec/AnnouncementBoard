/*
const User = require("../../../models/user.model");
const app = require("../../../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const fs = require("fs");
const request = chai.request;
const agent = chai.request.agent(app);
chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /auth/user', () => {
    after(async () => {
        await User.deleteMany();
    });
    it('should register user login', async () => {
        await agent.post('/auth/register').set('Content-Type', 'application/x-www-form-urlencoded')
            .field('login', "testUserOne")
            .field('password', "password1")
            .field('phoneNumber', "123456789")
            .attach('avatar',
                fs.readFileSync('/Users/s-bidowaniec/ProjectsJS/Kodilla/Intelij_Projects/module_32/AnnouncementBoard/test/img/artemis.jpg'),
                'preview.png').then(function (res) {
            expect(res.status).to.be.equal(201);
            return agent
                .post('/auth/login')
                .send({ login: "testUserOne",
                    password: "password1" })
                .then(function (res) {
                    expect(res).to.have.cookie('sessionid');
                    // The `agent` now has the sessionid cookie saved, and will send it
                    // back to the server in the next request:
                    return agent.get('/auth/user')
                        .then(function (res) {
                            expect(res).to.have.status(200);
                            expect(res.body.message).to.be.equal("Session active");
                        });
                });
        });
        agent.close();
    });
});
*/
