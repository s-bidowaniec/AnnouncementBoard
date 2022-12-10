const User = require("../../../models/user.model");
const server = require("../../../server");
const chai = require("chai");
const agent = chai.request.agent(server);
describe('GET /auth/user', () => {
    after(async () => {
        await User.deleteMany();
        agent.close();
    });
    it('should create session', async () => {
        agent
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
});