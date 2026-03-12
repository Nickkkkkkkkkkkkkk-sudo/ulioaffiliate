import { useEffect, useRef } from "react";
import { NeatGradient } from "@firecms/neat";

const NeatBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientRef = useRef<NeatGradient | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    gradientRef.current = new NeatGradient({
      ref: canvasRef.current,
      colors: [
        { color: "#000000", enabled: true },
        { color: "#000000", enabled: true },
        { color: "#000000", enabled: true },
        { color: "#5000BF", enabled: true },
        { color: "#EE9B00", enabled: false },
      ],
      speed: 1.5,
      horizontalPressure: 5,
      verticalPressure: 7,
      waveFrequencyX: 2,
      waveFrequencyY: 2,
      waveAmplitude: 8,
      shadows: 5,
      highlights: 8,
      colorBrightness: 0.18,
      colorSaturation: 7,
      wireframe: false,
      colorBlending: 10,
      backgroundColor: "#000000",
      backgroundAlpha: 1,
      grainScale: 3,
      grainSparsity: 0,
      grainIntensity: 0.3,
      grainSpeed: 1,
      resolution: 1,
    });

    return () => {
      gradientRef.current?.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 w-full h-full"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default NeatBackground;
