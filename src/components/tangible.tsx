import React, { ReactNode, memo } from 'react';
import './tangible.scss';

import { TangibleEntity } from '../game/arena';
import { Player } from '../game/player';
import { Wall, WallType } from '../game/wall';

function Tangible({ entity, children }: { entity: TangibleEntity, children: ReactNode }) {
  if (entity instanceof Player) {
    return <div id={entity.id.toString()} style={{ backgroundColor: entity.color }} className='tangible'></div>
  }

  if (entity instanceof Wall) {
    if (entity.type === WallType.Breakable) {
      return <div className='tangible cube brekable-wall'>
        <div className='cube__face front'></div>
        <div className='cube__face top'></div>
      </div>
    }
    return <div className='tangible cube unbrekable-wall'>
    <div className='cube__face front'></div>
    <div className='cube__face top'></div>
  </div>
  }

  return <div className='tangible empty'>{children}</div>
}

export default memo(Tangible);