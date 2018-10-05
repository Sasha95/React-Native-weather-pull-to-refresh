import React from "react";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { Provider } from "react-redux";
import configureStore from "./src/configureStore";
import App from "./src/App";

const store = configureStore();

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp, __DEV__ === true);
