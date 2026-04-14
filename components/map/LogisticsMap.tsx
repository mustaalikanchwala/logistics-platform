'use client';

import React, { useEffect, useRef } from 'react';
import { useDeliverySimulation } from '@/lib/simulationEngine';

// ─── Map constants ────────────────────────────────────────────────────────────
const W = 800;
const H = 500;

interface Marker {
  px: number;
  py: number;
  type: 'pickup' | 'drop' | 'partner' | 'depot';
  label: string;
  highlighted?: boolean;
}

interface Props {
  waypoints: { px: number; py: number; lat: number; lng: number }[];
  markers: Marker[];
  /** If provided, only this stop is fully visible — others dim */
  highlightStopLabel?: string;
  showPartner?: boolean;
  /** Animation duration in ms */
  duration?: number;
  className?: string;
  /** Called each frame with totalProgress 0-1 */
  onProgress?: (progress: number, segment: number) => void;
}

// Mumbai-ish street grid lines (rough approximations in SVG pixel space)
const GRID_LINES = [
  // Horizontal (latitude bands)
  { x1: 0, y1: 460, x2: 800, y2: 460 },
  { x1: 0, y1: 420, x2: 800, y2: 420 },
  { x1: 0, y1: 370, x2: 800, y2: 370 },
  { x1: 0, y1: 320, x2: 800, y2: 320 },
  { x1: 0, y1: 280, x2: 800, y2: 280 },
  { x1: 0, y1: 240, x2: 800, y2: 240 },
  { x1: 0, y1: 200, x2: 800, y2: 200 },
  { x1: 0, y1: 160, x2: 800, y2: 160 },
  { x1: 0, y1: 120, x2: 800, y2: 120 },
  { x1: 0, y1: 80,  x2: 800, y2: 80  },
  // Vertical (longitude bands)
  { x1: 100, y1: 0, x2: 100, y2: 500 },
  { x1: 160, y1: 0, x2: 160, y2: 500 },
  { x1: 220, y1: 0, x2: 220, y2: 500 },
  { x1: 280, y1: 0, x2: 280, y2: 500 },
  { x1: 340, y1: 0, x2: 340, y2: 500 },
  { x1: 400, y1: 0, x2: 400, y2: 500 },
  { x1: 460, y1: 0, x2: 460, y2: 500 },
  { x1: 520, y1: 0, x2: 520, y2: 500 },
  { x1: 580, y1: 0, x2: 580, y2: 500 },
  { x1: 640, y1: 0, x2: 640, y2: 500 },
  { x1: 700, y1: 0, x2: 700, y2: 500 },
];

// Labelled roads
const ROAD_LABELS = [
  { x: 20, y: 275, label: 'Western Express Hwy', angle: -90 },
  { x: 20, y: 180, label: 'Link Road', angle: -90 },
  { x: 100, y: 490, label: 'Swami Vivekananda Rd' },
  { x: 350, y: 490, label: 'S.V. Road' },
];

// Mumbai coastline (west side sea)
const COASTLINE_PATH = 'M 0,500 L 0,460 L 30,430 L 60,390 L 50,350 L 80,310 L 70,260 L 100,220 L 90,170 L 120,130 L 110,90 L 140,50 L 160,0 L 0,0 Z';

