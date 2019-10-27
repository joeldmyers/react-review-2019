# React Review 2019

This is a review of React as it stands in 2019, including latest features like hooks, effects, context, portals.

To generate a boilerplate HTML file, type html:5 and hit tab.

## Notes:

example without JSX for reference:

```

import React from "react";
export default function Pet({ name, aimal, breed}) {
  return React.createElement("h1"), React.createElement("div", {}, [
    React.createElement("h1", {}, name),
    React.createElement("h2", {}, animal),
    React.createElement("h2", {}, breed)
  ]);
}

```

is the same as this with JSX:

```
import React from "react";
export default function Pet({ name, aimal, breed}) {
return (
  <div>
    <h1>{name}</h1>
    <h2>{animal}</h2>
    <h2>{breed}</h2>
  </div>
);
```

The JSX is syntactic sugar that, under the hood, is just running this createElement method.

## Notes on Hooks:

All hooks start with the word `use`

`useState` replaces old need for setState, and works inside functional components.

Never use hooks conditionally (in if or for loop).

### UseEffect

This replaces some of the lifecycles - componentDidMount, componentWillMount, componentDidUpdate, etc.

Use effect runs after every single re-render, which can include if it gets data back, causing an infinite chain of renders.

We need to declare what it specifically depends on to change.

Ex useEffect:

```
import React, {useEffects} from 'react';

const functionComponent = () => {
  // happens after initial dom render.  Good for API calls, for ex.
  useEffect( () => {
    // function we want to run here
  }, [variablesToListenTo, forChange]);  // dependency array that determines if useEffect is run.
}


```

If we want it to run only once, have an empty array; if we want it to run every time the component updates, leave off the array entirely.
