import React from "react";
import { Intro, Intro_Duration } from "./Intro";
import { Basics, Basics_Duration } from "./Basics";
import { Layer_1, Layer_1_Duration } from "./Layer_1";
import { Layer_2, Layer_2_Duration } from "./Layer_2";
import { Layer_3, Layer_3_Duration } from "./Layer_3";
import { Outro, Outro_Duration } from "./Outro";
let files = [
  { name: Intro, duration: Intro_Duration },
  { name: Basics, duration: Basics_Duration },
  { name: Layer_1, duration: Layer_1_Duration },
  { name: Layer_2, duration: Layer_2_Duration },
  { name: Layer_3, duration: Layer_3_Duration },
  { name: Outro, duration: Outro_Duration },
];
export default files;
