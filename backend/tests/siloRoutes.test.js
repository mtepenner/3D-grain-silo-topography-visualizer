const request = require('supertest');
const express = require('express');
const siloRoutes = require('../src/routes/siloRoutes');

const app = express();
app.use('/api/silo', siloRoutes);

describe('GET /api/silo/scan', () => {
    it('should return 200 and a valid scan object', async () => {
        const res = await request(app).get('/api/silo/scan?fillLevel=50&variance=5');
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('timestamp');
        expect(res.body).toHaveProperty('metrics');
        expect(res.body).toHaveProperty('pointCloud');
        expect(Array.isArray(res.body.pointCloud)).toBe(true);
        expect(res.body.metrics.fillLevelPercentage).toBe(50);
    });
});
