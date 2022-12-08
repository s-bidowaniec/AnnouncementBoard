
const server = require('../../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Announcement = require('../../../models/announcement.model')
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/announcements', () => {
    before(async () => {
        const testAnnouncementOne = new Announcement({title: "abc", content: "abc", date: "2022:12:10", photo: "abc", price: "100", location: "location", seller: "seller"});
        await testAnnouncementOne.save();
        const testAnnouncementTwo = new Announcement({title: "abc", content: "abc", date: "2022:12:10", photo: "abc", price: "100", location: "location", seller: "seller"});
        await testAnnouncementTwo.save();
        const testAnnouncementThree = new Announcement({title: "abc", content: "abc", date: "2022:12:10", photo: "abc", price: "100", location: "location", seller: "seller"});
        await testAnnouncementThree.save();
        const testAnnouncementFour = new Announcement({title: "abc", content: "abc", date: "2022:12:10", photo: "abc", price: "100", location: "location", seller: "seller"});
        await testAnnouncementFour.save();
    });
    after(async () => {
        await Announcement.deleteMany();
    });
    it('should return all Announcements', async () => {
        const res = await request(server).get('/api/ads');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(4);
    });

});