export enum WallType {
  Unbreakable,
  Breakable
}

export interface IWall {
  type: WallType;
  position: {
    x: number;
    y: number;
  };
}

export class Wall implements IWall {
  type: WallType;
  position: { x: number; y: number; };

  constructor(type: WallType, position: { x: number; y: number; }) {
    this.type = type;
    this.position = position;
  }
}