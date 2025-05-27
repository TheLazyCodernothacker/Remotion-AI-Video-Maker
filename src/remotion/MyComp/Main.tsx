import {Sequence} from 'remotion';
import {Intro} from './Intro';
import {Ending} from './Ending';

export const Main: React.FC = () => {
  return (
    <>
      {/* Intro from frame 0 for 300 frames */}
      <Sequence from={0} durationInFrames={300}>
        <Intro />
      </Sequence>

      {/* Ending starts right after Intro */}
      <Sequence from={300} durationInFrames={240}>
        <Ending />
      </Sequence>
    </>
  );
};
