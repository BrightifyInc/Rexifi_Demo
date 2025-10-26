// src/assets/utils.d.ts
export interface PointData {
  idx: number;
  position: [number, number, number];
  color: string;
}

export declare const pointsInner: PointData[];
export declare const pointsOuter: PointData[];