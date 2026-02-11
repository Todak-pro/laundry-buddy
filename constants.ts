
import { DetergentInfo } from './types';

export const TOTAL_CAPACITY_KG = 16;
export const MAX_DIAL_LEVEL = 7;

export const DETERGENTS: DetergentInfo[] = [
  {
    id: 'actz',
    name: '액트 (Actz)',
    capSize: 50,
    color: 'bg-blue-500',
    points: [
      { kg: 5, ml: 42 },
      { kg: 7, ml: 68 },
      { kg: 10, ml: 78 }
    ]
  },
  {
    id: 'persil',
    name: '퍼실 (Persil)',
    capSize: 65,
    color: 'bg-green-500',
    points: [
      { kg: 3, ml: 20 },
      { kg: 5, ml: 45 },
      { kg: 7, ml: 65 },
      { kg: 10, ml: 90 }
    ]
  },
  {
    id: 'perwoll',
    name: '퍼울 (Perwoll)',
    capSize: 110,
    color: 'bg-purple-600',
    points: [
      { kg: 3, ml: 50 },
      { kg: 5, ml: 80 },
      { kg: 10, ml: 110 }
    ]
  }
];
