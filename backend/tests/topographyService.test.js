const { generatePointCloud } = require('../src/services/topographyService');

describe('Topography Service', () => {
    it('should generate a point cloud with valid properties', () => {
        const points = generatePointCloud(50, 5);
        expect(Array.isArray(points)).toBe(true);
        expect(points.length).toBeGreaterThan(0);
        
        // Check if points have x, y, z coordinates
        const firstPoint = points[0];
        expect(firstPoint).toHaveProperty('x');
        expect(firstPoint).toHaveProperty('y');
        expect(firstPoint).toHaveProperty('z');
    });

    it('should generate higher base height for higher fill levels', () => {
        const lowFill = generatePointCloud(10, 0);
        const highFill = generatePointCloud(90, 0);

        const avgLow = lowFill.reduce((sum, p) => sum + p.y, 0) / lowFill.length;
        const avgHigh = highFill.reduce((sum, p) => sum + p.y, 0) / highFill.length;

        expect(avgHigh).toBeGreaterThan(avgLow);
    });
});
