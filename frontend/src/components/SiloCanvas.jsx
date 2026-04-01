import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const PointCloud = ({ data }) => {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    if (!data || data.length === 0) return geo;

    const positions = new Float32Array(data.length * 3);
    data.forEach((point, i) => {
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
    });

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [data]);

  return (
    <points geometry={geometry}>
      <pointsMaterial 
        size={0.4} 
        color="#10b981" 
        sizeAttenuation={true} 
        transparent={true}
        opacity={0.8}
      />
    </points>
  );
};

export default function SiloCanvas({ pointCloudData }) {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 30, 40], fov: 50 }}>
        <OrbitControls target={[0, 15, 0]} enableDamping={true} dampingFactor={0.05} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 50, 10]} intensity={1} />

        {/* Silo Walls */}
        <mesh position={[0, 20, 0]}>
          <cylinderGeometry args={[10.5, 10.5, 40, 32]} />
          <meshBasicMaterial color="#374151" wireframe={true} transparent opacity={0.15} />
        </mesh>

        {/* Silo Floor */}
        <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[10.5, 32]} />
          <meshBasicMaterial color="#1f2937" />
        </mesh>

        {/* Topography Data */}
        <PointCloud data={pointCloudData} />
        
        {/* Spatial Grid */}
        <gridHelper args={[40, 40, '#4b5563', '#374151']} position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}
