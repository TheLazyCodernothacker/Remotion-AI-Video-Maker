import React from 'react';
import { Composition, AbsoluteFill, useCurrentFrame, interpolate, Easing, Img, useVideoConfig } from 'remotion';

export const Main = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const rotation = interpolate(
		frame,
		[0, 30, 60],
		[0, 360, 720],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.linear,
		}
	);

	const scale = interpolate(
		frame,
		[0, 15, 30, 45, 60],
		[1, 1.2, 0.8, 1.1, 1],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.elastic,
		}
	);

	const opacity = interpolate(
		frame,
		[0, 10, 50, 60],
		[0, 1, 1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.linear,
		}
	);

	const wobble = Math.sin(frame / (fps/4) * Math.PI) * 10;


	return (
		<AbsoluteFill className="flex items-center justify-center bg-red-500">
			<div
				style={{
					transform: `rotate(${rotation}deg) scale(${scale}) translateX(${wobble}px)`,
					opacity: opacity,
				}}
				className="relative"
			>
				<Img src="java_sucks.png"  style={{width: '800px', height: '600px'}}/>
				<AbsoluteFill className="flex items-center justify-center text-6xl font-extrabold text-white bg-black opacity-50">
					Why Java Sucks: The Brainrot Edition
				</AbsoluteFill>
			</div>

		</AbsoluteFill>
	);
};
