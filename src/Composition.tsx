import React from 'react';
import { Composition, useCurrentFrame, useVideoConfig, AbsoluteFill, Easing, interpolate, Img } from 'remotion';
import { Typography } from '@mui/material';

export default function MyComposition() {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const scale = interpolate(
    frame,
    [0, 30],
    [0, 1.2],
    {
      extrapolateLeft: 'clampEnd',
      extrapolateRight: 'clampEnd',
      easing: Easing.easeOut(Easing.elastic(1.5)),
    }
  );

  const rotate = interpolate(
    frame,
    [0, 30],
    [0, 360 * 3],
    {
      extrapolateLeft: 'clampEnd',
      extrapolateRight: 'clampEnd',
      easing: Easing.linear,
    }
  );
    const opacity = interpolate(
      frame,
      [0, 15, 30],
      [0, 1, 0],
      {
          extrapolateLeft: "clampEnd",
          extrapolateRight: "clampStart"
      }
  )

  return (
    <AbsoluteFill style={{ backgroundColor: '#F00000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <AbsoluteFill style={{opacity}}>
      <div style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}>
        <Img src="https://i.kym-cdn.com/photos/images/newsfeed/002/414/779/d9f.jpg" style={{ width: 300, height: 300, objectFit: 'contain' }} />
      </div>
      </AbsoluteFill>
      <Typography variant="h2" style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Arial', textShadow: '2px 2px 4px #000000', position: 'absolute', top: 20, left: 20}}>
        Why Java Sucks (Brainrot Edition)
      </Typography>
    </AbsoluteFill>
  );
}
