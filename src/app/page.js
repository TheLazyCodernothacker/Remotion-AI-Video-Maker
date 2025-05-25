"use client";

import { Player } from "@remotion/player";
import { Main } from "../remotion/MyComp/Main";

export default function Home() {
  return (
    <div className="px-6 flex flex-col items-center">
      <Player
        component={Main}
        compositionWidth={1280}
        compositionHeight={720}
        durationInFrames={300}
        stye={{ transform: "!important scale(0.5)" }}
        fps={30}
        controls
        loop
      />
      <h1 className="text-blue-500">Welcome to the File Creator App</h1>
      <p>This app allows you to create files in the output/src directory.</p>
    </div>
  );
}
