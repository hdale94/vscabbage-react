import { useState, useEffect } from "react";

/**
 * Custom hook to get form data from Cabbage.
 * This hook listens for updates to form data via Cabbage and updates the local state
 * whenever new data is received.
 */
export const useGetCabbageFormData = () => {
	const [formData, setFormData] = useState<any>();

	// Sync form data with external updates from Cabbage
	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			const { data } = event;

			if (
				data.data &&
				data.channel === "MainForm" &&
				data.command === "widgetUpdate"
			) {
				setFormData(JSON.parse(data.data));
			}
		};

		window.addEventListener("message", handleMessage);

		return () => {
			window.removeEventListener("message", handleMessage);
		};
	}, []);

	return {
		data: formData,
	};
};
