import React from 'react';
import {Composition} from 'remotion';
import {Main} from './Main';

export const Root: React.FC = () => (
  <Composition
    id="Main"
    component={Main as any}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={1800}
    defaultProps={{ep: null} as any}
    calculateMetadata={async ({props}: any) => ({
      durationInFrames: Math.round((props.ep?.dur ?? 55) * 30),
    })}
  />
);
