# VSCabbage implementation with React

This example will show you how to synchronize a web UI with Cabbage. The project is made with Vite + React + Typescript.

There are examples of functional components (sliders) that implement the useCabbageState hook to get and set the channel values.

## Hooks

### useCabbageState

Sync a parameter with Cabbage. This hook listens for updates to a parameter value from Cabbage and sends updates to Cabbage when the parameter value changes locally (e.g., through a UI slider).

### useGetCabbageFormData

Get form data from Cabbage. This hook listens for updates to form data via Cabbage and updates the local state whenever new data is received.

## Commands

### Run project:

	yarn run dev

### Build project:

	yarn build

### Copy build into plugin folder

	cp ./dist/* C:/ProgramData/CabbageAudio/PluginName -Recurse -Force
