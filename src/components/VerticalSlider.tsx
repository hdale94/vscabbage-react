import { InputHTMLAttributes } from "react";
import { useCabbageState } from "../hooks/useCabbageState";

const VerticalSlider = ({
	channel,
	paramIdx,
	inputProps,
}: {
	channel: string;
	paramIdx: number;
	inputProps?: InputHTMLAttributes<HTMLInputElement>;
}) => {
	const { value, setValue, data } = useCabbageState<number>(channel, paramIdx);

	return (
		<div>
			<input
				type="range"
				min={data?.range?.min ?? 0}
				max={data?.range?.max ?? 1}
				step={data?.range?.increment ?? 0.01}
				value={value}
				onChange={(e) => setValue(e.target.valueAsNumber)}
				{...inputProps}
				style={{
					rotate: "-90deg",
					accentColor: "rgb(147,210,0)",
					marginTop: "64px",
					...inputProps?.style,
				}}
			/>

			{/* Displaying the value */}
			<p style={{ marginTop: "48px" }}>{value ?? 0}</p>
		</div>
	);
};

export default VerticalSlider;
