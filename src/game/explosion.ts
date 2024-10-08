import { Bomb } from './bomb';
import { Player } from './player';
import { arena } from '../components/arena';
import { Wall, WallType } from './wall';
import { TangibleEntity } from './arena';

const EXPLOSION_DURATION = 250;

export enum ExplosionDirection {
  Up,
  Down,
  Left,
  Right,
  Self
}

export interface IExplosion {
  bomb: Bomb;
  fireId: NodeJS.Timeout;
  direction: ExplosionDirection;
  range: number;
  position: {
    x: number;
    y: number;
  };
}

export class Explosion implements IExplosion {
  bomb: Bomb;
  fireId: NodeJS.Timeout;
  direction: ExplosionDirection;
  range: number;
  position: {
    x: number;
    y: number;
  };

  constructor(bomb: Bomb, range: number, direction: ExplosionDirection, position: { x: number; y: number; }) {
    this.bomb = bomb;
    this.position = Object.assign({}, position);
    this.direction = direction;
    this.range = range - 1;
    this.fireId = setTimeout(() => arena.clearUntangibleEntity(position), EXPLOSION_DURATION);

    const tangibleEntity = arena.tangibleLayer[position.y]?.[position.x];
    const untangibleEntity = arena.untangibleLayer[position.y]?.[position.x];

    if (tangibleEntity instanceof Player) {
      const player = tangibleEntity as Player;
      player.die();
    }

    if (untangibleEntity instanceof Bomb && untangibleEntity !== bomb) {
      const bomb = untangibleEntity as Bomb;
      bomb.explode();
    }

    if (tangibleEntity instanceof Wall) {
      const wall = tangibleEntity as Wall;
      if (wall.type === WallType.Breakable) {
        arena.clearTangibleEntity(position);
      }
    }

    if (untangibleEntity instanceof Explosion) {
      const explosion = untangibleEntity as Explosion;
      clearTimeout(explosion.fireId);
    }

    arena.addUntangibleEntity(this);

    if (direction !== ExplosionDirection.Self && range > 0) {
      this.spread(tangibleEntity);
    }
  }

  spread(previousExploded: TangibleEntity) {
    const nextPosition = Explosion.getNextPosition(this.direction, this.position);
    if (!Explosion.canSpread(nextPosition)) return;
    if (previousExploded instanceof Wall) return;
    new Explosion(this.bomb, this.range, this.direction, nextPosition);
  }

  private static getNextPosition(direction: ExplosionDirection, position: { x: number; y: number; }) {
    switch (direction) {
      case ExplosionDirection.Up:
        return { x: position.x, y: position.y - 1 };
      case ExplosionDirection.Down:
        return { x: position.x, y: position.y + 1 };
      case ExplosionDirection.Left:
        return { x: position.x - 1, y: position.y };
      case ExplosionDirection.Right:
        return { x: position.x + 1, y: position.y };
      default:
        return position;
    }
  }

  static canSpread(position: { x: number; y: number; }) {
    const nextTangibleEntity = arena.tangibleLayer[position.y]?.[position.x];
    if (nextTangibleEntity === undefined) return false;
    if (nextTangibleEntity instanceof Wall && nextTangibleEntity.type === WallType.Unbreakable) return false;
    return true;
  }
}