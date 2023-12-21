import { useState } from "react";

const RandomPokemon = () => {
  const [pokemonName, setPokemonName] = useState();
  const [pokemonTypes, setPokemonTypes] = useState();
  const [pokemonImage, setPokemonImage] = useState();
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [lives, setLives] = useState();
  const [gamePlayed, setGamePlayed] = useState(false);

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const startGame = () => {
    setScore(0);
    setGameStarted(true);
    generateRandom();
    setLives(3);
  };

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

  const gameOver = () => {
    setGamePlayed(true);
    setGameStarted(false);
  };

  const removeLife = () => {
    if (lives === 1) return gameOver();
    setLives(lives - 1);
    let life = document.querySelector(`#lives img:nth-child(${lives})`);
    life.style.filter = "grayscale(100%)";
  };

  const checkAnswer = (e) => {
    e.preventDefault();
    const answer = document.forms["guessingForm"];
    const message = document.querySelector("#message");
    message.style.display = "block";
    if (
      answer.elements["answer"].value.toLowerCase() ===
      pokemonName.toLowerCase()
    ) {
      setScore(score + 1);
      message.innerHTML = `<span>Correct! It was ${toTitleCase(
        pokemonName
      )}!</span>`;
      message.classList.add("correct");
      message.classList.remove("incorrect");
    } else {
      message.innerHTML = `<span>Incorrect... It was ${toTitleCase(
        pokemonName
      )}!</span>`;
      removeLife();
      message.classList.add("incorrect");
      message.classList.remove("correct");
    }

    answer.elements["answer"].value = "";
    generateRandom();
  };

  return (
    <div>
      {gameStarted ? (
        pokemonTypes && (
          <div className="container">
            <div className="pokemonInfo">
              <div className="pokemonPhoto">
                <img
                  src={pokemonImage}
                  alt={pokemonName}
                  className="pokemonImage"
                />
              </div>
              <p>
                {pokemonTypes.map((type) => {
                  return (
                    <span
                      className={type.type.name + " type"}
                      key={type.type.name}
                    >
                      {type.type.name.toUpperCase()}
                    </span>
                  );
                })}
              </p>
            </div>

            <div className="box">
              <h2 id="message" style={{ display: "none" }}></h2>
            </div>

            <div className="gameStats">
              <div id="lives">
                <img src={require("../images/heart.png")} alt="heart1" />
                <img src={require("../images/heart.png")} alt="heart2" />
                <img src={require("../images/heart.png")} alt="heart3" />
              </div>
              <h1 id="score">Score: {score}</h1>
              <form name="guessingForm" onSubmit={checkAnswer}>
                <input
                  type="text"
                  name="answer"
                  id="answer"
                  placeholder="Guess..."
                />
                <br />
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        )
      ) : (
        <div className="container">
          <h1 id="header">
            {gamePlayed ? (
              <span>Your score was {score}.</span>
            ) : (
              <span>Pokemon Guessing Game</span>
            )}
          </h1>
          <button
            className={gamePlayed ? "restart" : "start"}
            id="start"
            onClick={startGame}
          >
            {gamePlayed ? <span>Play again?</span> : <span>Start Game</span>}
          </button>
        </div>
      )}
    </div>
  );
};

export default RandomPokemon;
