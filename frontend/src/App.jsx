import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import SiloCanvas from './components/SiloCanvas';

function App() {
  const [fillLevel, setFillLevel] = useState(65);
  const [variance, setVariance] = useState(5);
  const [sensorData, setSensorData] = useState({ metrics: null, pointCloud: [] });

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/silo/scan?fillLevel=${fillLevel}&variance=${variance}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setSensorData(data);
        } catch (error) {
            console.error("Error fetching sensor data. Ensure the backend is running on port 3001.", error);
        }
    };

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [fillLevel, variance]);

  return (
    <div id="root">
      <Dashboard 
        fillLevel={fillLevel} 
        setFillLevel={setFillLevel} 
        variance={variance} 
        setVariance={setVariance}
        metrics={sensorData.metrics}
      />
      <SiloCanvas pointCloudData={sensorData.pointCloud} />
    </div>
  );
}

export default App;
