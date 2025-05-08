# VSCabbage React

This project provides hooks that allow you to synchronize [vscabbage](https://github.com/rorywalsh/vscabbage) with [React](https://github.com/facebook/react).

An example of implementation can be found [here](https://github.com/hdale94/vscabbage-react-example).

## Install

    yarn add vscabbage-react

## Hooks

### useCabbageState

Sync a parameter with Cabbage. This hook listens for updates to a parameter value from Cabbage and sends updates to Cabbage when the parameter value changes locally (e.g., through a UI slider).

### useGetCabbageFormData

Get form data from Cabbage. This hook listens for updates to form data via Cabbage and updates the local state whenever new data is received.
