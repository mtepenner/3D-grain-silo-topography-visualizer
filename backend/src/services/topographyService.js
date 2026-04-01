/**
 * Generates a 3D point cloud simulating the surface of feed inside a silo.
 * @param {number} fillLevel - Percentage full (0 to 100)
 * @param {number} variance - How uneven the surface is (0 to 20)
 * @returns {Array} Array of {x, y, z} objects
 */
const generatePointCloud = (fillLevel, variance) => {
    const radius = 10; // The radius of our mock physical silo
    const resolution = 0.5; // Distance between sensor pings (lower = higher res)
    const points = [];

    // Map the 0-100% fill level to a physical height (e.g., 0 to 40 units tall)
    const maxHeightUnits = 40;
    const baseHeight = (fillLevel / 100) * maxHeightUnits;

    // Iterate through a grid
    for (let x = -radius; x <= radius; x += resolution) {
        for (let z = -radius; z <= radius; z += resolution) {
            
            // Equation of a circle: x^2 + z^2 <= r^2
            // Only generate points that hit inside the silo walls
            if (x * x + z * z <= radius * radius) {
                
                // 1. Calculate the distance from the center
                const distFromCenter = Math.sqrt(x * x + z * z);
                
                // 2. Simulate "Rat-holing" (grain drains from the center bottom, creating a funnel)
                // The closer to the center, the deeper the grain drops.
                const funnelEffect = (1 - (distFromCenter / radius)) * variance;

                // 3. Add surface clumping/bumpiness using sine waves
                // This prevents the surface from looking like a perfect, unnatural mathematical cone.
                const clumping = (Math.sin(x * 1.5) * Math.cos(z * 1.5)) * (variance * 0.15);

                // 4. Calculate final Y height
                // Base height, plus bumps, minus the center sinkhole
                let y = baseHeight + clumping - funnelEffect;

                // Ensure grain doesn't clip through the floor
                y = Math.max(0, y);

                points.push({ 
                    x: parseFloat(x.toFixed(2)), 
                    y: parseFloat(y.toFixed(2)), 
                    z: parseFloat(z.toFixed(2)) 
                });
            }
        }
    }

    return points;
};

module.exports = {
    generatePointCloud
};
