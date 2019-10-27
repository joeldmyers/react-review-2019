# React Review 2019

This is a review of React as it stands in 2019, including latest features like hooks, effects, context, portals, by building a SPA that pulls data from an API about adopting pets, and allows the user to see additional details of the pets.

Following along on Brian Holt's class on FrontEndMasters - https://github.com/btholt/complete-intro-to-react-v5

Uses:

- Reach Router (not React Router)
- Parcel (instead of Webpack)

To generate a boilerplate HTML file in VS Code, type html:5 and hit tab.

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

useState example:

```
// useState returns an array with two values; we use destructuring to pull those off.
// the function takes in the initial value.
const [ location, setLocation ] = useState("New York, NY");

// then in our component we can do someting like
<input onChange={ setLocation( e => e.target.value )}>

```

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

### Strict Mode

We can wrap everything in <React.StrictMode></React.StrictMode> to enforce not using deprecated aspects of React.

### Reach router

Like React Router, but better for Accessibility generally. It handles focus better when moving around to different routes.

A cool trick is to do something like this -

```

const Details = props => {
  return (
    <pre>
      <code>{JSON.stringify(props, null, 4)}</code>
    </pre>
  );
};

```

It will show props which includes router details.

Like:

```

{
    "path": "/details/:id",
    "id": "1",
    "uri": "/details/1",
    "location": {
        "href": "http://localhost:1234/details/1",
        "ancestorOrigins": {},
        "origin": "http://localhost:1234",
        "protocol": "http:",
        "host": "localhost:1234",
        "hostname": "localhost",
        "port": "1234",
        "pathname": "/details/1",
        "search": "",
        "hash": "",
        "state": null,
        "key": "initial"
    }
}

```

We can also use React Dev Tools

### Props vs State

Props are passed down from parent components, and are immutable.

State is a self-contained state within the class that only works for class-based components.

### Minor note:

For here, use arrow functions to avoid `this` referring to the function etc. The arrow function does not create its own context, which is nice.

```
componentDidMount() {
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        loading: false
      });
    });
  }
```

### getDerivedStateFromProps -

Helpful when dealing with a lot of props, filtering across to pass into state:

```
static getDerivedStateFromProps({ media }) {
    // default image.
    let photos ['http://placecorgi.com/600/600'];
    if (media.length) {
      photos = media.map(({large}) => large);
    }

    return { photos }
  }
```

### Note on 'this'

To avoid having to bind this in our class components for functions, just use arrow functions.

### Error boundaries

We can have a wrapper that checks for errors and displays something more user-friendly.

This is useful so that people don't have to see the whole app crashing if there's an error.

I've included an error boundary component, which one could use to wrap the app or part of the app to ensure we handle crashing apps.

### Context

Context is trying to sort of fill what Redux does. It can create a global application state. It uses the useContext hook.

To use in a class component it looks like this:

```

import React, { Component } from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ThemeContext from "./ThemeContext";

class Details extends Component {
  // this is an experimental feature to avoid having to write out all the constructor(props) { super(props) etc.} stuff.
  state = {
    loading: true
  };

  componentDidMount() {
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading</h1>;
    }

    const { animal, breed, location, description, name, media } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {themeHook => (
              <button style={{ backgroundColor: themeHook[0] }}>
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;

```

To use in a functional component, use useContext from React,

### Portals
