
import { Player } from './player';
import { Wall } from './wall';
import { Bomb } from './bomb';
import { Explosion } from './explosion';

export type TangibleEntity = Wall | Player | null;
export type UntangibleEntity = Bomb | Explosion | null;

export interface IArena {
  tangibleLayer: TangibleEntity[][];
  untangibleLayer: UntangibleEntity[][];
}

export class Arena implements IArena {
  tangibleLayer: TangibleEntity[][];
  untangibleLayer: UntangibleEntity[][];

  constructor(rows: number, columns: number) {
    this.tangibleLayer = [];
    this.untangibleLayer = [];

    for (let row = 0; row < rows; row++) {
      const tangibleRow = [];
      const untangibleRow = [];

      for (let column = 0; column < columns; column++) {
        tangibleRow.push(null);
        untangibleRow.push(null);
      }

      this.tangibleLayer.push(tangibleRow);
      this.untangibleLayer.push(untangibleRow);
    }
  }

  addTangibleEntity(tangible: TangibleEntity) {
    if (!tangible) {
      return;
    }

    this.tangibleLayer[tangible.position.y][tangible.position.x] = tangible;
  }

  addUntangibleEntity(untangible: UntangibleEntity) {
    if (!untangible) {
      return;
    }

    this.untangibleLayer[untangible.position.y][untangible.position.x] = untangible;
  }

  clearUntangibleEntity(position: { x: number; y: number; }) {
    this.untangibleLayer[position.y][position.x] = null;
  }

  clearTangibleEntity(position: { x: number; y: number; }) {
    this.tangibleLayer[position.y][position.x] = null;
  }
}