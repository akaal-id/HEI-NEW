"use client";
import { useEffect } from "react";

interface PerformanceMonitorProps {
  componentName: string;
  onLoadComplete?: () => void;
}

const PerformanceMonitor = ({ componentName, onLoadComplete }: PerformanceMonitorProps) => {
  useEffect(() => {
    const startTime = performance.now();
    
    const handleLoadComplete = () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      console.log(`${componentName} loaded in ${loadTime.toFixed(2)}ms`);
      
      if (onLoadComplete) {
        onLoadComplete();
      }
    };

    // Mark component as loaded when it mounts
    handleLoadComplete();

    return () => {
      // Cleanup if needed
    };
  }, [componentName, onLoadComplete]);

  return null;
};

export default PerformanceMonitor;
