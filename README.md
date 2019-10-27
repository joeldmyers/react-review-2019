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
