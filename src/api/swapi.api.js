import axios from "axios";

const baseApiUrl = "https://swapi.dev/api";

export async function getPlanets() {
  const planets = await axios.get(`${baseApiUrl}/planets`);
  return planets.data.results;
}

export async function searchPlanets(query) {
  const planets = await axios.get(`${baseApiUrl}/planets/?search=${query}`);
  return planets.data.results;
}

export async function getSpecies() {
  const species = await axios.get(`${baseApiUrl}/species`);
  return species.data.results;
}

export async function searchSpecies(query) {
  const species = await axios.get(`${baseApiUrl}/species/?search=${query}`);
  return species.data.results;
}

function filterStarships(ships) {
  return ships.filter(
    (ship) => !ship.manufacturer.toLowerCase().includes("military"),
  );
}
// BIG O(n)
// Performance improved using hashmap
export function planetContainsSpecie(planet, specie) {
  let planetHasSpecie = false;
  const hashMap = {};
  planet.residents.map((resident) => (hashMap[resident] = true));

  specie.people.some((people) => {
    if (hashMap.hasOwnProperty(people)) {
      planetHasSpecie = true;
      return true;
    }
  });

  return planetHasSpecie;
}

/**
 * @name getTravelFormData
 * @description travel form initial data for selects and datalists
 * @async
 * @return Object - species planets and starships
 */
export async function getTravelFormData() {
  const [species, planets, ships] = await Promise.all([
    axios.get(`${baseApiUrl}/species`),
    axios.get(`${baseApiUrl}/planets`),
    axios.get(`${baseApiUrl}/starships`),
  ]);

  const starships = filterStarships(ships.data.results);

  const data = {
    species: species.data.results,
    planets: planets.data.results,
    starships: starships,
  };

  return data;
}
