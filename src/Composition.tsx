import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	staticValue,
	Sequence,
	Img,
	useReducedMotion,
} from 'remotion';
import { Typography, Grid, Paper } from '@material-ui/core';

// Remotion doesn't provide explicit Tailwind support out of the box
// so we're defining styles here.  Feel free to extend.

const Title = ({ children }) => {
	return (
		<Typography variant="h4" align="center" className="text-white font-bold">
			{children}
		</Typography>
	);
};

const BodyText = ({ children }) => {
	return (
		<Typography variant="body1" align="center" className="text-gray-300">
			{children}
		</Typography>
	);
};

const AnimatedScale = ({ children, startFrame, endFrame, scaleFrom = 0, scaleTo = 1 }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const scale = interpolate(
		frame,
		[startFrame, endFrame],
		[scaleFrom, scaleTo],
		{ extrapolationRight: 'clamp' }
	);

	return (
		<div style={{ transform: `scale(${scale})` }}>
			{children}
		</div>
	);
};

const AnimatedOpacity = ({ children, startFrame, endFrame, opacityFrom = 0, opacityTo = 1 }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const opacity = interpolate(
		frame,
		[startFrame, endFrame],
		[opacityFrom, opacityTo],
		{ extrapolationRight: 'clamp' }
	);

	return (
		<div style={{ opacity: opacity }}>
			{children}
		</div>
	);
};

const FrameCounter = () => {
	const frame = useCurrentFrame();
	return (
		<div style={{ position: 'absolute', top: 10, left: 10, color: 'white' }}>
			Frame: {frame}
		</div>
	);
};

const JavaSucksReasons = () => {
	return (
		<Grid container spacing={3} justifyContent="center" alignItems="center">
			<Grid item xs={12} md={6}>
				<AnimatedScale startFrame={50} endFrame={80}>
					<Paper className="p-4 bg-gray-800">
						<BodyText>
							Verbose syntax makes even simple tasks feel like climbing Mount Everest.
						</BodyText>
					</Paper>
				</AnimatedScale>
			</Grid>
			<Grid item xs={12} md={6}>
				<AnimatedScale startFrame={90} endFrame={120}>
					<Paper className="p-4 bg-gray-800">
						<BodyText>
							XML configuration hell!  Spring, Hibernate... so much boilerplate!
						</BodyText>
					</Paper>
				</AnimatedScale>
			</Grid>
			<Grid item xs={12} md={6}>
				<AnimatedScale startFrame={130} endFrame={160}>
					<Paper className="p-4 bg-gray-800">
						<BodyText>
							"Enterprise Java" often means over-engineered solutions to simple problems.
						</BodyText>
					</Paper>
				</AnimatedScale>
			</Grid>
			<Grid item xs={12} md={6}>
				<AnimatedScale startFrame={170} endFrame={200}>
					<Paper className="p-4 bg-gray-800">
						<BodyText>
							Don't even get started with multi-threading complexities.
						</BodyText>
					</Paper>
				</AnimatedScale>
			</Grid>
		</Grid>
	);
};

export const MyComposition = () => {
	const { width, height, durationInFrames } = useVideoConfig();
	const frame = useCurrentFrame();

	const opacity = interpolate(
		frame,
		[0, 30],
		[0, 1],
		{ extrapolationRight: 'clamp' }
	);

	return (
		<AbsoluteFill style={{ backgroundColor: '#222222', color: 'white', fontFamily: 'sans-serif' }}>
			{/* <FrameCounter /> */}
			<Sequence from={0} durationInFrames={30}>
				<AbsoluteFill style={{ opacity }}>
					<Title>Why Java is the WORST</Title>
				</AbsoluteFill>
			</Sequence>

			<Sequence from={30} durationInFrames={250}>
				<JavaSucksReasons />
			</Sequence>

			<Sequence from={280} durationInFrames={30}>
				<AbsoluteFill style={{ opacity: interpolate(frame, [280, 310], [1, 0], { extrapolationRight: 'clamp' }) }}>
					<Title>...Okay, maybe it's not *that* bad.</Title>
				</AbsoluteFill>
			</Sequence>

		</AbsoluteFill>
	);
};

export default MyComposition;
