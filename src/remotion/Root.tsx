import { Composition } from "remotion";
import { Main } from "./MyComp/Main";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        component={Main}
        durationInFrames={3600}
        fps={60}
        width={1280}
        height={720}
        id="MyComp"
        // defaultProps={defaultMyCompProps}
      />
    </>
  );
};
