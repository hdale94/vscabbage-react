import { DetailedHTMLProps, InputHTMLAttributes, SVGProps } from "react";
import { useCabbageState } from "../hooks/useCabbageState";

interface RotarySliderProps {
	channel: string;
	paramIdx: number;
	inputProps?: InputHTMLAttributes<HTMLInputElement>;
	outerContainerProps?: DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>;
	svgContainerProps?: SVGProps<SVGSVGElement>;
	circleProps?: SVGProps<SVGCircleElement>;
}

const RotarySlider = ({
	channel,
	paramIdx,
	inputProps,
	outerContainerProps,
	svgContainerProps,
	circleProps,
}: RotarySliderProps) => {
	const { value, setValue, data } = useCabbageState<number>(channel, paramIdx);
	const valueAsNumber = value ?? 0;

	const min = data?.range?.min ?? 0;
	const max = data?.range?.max ?? 1;

	const diameter = 50; // Diameter of the outer circle
	const svgSize = diameter * 0.9; // Size of the SVG container
	const svgRadius = svgSize / 2;
	const circleRadius = 4; // Radius of the indicator circle

	// Calculate the angle based on the value
	const offset = 90;
	const availableRotationRange = 360 - offset;
	const angleInDegrees =
		(valueAsNumber / max) * availableRotationRange + offset / 2;

	// Calculate the circle position based on angle and the shrunk SVG size
	const calculateCirclePositions = (angleInDegrees: number) => {
		const angleInRadians = (angleInDegrees * Math.PI) / 180;
		return {
			x: svgRadius + (svgRadius - circleRadius) * Math.cos(angleInRadians),
			y: svgRadius + (svgRadius - circleRadius) * Math.sin(angleInRadians),
		};
	};

	const { x: circleX, y: circleY } = calculateCirclePositions(angleInDegrees);

	return (
		<div>
			<div
				{...outerContainerProps}
				style={{
					position: "relative",
					width: `${diameter}px`,
					height: `${diameter}px`,
					borderRadius: "50%",
					border: "5px solid rgb(147,210,0)",
					overflow: "hidden",
					backgroundColor: "white",
					...outerContainerProps?.style,
				}}
			>
				{/* SVG square container for circle */}
				<svg
					width={svgSize}
					height={svgSize}
					{...svgContainerProps}
					style={{
						position: "absolute",
						top: `${(diameter - svgSize) / 2}px`,
						left: `${(diameter - svgSize) / 2}px`,
						transform: "rotate(90deg)",
						...svgContainerProps?.style,
					}}
				>
					{/* Circle indicating current value*/}
					<circle
						cx={circleX}
						cy={circleY}
						r={circleRadius}
						fill="black"
						{...circleProps}
					/>
				</svg>
				{/* Slider input to control the progress */}
				<input
					type="range"
					min={min}
					max={max}
					step="0.01"
					value={value}
					onChange={(e) => setValue(e.target.valueAsNumber)}
					{...inputProps}
					style={{
						writingMode: "vertical-lr",
						rotate: "180deg",
						position: "absolute",
						width: "100%",
						height: "100%",
						left: "0",
						opacity: 0,
						...inputProps?.style,
					}}
				/>
			</div>

			{/* Displaying the value */}
			<p style={{ margin: 0, width: diameter + 10 }}>{value ?? 0}</p>
		</div>
	);
};

export default RotarySlider;
