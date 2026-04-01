const express = require('express');
const cors = require('cors');
const siloRoutes = require('./src/routes/siloRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Allows our React frontend to make requests
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use('/api/silo', siloRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'active', message: 'API is running.' });
});

app.listen(PORT, () => {
    console.log(`📡 Edge Node Simulator running on http://localhost:${PORT}`);
});
