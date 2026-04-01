# 🌾 3D Topography Visualizer

A full-stack web application designed to simulate and visualize the 3D surface topography of feed or grain inside a silo. This project features an interactive frontend powered by Three.js that renders 3D point clouds in real-time, backed by a Node.js API that procedurally generates realistic sensor data, simulating physical behaviors like "rat-holing" and surface clumping.

## 📑 Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Features
* **Interactive 3D Visualization:** Explore the mock silo and point cloud data using OrbitControls (pan, zoom, rotate).
* **Dynamic Simulation Controls:** Use the dashboard to adjust the simulated silo **Fill Level** (0-100%) and **Surface Variance** (0-20) in real-time.
* **Realistic Procedural Generation:** The backend calculates accurate point clouds, taking into account grain behaviors like funneling (rat-holing) and natural surface unevenness.
* **Live Metrics:** View real-time calculations of the estimated fill percentage, average height in units, and the number of active 3D data points.

## 🛠️ Technologies Used

**Frontend:**
* [React 18](https://reactjs.org/)
* [Three.js](https://threejs.org/)
* [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) & [Drei](https://github.com/pmndrs/drei)
* [Vite](https://vitejs.dev/)

**Backend:**
* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* CORS

## 💻 Installation

To get a local copy up and running, follow these simple steps.

### 1. Clone the repository
```bash
git clone [https://github.com/mtepenner/3d-topography-visualizer.git](https://github.com/mtepenner/3d-topography-visualizer.git)
cd 3d-topography-visualizer
```

### 2. Setup the Backend
The backend serves the mock sensor data on port `3001`.
```bash
cd backend
npm install
npm run dev
```

### 3. Setup the Frontend
Open a new terminal window/tab to start the React development server.
```bash
cd frontend
npm install
npm run dev
```

## 🎮 Usage

1. Ensure the backend is running (`http://localhost:3001`).
2. Open the frontend URL provided by Vite (usually `http://localhost:5173`) in your web browser.
3. Use your mouse to interact with the 3D canvas:
   * **Left Click & Drag:** Rotate the camera.
   * **Right Click & Drag:** Pan the camera.
   * **Scroll Wheel:** Zoom in and out.
4. Adjust the sliders in the **BinSentry ProSense** dashboard on the top-left to dynamically alter the silo's volume and surface clumpiness.

## 📂 Project Structure

```text
3d-topography-visualizer/
├── backend/                  # Express API
│   ├── index.js              # Server entry point
│   └── src/
│       ├── controllers/      # Route logic (siloController.js)
│       ├── routes/           # API endpoints (siloRoutes.js)
│       └── services/         # Point cloud generation (topographyService.js)
└── frontend/                 # React Application
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── App.jsx           # Main application logic & data fetching
        ├── App.css           # Styling
        └── components/
            ├── Dashboard.jsx # UI controls and metrics
            └── SiloCanvas.jsx# Three.js 3D rendering context
```

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
