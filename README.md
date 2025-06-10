This is the Remotion AI Video Maker powered by Gemini API

1. Getting started

Start by installing the packages:

```
npm i
```

Then run these two commands:

```
npm run remotion
npm run dev
```

The first one starts the video server, and the second starts the frontend where you'll make the video

1. Making the video

On the frontend generate an outline, and then it will create each section with a default prompt

Afterwards for each section you can use that prompt or edit it to generate that video section.

Finally you can constantly give suggestions until you are satisfied with the section.

1. More details

If the video section has a bug and it makes it so you can't give suggestions to fix it, either go to /api/reset/ and if that doesn't work then run:

```
npm run reset
```

and yay.