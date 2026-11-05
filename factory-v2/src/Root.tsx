import React from 'react';
import {Composition} from 'remotion';
import {Episode, EpisodeProps} from './Episode';

export const Root: React.FC = () => (
  <Composition
    id="Episode"
    component={Episode as any}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={1800}
    defaultProps={{id: 'CL-0000', beats: [], subs: [], duration: 55, audio: ''} as EpisodeProps}
    calculateMetadata={({props}: any) => ({durationInFrames: Math.round(props.duration * 30)})}
  />
);
