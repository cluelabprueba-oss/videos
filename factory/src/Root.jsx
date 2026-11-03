import React from 'react';
import {Composition, registerRoot, staticFile, delayRender, continueRender} from 'remotion';
import {Video} from './Video.jsx';
const h=delayRender('fonts');
Promise.all([
 new FontFace('Permanent Marker',`url(${staticFile('PermanentMarker-Regular.ttf')})`).load(),
 new FontFace('Special Elite',`url(${staticFile('SpecialElite-Regular.ttf')})`).load(),
]).then(fs=>{fs.forEach(f=>document.fonts.add(f));continueRender(h);}).catch(e=>{console.error(e);continueRender(h);});
const Root=()=> <Composition id="Mystery" component={Video} width={1080} height={1920} fps={30} durationInFrames={1800}
  defaultProps={{spec:null,timing:null}}
  calculateMetadata={({props})=>({durationInFrames:Math.ceil(props.timing.total*30)})}/>;
registerRoot(Root);
