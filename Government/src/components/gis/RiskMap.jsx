import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Minus, 
  Maximize2, 
  Minimize2, 
  LocateFixed, 
  Layers, 
  AlertOctagon, 
  ShieldAlert, 
  Compass,
  Building2,
  CloudRain,
  Activity
} from 'lucide-react';
import { MapFilterBar } from './MapFilterBar';
import { MapLegend } from './MapLegend';
import { ClusterDrawer } from './ClusterDrawer';

export function RiskMap({ 
  points, 
  filters, 
  onFilterChange, 
  onClusterAction,
  selectedCluster,
  onSelectCluster 
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeLayers, setActiveLayers] = useState({
    outbreaks: true,
    riskZones: true,
    clinics: true,
    labs: true,
    weather: true
  });
  const mapContainerRef = useRef(null);

  // Erode district center coordinates (Lat: 11.34, Lng: 77.58)
  const baseCenter = { lat: 11.3410, lng: 77.5828 };

  const handleToggleLayer = (layerId) => {
    setActiveLayers(prev => ({
      ...prev,
      [layerId]: !prev[layerId]
    }));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapContainerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const resetMapFocus = () => {
    setZoomLevel(1);
    onSelectCluster(null);
  };

  // Filter points based on user selections
  const filteredPoints = points.filter(pt => {
    if (pt.type === 'outbreak') {
      if (filters.animal !== 'all' && !pt.species?.toLowerCase().includes(filters.animal.toLowerCase())) {
        return false;
      }
      if (filters.disease !== 'all' && !pt.disease?.toLowerCase().includes(filters.disease.toLowerCase())) {
        return false;
      }
      if (!activeLayers.outbreaks) return false;
    }
    if (pt.type === 'clinic' && !activeLayers.clinics) return false;
    if (pt.type === 'lab' && !activeLayers.labs) return false;
    if (pt.type === 'weather' && !activeLayers.weather) return false;
    return true;
  });

  // Calculate SVG projection coordinates for Erode district bounds
  // Lat range: 11.0 to 11.7, Lng range: 77.1 to 77.9
  const project = (lat, lng) => {
    const minLat = 11.05, maxLat = 11.65;
    const minLng = 77.15, maxLng = 77.92;
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  return (
    <div 
      ref={mapContainerRef} 
      className={`hero-gis-map ${isFullscreen ? 'fullscreen-mode' : ''}`}
    >
      {/* Top Map Filter System */}
      <MapFilterBar 
        filters={filters} 
        onFilterChange={onFilterChange} 
      />

      {/* Main Map Visual Canvas */}
      <div className="gis-canvas-wrapper">
        {/* Top Control Overlay */}
        <div className="map-top-bar">
          <div className="map-status-pill">
            <span className="live-blink-dot" />
            <span className="font-mono">ERODE EPIZOOTIC GRID • EPSG:4326</span>
            <span className="count-pill font-mono">{filteredPoints.length} CLUSTERS</span>
          </div>

          <div className="map-controls">
            <button 
              className="ctrl-btn" 
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.2))}
              title="Zoom In"
            >
              <Plus size={15} />
            </button>
            <button 
              className="ctrl-btn" 
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
              title="Zoom Out"
            >
              <Minus size={15} />
            </button>
            <button 
              className="ctrl-btn" 
              onClick={resetMapFocus}
              title="Reset View"
            >
              <LocateFixed size={15} />
            </button>
            <button 
              className="ctrl-btn" 
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen GIS"}
            >
              {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>
          </div>
        </div>

        {/* Vector Cartography & GIS Canvas */}
        <div 
          className="gis-viewport"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
        >
          <svg className="gis-svg-layer" viewBox="0 0 1000 650" preserveAspectRatio="none">
            {/* Grid Coordinates Lines */}
            <defs>
              <pattern id="gis-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#D3D5CD" strokeWidth="0.8" strokeDasharray="3,3"/>
              </pattern>
              <radialGradient id="quarantine-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#DC2626" stopOpacity="0.35"/>
                <stop offset="70%" stopColor="#DC2626" stopOpacity="0.12"/>
                <stop offset="100%" stopColor="#DC2626" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="weather-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D97706" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="#D97706" stopOpacity="0"/>
              </radialGradient>
            </defs>

            {/* Cartographic Base Fill */}
            <rect width="1000" height="650" fill="#E8E7DF" />
            <rect width="1000" height="650" fill="url(#gis-grid)" />

            {/* Realistic District Boundaries & Cauvery / Bhavani River Paths */}
            <path 
              d="M 50 120 Q 180 80 340 160 T 560 210 T 780 240 T 960 380 L 980 620 L 60 630 Z" 
              fill="#F2F1EA" 
              stroke="#BDBCAE" 
              strokeWidth="1.5" 
            />

            {/* Bhavani & Cauvery River Waterways */}
            <path 
              d="M 150 40 Q 240 180 440 260 T 700 320 T 920 460" 
              fill="none" 
              stroke="#B0C4DE" 
              strokeWidth="4" 
              strokeLinecap="round"
            />
            <text x="510" y="275" fill="#64748B" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="2">
              BHAVANI RIVER DRAINAGE BASIN
            </text>

            {/* Major Arterial Highway Corridor (NH 544 - Coimbatore-Salem Road) */}
            <path 
              d="M 100 520 L 460 340 L 890 190" 
              fill="none" 
              stroke="#D4D2C5" 
              strokeWidth="3.5" 
              strokeDasharray="8,4"
            />
            <text x="320" y="390" fill="#78716C" fontSize="10" fontFamily="var(--font-mono)">
              NH-544 (LIVESTOCK TRANSIT CORRIDOR)
            </text>

            {/* Quarantine Buffer Rings (5km & 10km Radius) */}
            {activeLayers.riskZones && filteredPoints.filter(p => p.type === 'outbreak').map(ob => {
              const { x, y } = project(ob.lat, ob.lng);
              const cx = (x / 100) * 1000;
              const cy = (y / 100) * 650;
              const radius = ob.quarantineRadiusKm === 10 ? 80 : 50;

              return (
                <g key={`buffer-${ob.id}`}>
                  {/* Outer Buffer Ring */}
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r={radius} 
                    fill="url(#quarantine-glow)" 
                    stroke="#B91C1C" 
                    strokeWidth="1.5" 
                    strokeDasharray="4,4"
                  />
                  {/* Radial Label */}
                  <text 
                    x={cx + radius + 4} 
                    y={cy + 3} 
                    fill="#991B1B" 
                    fontSize="9.5" 
                    fontFamily="var(--font-mono)" 
                    fontWeight="700"
                  >
                    {ob.quarantineRadiusKm}KM QUARANTINE
                  </text>
                </g>
              );
            })}

            {/* Weather Anomaly Cloud Ring */}
            {activeLayers.weather && filteredPoints.filter(p => p.type === 'weather').map(w => {
              const { x, y } = project(w.lat, w.lng);
              const cx = (x / 100) * 1000;
              const cy = (y / 100) * 650;
              return (
                <g key={`wz-${w.id}`}>
                  <circle cx={cx} cy={cy} r="65" fill="url(#weather-glow)" stroke="#D97706" strokeWidth="1" strokeDasharray="3,3" />
                  <text x={cx - 50} y={cy - 70} fill="#B45309" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="700">
                    PRECIPITATION SURGE (+42mm)
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Interactive HTML Layer Points Overlay */}
          <div className="gis-markers-overlay">
            {filteredPoints.map((pt) => {
              const { x, y } = project(pt.lat, pt.lng);
              const isSelected = selectedCluster?.id === pt.id;

              if (pt.type === 'outbreak') {
                const isCritical = pt.riskLevel === 'CRITICAL';
                return (
                  <div
                    key={pt.id}
                    className={`gis-marker outbreak-marker ${pt.riskLevel.toLowerCase()} ${isSelected ? 'selected' : ''}`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    onClick={() => onSelectCluster(pt)}
                  >
                    <div className={`marker-pin ${isCritical ? 'pulse-fast' : ''}`}>
                      <AlertOctagon size={13} />
                    </div>
                    <div className="marker-callout">
                      <span className="callout-code font-mono">{pt.id}</span>
                      <span className="callout-name">{pt.location}</span>
                      <span className="callout-disease">{pt.disease}</span>
                    </div>
                  </div>
                );
              }

              if (pt.type === 'clinic') {
                return (
                  <div
                    key={pt.id}
                    className={`gis-marker clinic-marker ${isSelected ? 'selected' : ''}`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    onClick={() => onSelectCluster(pt)}
                  >
                    <div className="marker-pin clinic-pin">
                      <Building2 size={12} />
                    </div>
                    <div className="marker-label-small">{pt.name.replace('Veterinary ', '')}</div>
                  </div>
                );
              }

              if (pt.type === 'lab') {
                return (
                  <div
                    key={pt.id}
                    className={`gis-marker lab-marker ${isSelected ? 'selected' : ''}`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    onClick={() => onSelectCluster(pt)}
                  >
                    <div className="marker-pin lab-pin">
                      <Activity size={12} />
                    </div>
                    <div className="marker-label-small">{pt.name}</div>
                  </div>
                );
              }

              if (pt.type === 'weather') {
                return (
                  <div
                    key={pt.id}
                    className="gis-marker weather-marker"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    onClick={() => onSelectCluster(pt)}
                  >
                    <div className="marker-pin weather-pin">
                      <CloudRain size={12} />
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>

        {/* Legend Panel on Bottom Left */}
        <MapLegend 
          activeLayers={activeLayers} 
          onToggleLayer={handleToggleLayer} 
        />

        {/* Selected Cluster Slide-in Inspection Drawer */}
        <ClusterDrawer 
          point={selectedCluster} 
          onClose={() => onSelectCluster(null)}
          onAction={onClusterAction}
        />
      </div>

      <style>{`
        .hero-gis-map {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          box-shadow: var(--shadow-sm);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          margin-bottom: 24px;
          position: relative;
        }

        .hero-gis-map.fullscreen-mode {
          position: fixed;
          inset: 0;
          z-index: 3000;
          height: 100vh;
          width: 100vw;
          margin: 0;
          border-radius: 0;
        }

        .gis-canvas-wrapper {
          position: relative;
          height: 520px;
          background-color: #E2E0D6;
          overflow: hidden;
        }

        .hero-gis-map.fullscreen-mode .gis-canvas-wrapper {
          height: calc(100vh - 45px);
        }

        .map-top-bar {
          position: absolute;
          top: 12px;
          left: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 400;
          pointer-events: none;
        }

        .map-status-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(4px);
          border: 1px solid var(--border-strong);
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
          pointer-events: auto;
        }

        .live-blink-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--status-critical);
          animation: pulse-critical 1.8s infinite;
        }

        .count-pill {
          background: var(--govt-forest-tint);
          color: var(--govt-forest);
          padding: 1px 6px;
          border-radius: 2px;
          font-size: 10px;
        }

        .map-controls {
          display: flex;
          gap: 6px;
          pointer-events: auto;
        }

        .ctrl-btn {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(4px);
          border: 1px solid var(--border-strong);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
          transition: all 0.15s;
        }
        .ctrl-btn:hover {
          background: #FFFFFF;
          border-color: var(--govt-forest);
          color: var(--govt-forest);
        }

        .gis-viewport {
          width: 100%;
          height: 100%;
          position: relative;
          transition: transform 0.2s ease-out;
        }

        .gis-svg-layer {
          width: 100%;
          height: 100%;
          display: block;
        }

        .gis-markers-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .gis-marker {
          position: absolute;
          transform: translate(-50%, -50%);
          pointer-events: auto;
          cursor: pointer;
          transition: transform 0.15s ease;
          z-index: 10;
        }
        .gis-marker:hover, .gis-marker.selected {
          transform: translate(-50%, -50%) scale(1.15);
          z-index: 30;
        }

        .marker-pin {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          border: 2px solid #FFFFFF;
        }

        .outbreak-marker.critical .marker-pin {
          background-color: var(--status-critical);
        }

        .outbreak-marker.high .marker-pin {
          background-color: var(--status-warning);
        }

        .outbreak-marker.medium .marker-pin {
          background-color: #D97706;
        }

        .clinic-pin {
          background-color: var(--status-info);
        }

        .lab-pin {
          background-color: var(--govt-forest);
        }

        .weather-pin {
          background-color: #F59E0B;
        }

        .marker-callout {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(18, 26, 33, 0.92);
          color: #FFFFFF;
          padding: 3px 8px;
          border-radius: 3px;
          font-size: 10.5px;
          white-space: nowrap;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
          margin-top: 3px;
          box-shadow: var(--shadow-sm);
        }

        .callout-code {
          font-size: 9px;
          color: #94A3B8;
          font-weight: 700;
        }

        .callout-name {
          font-weight: 600;
        }

        .callout-disease {
          font-size: 9.5px;
          color: #FCA5A5;
        }

        .marker-label-small {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.92);
          color: var(--text-primary);
          border: 1px solid var(--border-subtle);
          padding: 1px 5px;
          border-radius: 2px;
          font-size: 9.5px;
          font-weight: 600;
          white-space: nowrap;
          margin-top: 2px;
        }

        .pulse-fast {
          animation: pulse-ring 1.5s infinite;
        }

        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(185, 28, 28, 0.7); }
          70% { box-shadow: 0 0 0 12px rgba(185, 28, 28, 0); }
          100% { box-shadow: 0 0 0 0 rgba(185, 28, 28, 0); }
        }

        @media (max-width: 768px) {
          .gis-canvas-wrapper {
            height: 420px;
          }
          .marker-callout {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
