import React, { memo } from 'react';
import './untangible.scss';

import { UntangibleEntity } from '../game/arena';
import { Bomb } from '../game/bomb';
import { Explosion } from '../game/explosion';

function Untangible({ entity }: { entity: UntangibleEntity }) {
  if (entity instanceof Bomb) {
    return <div className='untangible bomb'></div>
  }

  if (entity instanceof Explosion) {
    return <div className='untangible explosion'></div>
  }

  return <></>
}

export default memo(Untangible);