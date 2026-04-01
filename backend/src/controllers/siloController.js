const topographyService = require('../services/topographyService');

const getSiloScan = (req, res) => {
    try {
        // Allow the frontend to request specific states for testing, 
        // fallback to defaults if not provided.
        const fillLevel = req.query.fillLevel ? parseFloat(req.query.fillLevel) : 65;
        const variance = req.query.variance ? parseFloat(req.query.variance) : 5;

        // Ensure parameters are within realistic bounds
        const safeFillLevel = Math.max(0, Math.min(100, fillLevel));
        const safeVariance = Math.max(0, Math.min(20, variance));

        const pointCloud = topographyService.generatePointCloud(safeFillLevel, safeVariance);
        
        // Calculate a rough volume estimate based on the points
        const averageHeight = pointCloud.reduce((sum, p) => sum + p.y, 0) / pointCloud.length;

        res.status(200).json({
            timestamp: new Date().toISOString(),
            sensorId: "PRO-SENSE-HD-001",
            metrics: {
                fillLevelPercentage: safeFillLevel,
                averageHeightUnits: averageHeight.toFixed(2),
                dataPoints: pointCloud.length
            },
            pointCloud: pointCloud
        });
    } catch (error) {
        console.error("Error generating silo scan:", error);
        res.status(500).json({ error: "Failed to generate sensor data" });
    }
};

module.exports = {
    getSiloScan
};
