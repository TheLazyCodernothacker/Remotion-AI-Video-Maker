import React from 'react';
import { Intro } from './Intro';
import { Reason_1 } from './Reason_1';
import { Reason_2 } from './Reason_2';
import { Reason_3 } from './Reason_3';
import { Summary } from './Summary';
import { Ending } from './Ending';
import {Sequence} from 'remotion';
export const Main: React.FC = () => {
  return (
<>
<Sequence from={0} durationInFrames={300}>
  <Intro />
</Sequence>
<Sequence from={300} durationInFrames={450}>
  <Reason_1 />
</Sequence>
<Sequence from={750} durationInFrames={450}>
  <Reason_2 />
</Sequence>
<Sequence from={1200} durationInFrames={450}>
  <Reason_3 />
</Sequence>
<Sequence from={1650} durationInFrames={300}>
  <Summary />
</Sequence>
<Sequence from={1950} durationInFrames={240}>
  <Ending />
</Sequence>
</>
);
};
export const duration = 2190;