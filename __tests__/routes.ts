import request from 'supertest'; 
import app from '../server/server'; 

describe('api routes', () => {
  describe('/api/app', () => {
    it('/', async () => {
      const res: request.Response = await request(app).get('/api/app/')
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .then((res) => {
          expect(typeof res).toBe('object');
        });
    }), 
    
    it('/', async () => {
      const res: request.Response = await request(app).post('/api/app/')
        .send({salary: 20000, sign_on_bonus: 300, start_date: '10/18/2020', notes: 'starting today'})
        .expect(200)
        .then((res) => {
          expect(typeof res).toBe('object');
        });
    });
  });


});

