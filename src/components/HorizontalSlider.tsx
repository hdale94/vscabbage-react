import { InputHTMLAttributes } from "react";
import { useCabbageState } from "../hooks/useCabbageState";

const HorizontalSlider = ({
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
					accentColor: "rgb(147,210,0)",
					...inputProps?.style,
				}}
			/>

			{/* Displaying the value */}
			<p style={{ margin: 0 }}>{value ?? 0}</p>
		</div>
	);
};

export default HorizontalSlider;
