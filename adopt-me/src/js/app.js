import React from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams";
import { Router, Link } from "@reach/router";
import { Provider } from "react-redux";
import Details from "./Details";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <header>
          <Link to="/">
            <h1 id="something-important">Adopt Me!</h1>
          </Link>
        </header>

        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </Provider>
  );
};

render(<App />, document.getElementById("root"));
