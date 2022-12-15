const app = require('../../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Announcement = require('../../../models/announcement.model')
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/announcements', () => {
    before(async () => {
        const testAnnouncementOne = new Announcement({title: "content_name_one",
            content: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ",
            date: "2022:12:10", photo: "abc", price: "100", location: "location", seller: "seller"});
        await testAnnouncementOne.save();
        const testAnnouncementTwo = new Announcement({title: "xyz_name_one",
            content: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ",
            date: "2022:12:10", photo: "abc", price: "100", location: "location", seller: "seller"});
        await testAnnouncementTwo.save();
        const testAnnouncementThree = new Announcement({title: "xyz_name_two",
            content: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ",
            date: "2022:12:10", photo: "abc", price: "100", location: "location", seller: "seller"});
        await testAnnouncementThree.save();
        const testAnnouncementFour = new Announcement({title: "abc_name_two",
            content: "Content Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ",
            date: "2022:12:10", photo: "abc", price: "100", location: "location", seller: "seller"});
        await testAnnouncementFour.save();
    });
    after(async () => {
        await Announcement.deleteMany();
    });
    it('should return all Announcements', async () => {
        const res = await request(app).get('/api/ads');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(4);
    });
    it('should find two Announcements by title', async () => {
        const res = await request(app).get('/api/ads/search/xyz');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });
    it('should find two Announcements by title and content', async () => {
        const res = await request(app).get('/api/ads/search/content');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });
});