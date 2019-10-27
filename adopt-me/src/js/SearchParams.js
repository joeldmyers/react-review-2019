import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const SearchParams = () => {
  const [location, setLocation] = useState("San Francisco, CA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  function requestPets() {
    pet
      .animals({
        location,
        breed,
        type: animal
      })
      .then(({ animals }) => {
        setPets(animals || []);
      });
  }

  // schedules to run after - everything is rendered first, then
  // useEffect is run.  It's equivalent to componentDidMount, componentDidUpdate.
  useEffect(() => {
    // clear out the breed array and set the breed to the default value to reset it.
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(
      ({ breeds }) => {
        // returns an array of data, and then we pull the name off each one.
        const breedStrings = breeds.map(({ name }) => name);
        setBreeds(breedStrings);
      },
      // eslint-disable-next-line no-console
      e => console.error(e)
    );
  }, [animal, setBreed, setBreeds]); // this is the list of what specifically
  // React needs to check as to whether it has changed.
  //Otherwise it is checking for everything.

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={e => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            onBlur={e => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }} type="submit" value="submit">
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
