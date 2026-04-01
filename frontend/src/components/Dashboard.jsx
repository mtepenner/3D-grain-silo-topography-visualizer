import React from 'react';

export default function Dashboard({ fillLevel, setFillLevel, variance, setVariance, metrics }) {
  return (
    <div className="dashboard-container">
      <h2 style={{ margin: '0 0 10px 0' }}>BinSentry ProSense</h2>
      <hr style={{ borderColor: '#374151', marginBottom: '20px' }} />

      <div className="metric-box">
        <div style={{ fontSize: '12px', color: '#9ca3af', letterSpacing: '1px' }}>EST. FILL LEVEL</div>
        <div className="metric-value">{metrics ? metrics.fillLevelPercentage : '--'}%</div>
      </div>

      <div className="metric-box">
        <div style={{ fontSize: '12px', color: '#9ca3af', letterSpacing: '1px' }}>AVG HEIGHT (UNITS)</div>
        <div className="metric-value">{metrics ? metrics.averageHeightUnits : '--'}</div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <label style={{ display: 'block', fontSize: '14px', color: '#d1d5db' }}>
          Simulate Fill Level: <strong>{fillLevel}%</strong>
          <input 
            type="range" 
            min="0" max="100" 
            value={fillLevel} 
            onChange={(e) => setFillLevel(e.target.value)} 
          />
        </label>
        
        <label style={{ display: 'block', fontSize: '14px', color: '#d1d5db' }}>
          Simulate Surface Variance: <strong>{variance}</strong>
          <input 
            type="range" 
            min="0" max="20" 
            value={variance} 
            onChange={(e) => setVariance(e.target.value)} 
          />
        </label>
      </div>
      
      <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '20px', textAlign: 'center' }}>
        Active Data Points: {metrics ? metrics.dataPoints : 0}
      </div>
    </div>
  );
}
