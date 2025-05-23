// MIT License
// Copyright (c) 2024 rory Walsh
// See the LICENSE file for details.

console.log("Cabbage: loading cabbage.js");

export class Cabbage {
	/**
	 * Sends a parameter update message.
	 * @param {Object} message - The parameter update data.
	 * @param {Object|null} [vscode=null] - Optional VSCode API object for messaging.
	 */
	static sendParameterUpdate(message, vscode = null) {
		const msg = {
			command: "parameterChange",
			obj: JSON.stringify(message),
		};
		if (vscode !== null) {
			vscode.postMessage(msg);
		} else {
			console.log("Cabbage: sending parameter change from UI", msg);
			if (typeof IPlugSendMsg === "function") {
				IPlugSendMsg(msg);
			}
		}
	}

	/**
	 * Sends a custom command message.
	 * @param {string} command - The custom command.
	 * @param {Object|null} [vscode=null] - Optional VSCode API object for messaging.
	 */
	static sendCustomCommand(command, vscode = null) {
		const msg = {
			command: command,
			text: JSON.stringify({}),
		};
		console.log("Cabbage: sending custom command from UI", msg);
		if (vscode !== null) {
			vscode.postMessage(msg);
		} else {
			if (typeof IPlugSendMsg === "function") {
				IPlugSendMsg(msg);
			}
		}
	}

	/**
	 * Sends a widget update message.
	 * @param {Object} widget - The widget object containing properties.
	 * @param {Object|null} [vscode=null] - Optional VSCode API object for messaging.
	 */
	static sendWidgetUpdate(widget, vscode = null) {
		console.log("Cabbage: sending widget update from UI", widget.props);
		const msg = {
			command: "widgetStateUpdate",
			obj: JSON.stringify(widget.props),
		};
		if (vscode !== null) {
			vscode.postMessage(msg);
		} else {
			if (typeof IPlugSendMsg === "function") {
				IPlugSendMsg(msg);
			}
		}
	}

	/**
	 * Sends a MIDI message from the UI.
	 * @param {number} statusByte - MIDI status byte.
	 * @param {number} dataByte1 - First data byte.
	 * @param {number} dataByte2 - Second data byte.
	 * @param {Object|null} [vscode=null] - Optional VSCode API object for messaging.
	 */
	static sendMidiMessageFromUI(
		statusByte,
		dataByte1,
		dataByte2,
		vscode = null
	) {
		var message = {
			statusByte: statusByte,
			dataByte1: dataByte1,
			dataByte2: dataByte2,
		};
		const msg = {
			command: "midiMessage",
			obj: JSON.stringify(message),
		};
		console.log("Cabbage: sending midi message from UI", message);
		if (vscode !== null) {
			vscode.postMessage(msg);
		} else {
			if (typeof IPlugSendMsg === "function") {
				IPlugSendMsg(msg);
			}
		}
	}

	/**
	 * Handles incoming MIDI messages from the host.
	 * @param {number} statusByte - MIDI status byte.
	 * @param {number} dataByte1 - First data byte.
	 * @param {number} dataByte2 - Second data byte.
	 */
	static MidiMessageFromHost(statusByte, dataByte1, dataByte2) {
		console.log(
			"Cabbage: Got MIDI Message" +
				statusByte +
				":" +
				dataByte1 +
				":" +
				dataByte2
		);
	}

	/**
	 * Triggers a file open dialog.
	 * @param {Object} vscode - VSCode API object for messaging.
	 * @param {string} channel - The channel identifier.
	 */
	static triggerFileOpenDialog(vscode, channel) {
		var message = {
			channel: channel,
		};
		const msg = {
			command: "fileOpen",
			obj: JSON.stringify(message),
		};
		if (vscode !== null) {
			vscode.postMessage(msg);
		} else {
			if (typeof IPlugSendMsg === "function") {
				IPlugSendMsg(msg);
			}
		}
	}
}

function SPVFD(paramIdx, val) {
	//  console.log("Cabbage: paramIdx: " + paramIdx + " value:" + val);
	OnParamChange(paramIdx, val);
}

function SCVFD(ctrlTag, val) {
	OnControlChange(ctrlTag, val);
	//  console.log("Cabbage: SCVFD ctrlTag: " + ctrlTag + " value:" + val);
}

function SCMFD(ctrlTag, msgTag, msg) {
	//  var decodedData = window.atob(msg);
	console.log(
		"Cabbage: SCMFD ctrlTag: " + ctrlTag + " msgTag:" + msgTag + "msg:" + msg
	);
}

function SAMFD(msgTag, dataSize, msg) {
	//  var decodedData = window.atob(msg);
	console.log("Cabbage: SAMFD msgTag:" + msgTag + " msg:" + msg);
}

function SMMFD(statusByte, dataByte1, dataByte2) {
	console.log(
		"Cabbage: Got MIDI Message" + status + ":" + dataByte1 + ":" + dataByte2
	);
}

function SSMFD(offset, size, msg) {
	console.log("Cabbage: Got Sysex Message");
}

// FROM UI
// data should be a base64 encoded string
function SAMFUI(msgTag, ctrlTag = -1, data = 0) {
	var message = {
		msg: "SAMFUI",
		msgTag: msgTag,
		ctrlTag: ctrlTag,
		data: data,
	};

	IPlugSendMsg(message);
}

function SMMFUI(statusByte, dataByte1, dataByte2) {
	var message = {
		msg: "SMMFUI",
		statusByte: statusByte,
		dataByte1: dataByte1,
		dataByte2: dataByte2,
	};

	IPlugSendMsg(message);
}

// data should be a base64 encoded string
function SSMFUI(data = 0) {
	var message = {
		msg: "SSMFUI",
		data: data,
	};

	IPlugSendMsg(message);
}

function EPCFUI(paramIdx) {
	var message = {
		msg: "EPCFUI",
		paramIdx: paramIdx,
	};

	IPlugSendMsg(message);
}

function BPCFUI(paramIdx) {
	var message = {
		msg: "BPCFUI",
		paramIdx: paramIdx,
	};

	IPlugSendMsg(message);
}

function SPVFUI(paramIdx, value) {
	var message = {
		msg: "SPVFUI",
		paramIdx: paramIdx,
		value: value,
	};

	IPlugSendMsg(message);
}
