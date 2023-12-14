import { useEffect, useState } from "react";

const RandomPokemon = () => {
  const [pokemonName, setPokemonName] = useState();
  const [pokemonTypes, setPokemonTypes] = useState();
  const [pokemonImage, setPokemonImage] = useState();
  const [score, setScore] = useState(0);

  const generateRandom = async () => {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon-species/?limit=0"
    );
    const totalPokemon = await response.json();
    const randomNumber = Math.floor(Math.random() * totalPokemon.count);

    fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonName(data.name);
        setPokemonTypes(data.types);
        setPokemonImage(
          data["sprites"]["other"]["official-artwork"]["front_default"]
        );
      })
      .catch((e) => console.error(e.message));
  };

  const checkAnswer = (e) => {
    e.preventDefault();
    const answer = document.forms["guessingForm"]
    if (answer.elements["answer"].value.toLowerCase() === pokemonName.toLowerCase()) {
      setScore(score + 1);
    }
  };

  useEffect(() => {
    generateRandom();
  }, []);

  return (
    <div>
      {pokemonTypes && (
        <div className="container">
          <img src={pokemonImage} alt={pokemonName} className="pokemonImage" />
          <img
            src={window.location.origin + "/img/shadow.png"}
            alt="shadow"
            className="shadow"
          />
          {/* <h1 className="pokemonName">{pokemonName}</h1> */}
          <p>
            {pokemonTypes.map((type) => {
              return (
                <span className={type.type.name + " type"} key={type.type.name}>
                  {type.type.name.toUpperCase()}
                </span>
              );
            })}
          </p>
          <h1 id="score">Score: {score}</h1>
          <form name="guessingForm" onSubmit={checkAnswer}>
            <label htmlFor="answer">Guess the Pokemon!</label><br />
            <input type="text" name="answer" id="answer"/><br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      )}
    </div>
  );
};

export default RandomPokemon;
