import { useEffect, useState } from "react";

const RandomPokemon = () => {
  const [pokemonName, setPokemonName] = useState();
  const [pokemonTypes, setPokemonTypes] = useState();
  const [pokemonImage, setPokemonImage] = useState();

  const generateRandom = async () => {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon-species/?limit=0"
    );
    const totalPokemon = await response.json()
    const randomNumber = Math.floor(Math.random() * totalPokemon.count);

    fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonName(data.name);
        setPokemonTypes(data.types);
        setPokemonImage(data["sprites"]["other"]["official-artwork"]["front_default"]);
        console.log(data);
      })
      .catch((e) => console.error(e.message));
  };

  useEffect(() => {
    generateRandom();
  }, []);

  return (
    <div>
      {pokemonTypes && (
        <div>
          <h1>{pokemonName}</h1>
          {pokemonTypes.map((type) => {
            return <p key={type.type.name}>{type.type.name}</p>;
          })}
          <img src={pokemonImage} alt={pokemonName} />
        </div>
      )}
    </div>
  );
};

export default RandomPokemon;
