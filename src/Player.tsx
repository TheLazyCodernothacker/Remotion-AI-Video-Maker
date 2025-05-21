import { Player } from "@remotion/player";
import MyComposition from "./Composition";

export const MyApp = () => {
  return (
    <Player
      component={MyComposition}
      durationInFrames={3600}
      fps={30}
      compositionWidth={1920}
      compositionHeight={1080}
      controls
      loop
      autoPlay
    />
  );
};
