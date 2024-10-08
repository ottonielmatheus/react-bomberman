import React, { useEffect, useState, useCallback } from 'react';
import './arena.scss';

import { Arena } from '../game/arena';
import { Player } from '../game/player';
import { Wall, WallType } from '../game/wall';
import { Bomb } from '../game/bomb';

import Tangible from './tangible';
import Untangible from './untangible';

const FPS = 30;

export const arena = new Arena(13, 13);

arena.addTangibleEntity(new Wall(WallType.Unbreakable, { x: 2, y: 2 }));
arena.addTangibleEntity(new Wall(WallType.Unbreakable, { x: 2, y: 10 }));
arena.addTangibleEntity(new Wall(WallType.Unbreakable, { x: 10, y: 2 }));
arena.addTangibleEntity(new Wall(WallType.Unbreakable, { x: 10, y: 10 }));

arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 3, y: 2 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 4, y: 2 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 5, y: 2 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 6, y: 2 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 7, y: 2 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 8, y: 2 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 9, y: 2 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 5, y: 1 }));

arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 2, y: 3 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 2, y: 4 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 2, y: 5 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 2, y: 6 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 2, y: 7 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 2, y: 8 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 2, y: 9 }));

arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 10, y: 3 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 10, y: 4 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 10, y: 5 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 10, y: 6 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 10, y: 7 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 10, y: 8 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 10, y: 9 }));

arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 3, y: 10 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 4, y: 10 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 5, y: 10 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 6, y: 10 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 7, y: 10 }));
arena.addTangibleEntity(new Wall(WallType.Breakable, { x: 8, y: 10 }));

const player = new Player(1, "#000", 3, { x: 7, y: 7 });

arena.addTangibleEntity(player);
arena.addUntangibleEntity(new Bomb(player, { x: 5, y: 5 }));

function ArenaBoard() {
  const [tick, setTick] = useState({});

  const bindKeyboard = useCallback((event: KeyboardEvent) => {
    if (event.key === player.keyboard.get('up')) {
      player.moveUp();
    }

    if (event.key === player.keyboard.get('down')) {
      player.moveDown();
    }

    if (event.key === player.keyboard.get('left')) {
      player.moveLeft();
    }

    if (event.key === player.keyboard.get('right')) {
      player.moveRight();
    }

    if (event.key === player.keyboard.get('drop')) {
      player.dropBomb();
    }
  }, []);

  useEffect(() => {
    const tickRate = setInterval(() => setTick({}), 1000 / FPS);
    document.addEventListener('keydown', bindKeyboard);

    return () => {
      clearInterval(tickRate);
      document.removeEventListener('keydown', bindKeyboard);
    }
  }, [tick, bindKeyboard]);

  return (
    <div className='container'>
      <div className='arena'>
        {
          arena.tangibleLayer.map((r, row) =>
            <div className='arena__row' key={row}>
              {
                r.map((_, col) =>
                  <div className='arena__row__column' onClick={() => console.log(row, col)} key={col}>
                    <Tangible entity={arena.tangibleLayer[row][col]}>
                      <Untangible entity={arena.untangibleLayer[row][col]} />
                    </Tangible>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  )
}


export default ArenaBoard;