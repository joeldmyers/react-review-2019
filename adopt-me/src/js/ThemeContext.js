import { createContext } from "react";
// passing a hook in here, it is passing initial state, and a function
const ThemeContext = createContext(["green", () => {}]);

export default ThemeContext;
