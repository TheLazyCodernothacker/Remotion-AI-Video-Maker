import { reset } from "./FileSystem.js";
reset()
  .then(() => {
    console.log("Reset completed successfully.");
  })
  .catch((error) => {
    console.error("Error during reset:", error);
  });