export default function LogisticsMap({
  waypoints,
  markers,
  highlightStopLabel,
  showPartner = true,
  duration = 60_000,
  className = '',
  onProgress,
}: Props) {
  const sim = useDeliverySimulation({ waypoints, duration, autoStart: showPartner });

  // Store callback in ref to avoid stale closure without adding it to dep array
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  useEffect(() => {
    if (onProgressRef.current) {
      onProgressRef.current(sim.totalProgress, sim.currentSegment);
    }
  }, [sim.totalProgress, sim.currentSegment]);

  // Build polyline path string
  const polylinePoints = waypoints.map((w) => `${w.px},${w.py}`).join(' ');

  // Completed part of route
  const completedPoints = waypoints
    .slice(0, sim.currentSegment + 1)
    .concat([{ px: sim.position.px, py: sim.position.py, lat: 0, lng: 0 }])
    .map((w) => `${w.px},${w.py}`)
    .join(' ');

  return (
    <div className={`logistics-map ${className}`}>
      {/* Map label */}
      <div className="map-chip">
        <span className="map-dot" />
        Mumbai Metro Region
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="map-svg"
        aria-label="Logistics Route Map"
      >
        <defs>
          {/* Sea gradient */}
          <linearGradient id="seaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9E8F5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E8F4FD" stopOpacity="0.3" />
          </linearGradient>
          {/* Route glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Van shadow */}
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00000040" />
          </filter>
          {/* Pulse animation */}
          <radialGradient id="pulseGrad">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background */}
        <rect width={W} height={H} fill="#EEF2F7" />

        {/* Sea */}
        <path d={COASTLINE_PATH} fill="url(#seaGrad)" />
        <text x="25" y="300" fill="#7BBCD5" fontSize="10" fontFamily="Inter, sans-serif" opacity="0.7">Arabian Sea</text>

        {/* Street grid */}
        {GRID_LINES.map((l, i) => (
          <line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="#D1D9E6"
            strokeWidth="1"
          />
        ))}

        {/* Main roads (thicker) */}
        <line x1="200" y1="0" x2="200" y2="500" stroke="#C5CFE0" strokeWidth="2.5" />
        <line x1="260" y1="0" x2="260" y2="500" stroke="#C5CFE0" strokeWidth="2.5" />
        <line x1="0" y1="300" x2="800" y2="300" stroke="#C5CFE0" strokeWidth="2" />
        <line x1="0" y1="240" x2="800" y2="240" stroke="#C5CFE0" strokeWidth="2" />

        {/* Route polyline — dashed (planned) */}
        {waypoints.length > 1 && (
          <polyline
            points={polylinePoints}
            fill="none"
            stroke="#6366F1"
            strokeWidth="2.5"
            strokeDasharray="8 6"
            opacity="0.35"
          />
        )}

        {/* Completed route — solid + glowing */}
        {waypoints.length > 1 && sim.totalProgress > 0 && (
          <polyline
            points={completedPoints}
            fill="none"
            stroke="#059669"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            opacity="0.85"
          />
        )}

        {/* Stop markers */}
        {markers.map((m, i) => {
          const isDimmed = highlightStopLabel && m.label !== highlightStopLabel;
          const color =
            m.type === 'pickup' ? '#EA580C' :
            m.type === 'drop' ? '#7C3AED' :
            m.type === 'depot' ? '#1D4ED8' : '#059669';

          return (
            <g key={i} opacity={isDimmed ? 0.25 : 1}>
              {/* Outer ring */}
              <circle cx={m.px} cy={m.py} r={m.highlighted ? 18 : 14} fill={color} opacity="0.15" />
              {/* Main circle */}
              <circle cx={m.px} cy={m.py} r={m.highlighted ? 10 : 8} fill={color} />
              {/* Icon text */}
              <text
                x={m.px} y={m.py + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fill="white"
                fontWeight="bold"
                fontFamily="Inter, sans-serif"
              >
                {m.type === 'pickup' ? 'P' : m.type === 'drop' ? 'D' : '●'}
              </text>
              {/* Label */}
              <rect
                x={m.px - 36} y={m.py + 13}
                width="72" height="16"
                rx="4"
                fill={color}
                opacity="0.92"
              />
              <text
                x={m.px} y={m.py + 22}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="8.5"
                fill="white"
                fontFamily="Inter, sans-serif"
              >
                {m.label.length > 12 ? m.label.slice(0, 12) + '…' : m.label}
              </text>
            </g>
          );
        })}

        {/* Delivery partner (animated vehicle) */}
        {showPartner && (
          <g transform={`translate(${sim.position.px}, ${sim.position.py})`}>
            {/* Pulse ring */}
            <circle cx="0" cy="0" r="20" fill="#059669" opacity="0.15">
              <animate attributeName="r" values="14;24;14" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Vehicle body */}
            <g filter="url(#shadow)">
              <rect x="-14" y="-9" width="28" height="18" rx="5" fill="#059669" />
              <rect x="-11" y="-6" width="10" height="8" rx="2" fill="#A7F3D0" opacity="0.8" />
              <rect x="1" y="-6" width="8" height="8" rx="2" fill="#A7F3D0" opacity="0.8" />
              {/* Wheels */}
              <circle cx="-8" cy="9" r="3.5" fill="#065F46" />
              <circle cx="8" cy="9" r="3.5" fill="#065F46" />
            </g>
          </g>
        )}

        {/* Compass */}
        <g transform="translate(760, 30)">
          <circle cx="0" cy="0" r="20" fill="white" opacity="0.85" />
          <text x="0" y="-8" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1E3A5F" fontFamily="Inter, sans-serif">N</text>
          <text x="0" y="12" textAnchor="middle" fontSize="9" fill="#6B7280" fontFamily="Inter, sans-serif">S</text>
          <text x="12" y="3" textAnchor="middle" fontSize="9" fill="#6B7280" fontFamily="Inter, sans-serif">E</text>
          <text x="-12" y="3" textAnchor="middle" fontSize="9" fill="#6B7280" fontFamily="Inter, sans-serif">W</text>
          <polygon points="0,-14 4,0 0,-4 -4,0" fill="#EF4444" />
        </g>

        {/* Scale bar */}
        <g transform="translate(30, 470)">
          <line x1="0" y1="0" x2="60" y2="0" stroke="#6B7280" strokeWidth="1.5" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#6B7280" strokeWidth="1.5" />
          <line x1="60" y1="-3" x2="60" y2="3" stroke="#6B7280" strokeWidth="1.5" />
          <text x="30" y="-6" textAnchor="middle" fontSize="9" fill="#6B7280" fontFamily="Inter, sans-serif">~3 km</text>
        </g>

        {/* Legend */}
        <g transform="translate(600, 15)">
          <rect x="0" y="0" width="190" height="75" rx="6" fill="white" opacity="0.9" />
          <circle cx="14" cy="14" r="6" fill="#EA580C" />
          <text x="25" y="18" fontSize="10" fill="#374151" fontFamily="Inter, sans-serif">Pickup (Vendor)</text>
          <circle cx="14" cy="32" r="6" fill="#7C3AED" />
          <text x="25" y="36" fontSize="10" fill="#374151" fontFamily="Inter, sans-serif">Drop (Shopkeeper)</text>
          <rect x="8" y="44" width="12" height="8" rx="2" fill="#059669" />
          <text x="25" y="52" fontSize="10" fill="#374151" fontFamily="Inter, sans-serif">Delivery Partner</text>
          <line x1="8" y1="64" x2="20" y2="64" stroke="#059669" strokeWidth="2.5" />
          <text x="25" y="68" fontSize="10" fill="#374151" fontFamily="Inter, sans-serif">Completed Path</text>
        </g>
      </svg>

      {/* Progress bar */}
      {showPartner && (
        <div className="map-progress-bar">
          <div
            className="map-progress-fill"
            style={{ width: `${sim.totalProgress * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}
