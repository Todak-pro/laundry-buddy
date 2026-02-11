
import { DetergentPoint, CalculationResult } from '../types';

/**
 * Linearly interpolates (or extrapolates) ML based on KG.
 */
export const calculateDetergentML = (kg: number, points: DetergentPoint[]): number => {
  if (points.length === 0) return 0;
  
  // Sort points by KG just in case
  const sorted = [...points].sort((a, b) => a.kg - b.kg);

  // If below minimum point
  if (kg <= sorted[0].kg) {
    const p1 = sorted[0];
    const p2 = sorted[1];
    const slope = (p2.ml - p1.ml) / (p2.kg - p1.kg);
    return Math.max(0, p1.ml - (p1.kg - kg) * slope);
  }

  // If above maximum point
  if (kg >= sorted[sorted.length - 1].kg) {
    const p1 = sorted[sorted.length - 2];
    const p2 = sorted[sorted.length - 1];
    const slope = (p2.ml - p1.ml) / (p2.kg - p1.kg);
    return p2.ml + (kg - p2.kg) * slope;
  }

  // Find segment for interpolation
  for (let i = 0; i < sorted.length - 1; i++) {
    if (kg >= sorted[i].kg && kg <= sorted[i + 1].kg) {
      const p1 = sorted[i];
      const p2 = sorted[i + 1];
      const weight = (kg - p1.kg) / (p2.kg - p1.kg);
      return p1.ml + weight * (p2.ml - p1.ml);
    }
  }

  return 0;
};

export const getDetergentResult = (kg: number, points: DetergentPoint[], capSize: number): CalculationResult => {
  const ml = calculateDetergentML(kg, points);
  const caps = ml / capSize;
  return { ml, caps };
};
