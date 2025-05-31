import files from "./FILEHANDLER";
import React from "react";
function Sequences() {
  let sum = 0;
  return files.map((file) => {
    const Component = file.name;

    return (
      <>
        <Sequence
          key={file.name.name}
          from={(sum += file.duration) - file.duration}
          durationInFrames={file.duration}
        >
          <Component />
        </Sequence>
      </>
    );
  });
}

import { Sequence } from "remotion";
export const Main: React.FC = () => {
  return (
    <>
      <Sequences />
    </>
  );
};
let a = 0;
files.forEach((file) => {
  a += file.duration;
});
export const duration = a || 300;
