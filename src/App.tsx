import "./App.css";
import RangeSlider from "./components/RangeSlider";
import RotarySlider from "./components/RotarySlider";
import VerticalSlider from "./components/VerticalSlider";
import { useGetCabbageFormData } from "./hooks/useGetCabbageFormData";

function App() {
	const { data: formData } = useGetCabbageFormData();

	return (
		<div
			style={{
				width: formData?.size?.width ?? 580,
				height: formData?.size?.height ?? 500,
			}}
		>
			<VerticalSlider channel={"gainL1"} paramIdx={0} />
			<RotarySlider channel={"gainR1"} paramIdx={1} />
			<RangeSlider
				channelStart={"gainL2"}
				paramIdxStart={2}
				channelEnd={"gainR2"}
				paramIdxEnd={3}
			/>
		</div>
	);
}

export default App;
