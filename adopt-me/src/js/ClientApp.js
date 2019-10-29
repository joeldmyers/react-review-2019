// code that only runs in the browser.

import React from "react";
import { hydrate } from "react-dom";
import App from "./App";

hydrate(<App />, document.getElementById("root"));
