const httpStatus = require('http-status');
const app = require('../app');
const { clearDatabase } = require('../utils/mongoose.utils');

describe('## Score APIs', () => {

  before(async () => {
    await clearDatabase();
  });

  describe('# POST /api/leaderboard', () => {
    it('should create new score', async () => {
      const data = {
        playerName: 'DPizzle',
        difficulty: 'Beginner',
        value: 5,
        seconds: 10
      };

      const response = await request(app).post('/api/leaderboard').send(data);

      expect(response.status).to.equal(httpStatus.CREATED);
      expect(response.body.playerName).to.equal(data.playerName);
    });
  });

  describe('# GET /api/leaderboard', () => {
    it('should get all scores', async () => {
      const response = await request(app).get('/api/leaderboard');

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body).to.have.lengthOf(1);
    });
  });
});
