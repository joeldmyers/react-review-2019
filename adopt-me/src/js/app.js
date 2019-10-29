import React, { useState, lazy, Suspense } from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams";
import { Router, Link } from "@reach/router";
import ThemeContext from "./ThemeContext";

const Details = lazy(() => import("./Details"));

const App = () => {
  const themeHook = useState("peru");
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <header>
            <Link to="/">
              <h1 id="something-important">Adopt Me!</h1>
            </Link>
          </header>
          <Suspense fallback={<h1>loading route</h1>}>
            <Router>
              <SearchParams path="/" />
              <Details path="/details/:id" />
            </Router>
          </Suspense>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
