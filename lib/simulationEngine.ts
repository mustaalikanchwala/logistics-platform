'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { SimulationState, SimPosition } from './types';

interface Waypoint {
  px: number;
  py: number;
  lat: number;
  lng: number;
}

interface UseDeliverySimulationOptions {
  waypoints: Waypoint[];
  /** ms per full route traversal (default 40 000 = 40s) */
  duration?: number;
  autoStart?: boolean;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Simulates a delivery vehicle moving along a polyline of waypoints.
 * Returns live position + progress state.
 */
export function useDeliverySimulation({
  waypoints,
  duration = 40_000,
  autoStart = true,
}: UseDeliverySimulationOptions) {
  const segments = waypoints.length - 1;

  const initialState: SimulationState = {
    position: {
      px: waypoints[0]?.px ?? 0,
      py: waypoints[0]?.py ?? 0,
      lat: waypoints[0]?.lat ?? 0,
      lng: waypoints[0]?.lng ?? 0,
    },
    progress: 0,
    currentSegment: 0,
    totalProgress: 0,
    completedStopIds: [],
    isRunning: autoStart,
  };

  const [state, setState] = useState<SimulationState>(initialState);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const isPausedRef = useRef(!autoStart);

  const tick = useCallback(
    (timestamp: number) => {
      if (isPausedRef.current) return;
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const totalProgress = Math.min(elapsed / duration, 1);

      // Map totalProgress to a specific segment + local progress
      const segmentFloat = totalProgress * segments;
      const currentSegment = Math.min(Math.floor(segmentFloat), segments - 1);
      const progress = segmentFloat - currentSegment; // 0-1 within segment

      const from = waypoints[currentSegment];
      const to = waypoints[currentSegment + 1] ?? waypoints[segments];

      const position: SimPosition = {
        px: lerp(from.px, to.px, progress),
        py: lerp(from.py, to.py, progress),
        lat: lerp(from.lat, to.lat, progress),
        lng: lerp(from.lng, to.lng, progress),
      };

      setState({
        position,
        progress,
        currentSegment,
        totalProgress,
        completedStopIds: [],
        isRunning: totalProgress < 1,
      });

      if (totalProgress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    },
    [waypoints, duration, segments]
  );

  useEffect(() => {
    if (autoStart) {
      isPausedRef.current = false;
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick, autoStart]);

  const pause = useCallback(() => {
    isPausedRef.current = true;
    setState((prev) => ({ ...prev, isRunning: false }));
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const resume = useCallback(() => {
    isPausedRef.current = false;
    startTimeRef.current = null; // will re-sync on next tick
    setState((prev) => ({ ...prev, isRunning: true }));
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const restart = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startTimeRef.current = null;
    isPausedRef.current = false;
    setState({
      ...initialState,
      isRunning: true,
    });
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]); // eslint-disable-line react-hooks/exhaustive-deps

  return { ...state, pause, resume, restart };
}
