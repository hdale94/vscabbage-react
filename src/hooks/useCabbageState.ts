import { useState, useEffect } from "react";
import { Cabbage } from "../cabbage/cabbage.js";

/**
 * Custom hook to sync a parameter with Cabbage.
 * This hook listens for updates to a parameter value from Cabbage and
 * sends updates to Cabbage when the parameter value changes locally (e.g., through a UI slider).
 */
export const useCabbageState = <T>(channel: string, paramIdx: number) => {
	const [channelValue, setChannelValue] = useState<T>();
	const [channelData, setChannelData] = useState<any>();

	const handleValueChange = (newValue: T) => {
		setChannelValue(newValue);

		const msg = {
			paramIdx: paramIdx,
			channel: channel,
			value: newValue,
		};
		Cabbage.sendParameterUpdate(msg, null);
	};

	// Sync value with external updates (e.g., automation from a DAW)
	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			const { data } = event;

			if (data.channel !== channel) return;

			if (data.command === "widgetUpdate") {
				if (data.value) setChannelValue(data.value);
				if (data.data) setChannelData(JSON.parse(data.data));
			}
		};

		window.addEventListener("message", handleMessage);

		return () => {
			window.removeEventListener("message", handleMessage);
		};
	}, []);

	return {
		value: channelValue,
		setValue: handleValueChange,
		data: channelData,
	};
};
