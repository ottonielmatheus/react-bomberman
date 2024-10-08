import { Player } from './player';
import { Explosion, ExplosionDirection } from './explosion';

const TIME_TO_EXPLODE = 2000;

export interface IBomb {
  player: Player;
  position: {
    x: number;
    y: number;
  }
}

export class Bomb implements IBomb {
  player: Player;
  explodeId: NodeJS.Timeout;
  position: {
    x: number;
    y: number;
  };

  constructor(player: Player, position: { x: number; y: number; }) {
    this.player = player;
    this.position = Object.assign({}, position);
    this.explodeId = setTimeout(() => this.explode(), TIME_TO_EXPLODE);
  }

  explode() {
    clearTimeout(this.explodeId);
    const up = { x: this.position.x, y: this.position.y - 1 };
    const down = { x: this.position.x, y: this.position.y + 1 };
    const left = { x: this.position.x - 1, y: this.position.y };
    const right = { x: this.position.x + 1, y: this.position.y };

    new Explosion(this, this.player.range - 1, ExplosionDirection.Self, this.position);
    if (Explosion.canSpread(up)) new Explosion(this, this.player.range, ExplosionDirection.Up, up);
    if (Explosion.canSpread(down)) new Explosion(this, this.player.range, ExplosionDirection.Down, down);
    if (Explosion.canSpread(left)) new Explosion(this, this.player.range, ExplosionDirection.Left, left);
    if (Explosion.canSpread(right)) new Explosion(this, this.player.range, ExplosionDirection.Right, right);
  }
}