import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from 'next/router'

import { registerTravel } from "../../redux/travel/travel.actions"
import { selectCurrentUser } from "../../redux/user/user.selectors";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import FormInput from "../form-input";
import CustomButton from "../custom-button";
import { searchPlanets, getTravelFormData, searchSpecies, planetContainsSpecie} from "../../api/swapi.api";

export default function TravelForm() {
  const currentUser = useSelector((state) => selectCurrentUser(state));
  const dispatch = useDispatch();

  const [passengerName, setPassengerName] = useState("");
  const [passengerSpecie, setPassengerSpecie] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const [species, setSpecies] = useState([]);
  const [starships, setStarships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [departurePlanets, setDeparturePlanets] = useState([]);
  const [destinationPlanets, setDestinationPlanets] = useState([]);

  const [departurePlanet, setDeparturePlanet] = useState("");
  const [destinationPlanet, setDestinationPlanet] = useState("");

  const [starship, setStarship] = useState("");
  let planetSearchInterval;
  let specieSeachInterval;

  useEffect(() => {
    getTravelFormData().then(data => {
      setDeparturePlanets(data.planets);
      setDestinationPlanets(data.planets);
      setSpecies(data.species);
      setStarships(data.starships);
      setStarship(data.starships[0].name);
      setIsLoading(false);
    });
  }, []);

  const searchSpecie = (query) => { 
    if (query) {
      setIsLoading(true)
      clearTimeout(specieSeachInterval);
      specieSeachInterval = setTimeout(() => {
        searchSpecies(query).then(species => {
          setSpecies(species);
          setPassengerSpecie(species);
        });
      
        setIsLoading(false);
      }, 2000);
    }
  }

  const setPlanetList = (data, source) => {
    if (source === "departure") {
      setDeparturePlanets(data);
      setDeparturePlanet(data);
      return;
    }

    setDestinationPlanets(data);
    setDestinationPlanet(data);
    return;
  }

  const searchPlanet = (query, source) => { 
    if (query) {
      setIsLoading(true)
      clearTimeout(planetSearchInterval);
      planetSearchInterval = setTimeout(() => {
        searchPlanets(query).then(planets => setPlanetList(planets, source))
        setIsLoading(false)
      }, 2000);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isDestinationAllowed = planetContainsSpecie(destinationPlanet[0], passengerSpecie[0]);

    if (!isDestinationAllowed) {
      alert("Destination not Allowed for your species");
      return;
    }

    try {
      if (currentUser === null) {
        Router.push("/signin");
      }

      // Create Firebase Account using the email and password
      const formData = {
        name: passengerName,
        specie: passengerSpecie[0].name,
        date: startDate,
        departurePlanet: departurePlanet[0],
        destinationPlanet: destinationPlanet[0],
        starship: starship
      };

      const trip = {
        uid: currentUser.uid,
        data: formData
      }
    
      dispatch(registerTravel(trip));
      Router.push("/trip-review");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="travel-form">
      <h2 className="title">Book your travel</h2>
      <span>Find every corner of the galaxy!</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="passengerName"
          value={passengerName}
          onChange={({ target }) => setPassengerName(target.value)}
          required
          label="Name"
        />
        <FormInput 
          name="species"
          list="species"
          onChange={({ target }) => searchSpecie(target.value)}
          required
          type="search"
          autoComplete="off"
          placeholder="Search species"
        />
          <datalist id="species">
            {species.map(specie => <option key={specie.name} value={specie.name}>{specie.name}</option>)}
          </datalist>
        <FormInput 
          name="departurePlanet"
          list="departurePlanet"
          onChange={({ target }) => searchPlanet(target.value, "departure")}
          required
          type="search"
          autoComplete="off"
          placeholder="Search departure planet"
        />
          <datalist id="departurePlanet">
            {departurePlanets.map(planet => <option key={planet.name} value={planet.name}>{planet.name}</option>)}
          </datalist>

        <FormInput 
          name="destinationPlanet"
          list="destinationPlanet"
          onChange={({ target }) => searchPlanet(target.value, "destination")}
          required
          type="search"
          autoComplete="off"
          placeholder="Search your destination planet"
        />
          <datalist id="destinationPlanet">
            {destinationPlanets.map(planet => <option key={planet.name} value={planet.name}>{planet.name}</option>)}
          </datalist>

      <label htmlFor="type">
        Select Starships
        <select
          name="starship"
          id="starship"
          required
          onChange={(({ target }) => setStarship(target.value))}
          className="select"
        >
          {starships.map(planet => <option key={planet.name} value={planet.name}>{planet.name}</option>)}
        </select>
      </label>
      <label htmlFor="type">
        Travel Date
        <div>
          <DatePicker className="select" selected={startDate} onChange={date => setStartDate(date)} />
        </div>
      </label>
        <CustomButton isLoading={isLoading} inverted type="submit">Submit</CustomButton>
      </form>
    </div>
  );
}
