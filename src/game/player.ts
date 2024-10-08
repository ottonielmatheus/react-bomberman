import { Bomb } from "./bomb";
import { Wall } from "./wall";

import { arena } from "../components/arena";

export interface IPlayer {
  id: number;
  color: string;
  keyboard: Map<string, string>;
  position: {
    x: number;
    y: number;
  };
  range: number;
  died: boolean;
}

export class Player implements IPlayer {
  id: number;
  color: string;
  range: number;
  died: boolean;
  position: { x: number; y: number; };
  keyboard: Map<string, string>;

  constructor(
      id: number,
      color: string,
      range: number,
      position: { x: number; y: number; }
    ) {
    this.id = id;
    this.color = color;
    this.range = range;
    this.position = position;
    this.keyboard = new Map<string, string>();
    this.died = false;

    this.setKeyboard({
      up: 'w',
      down: 's',
      left: 'a',
      right: 'd',
      drop: ' '
    });
  }

  setKeyboard(binds: Record<string, string>) {
    for (const [action, key] of Object.entries(binds)) {
      this.keyboard.set(action, key);
    }
  }

  moveUp() {
    if (this.canMove(this.position.y - 1, this.position.x)) {
      arena.clearTangibleEntity(this.position);
      this.position.y--;
      arena.addTangibleEntity(this);
    }
  }

  moveDown() {
    if (this.canMove(this.position.y + 1, this.position.x)) {
      arena.clearTangibleEntity(this.position);
      this.position.y++;
      arena.addTangibleEntity(this);
    }
  }

  moveLeft() {
    if (this.canMove(this.position.y, this.position.x - 1)) {
      arena.clearTangibleEntity(this.position);
      this.position.x--;
      arena.addTangibleEntity(this);
    }
  }

  moveRight() {
    if (this.canMove(this.position.y, this.position.x + 1)) {
      arena.clearTangibleEntity(this.position);
      this.position.x++;
      arena.addTangibleEntity(this);
    }
  }

  canMove(futureX: number, futureY: number) {
    if (this.died) {
      return false;
    }

    if (arena.tangibleLayer[futureX]?.[futureY] === undefined) {
      return false;
    }

    if (arena.tangibleLayer[futureX]?.[futureY] instanceof Wall) {
      return false;
    }

    if (arena.untangibleLayer[futureX]?.[futureY] instanceof Bomb) {
      return false;
    }

    return true;
  }

  dropBomb() {
    arena.addUntangibleEntity(new Bomb(this, this.position));
  }

  die() {
    console.log('you died');
    this.died = true;
    delete arena.tangibleLayer[this.position.y][this.position.x];
    arena.clearTangibleEntity(this.position);
  }
}