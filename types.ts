
export interface DetergentPoint {
  kg: number;
  ml: number;
}

export interface DetergentInfo {
  id: string;
  name: string;
  points: DetergentPoint[];
  capSize: number;
  color: string;
}

export interface CalculationResult {
  ml: number;
  caps: number;
}
