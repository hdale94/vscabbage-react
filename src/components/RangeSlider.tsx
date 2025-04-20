import React, { useState, useRef, useEffect } from "react";
import { useCabbageState } from "../hooks/useCabbageState";

interface RangeSliderProps {
	channelStart: string;
	paramIdxStart: number;
	channelEnd: string;
	paramIdxEnd: number;
	width?: number;
	height?: number;
}

const RangeSlider = ({
	channelStart,
	paramIdxStart,
	channelEnd,
	paramIdxEnd,
	width = 200,
	height = 100,
}: RangeSliderProps) => {
	const {
		value: valueStart,
		setValue: setValueStart,
		data: startData,
	} = useCabbageState<number>(channelStart, paramIdxStart);
	const {
		value: valueEnd,
		setValue: setValueEnd,
		data: endData,
	} = useCabbageState<number>(channelEnd, paramIdxEnd);

	// Refs for the SVG elements
	const svgRef = useRef<SVGSVGElement | null>(null);
	const startHandleRef = useRef<SVGCircleElement | null>(null);
	const endHandleRef = useRef<SVGCircleElement | null>(null);

	// Mouse drag state
	const [dragging, setDragging] = useState<"start" | "end" | null>(null);

	const min = startData?.range?.min ?? 0;
	const max = endData?.range?.max ?? 1;

	const handleMouseDown = (
		e: React.MouseEvent<SVGCircleElement>,
		handle: "start" | "end"
	) => {
		setDragging(handle);
		e.preventDefault();
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (dragging) {
			const svg = svgRef.current;
			if (!svg) return;

			const svgRect = svg.getBoundingClientRect();
			const mouseX = e.clientX - svgRect.left;

			// Clamp the mouse position between 0 and the slider's width
			const clampedPosition = Math.max(0, Math.min(mouseX, width));
			const newValue = (clampedPosition / width) * (max - min) + min;

			if (dragging === "start" && newValue <= Number(valueEnd)) {
				setValueStart(newValue);
			} else if (dragging === "end" && newValue >= Number(valueStart)) {
				setValueEnd(newValue);
			}
		}
	};

	const handleMouseUp = () => {
		setDragging(null);
	};

	// Calculate the position of the handles based on the values
	const scaleValueToPosition = (value: number) => {
		return ((value - min) / (max - min)) * width;
	};

	// Attach mouse event listeners
	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, [dragging]);

	const startPosition = scaleValueToPosition(valueStart ?? min);
	const endPosition = scaleValueToPosition(valueEnd ?? max);

	return (
		<div>
			<svg
				ref={svgRef}
				width={width + 20} // Increase SVG width to accommodate handles
				height={height + 20} // Increase SVG height to accommodate handles
			>
				{/* Track (Line) */}
				<line
					x1={10} // Adjust to provide space for the left handle
					y1={width / 2 + 10} // Adjust to center vertically within the increased height
					x2={width + 10} // Increase width to accommodate handles on both sides
					y2={width / 2 + 10}
					stroke="#ddd"
					strokeWidth="8"
					strokeLinecap="round"
				/>
				{/* Start Handle */}
				<circle
					ref={startHandleRef}
					cx={startPosition + 10} // Shift handle position within new space
					cy={width / 2 + 10} // Adjust vertical position to center
					r="8"
					fill="#93d200"
					onMouseDown={(e) => handleMouseDown(e, "start")}
					onMouseEnter={() => (startHandleRef.current!.style.opacity = "1")}
					onMouseLeave={() => (startHandleRef.current!.style.opacity = "0.8")}
				/>
				{/* End Handle */}
				<circle
					ref={endHandleRef}
					cx={endPosition + 10} // Shift handle position within new space
					cy={width / 2 + 10} // Adjust vertical position to center
					r="8"
					fill="#93d200"
					onMouseDown={(e) => handleMouseDown(e, "end")}
					onMouseEnter={() => (endHandleRef.current!.style.opacity = "1")}
					onMouseLeave={() => (endHandleRef.current!.style.opacity = "0.8")}
				/>
			</svg>

			{/* Displaying the range */}
			<p style={{ margin: 0 }}>
				<span>
					{valueStart} - {valueEnd}
				</span>
			</p>
		</div>
	);
};

export default RangeSlider;
