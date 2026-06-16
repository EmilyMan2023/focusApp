import { useState } from "react";

const WORDS = ["REACT", "FOCUS", "TIMER", "TASKS", "BREAK", "FAIRY"];


function Wordle() {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const getDailyAnswer = () => {
  const today = new Date().toISOString().split("T")[0];

  const savedDate = localStorage.getItem("wordle_date");
  const savedAnswer = localStorage.getItem("wordle_answer");

  if (savedDate === today && savedAnswer) {
    return savedAnswer;
  }

  const newAnswer = WORDS[Math.floor(Math.random() * WORDS.length)];

  localStorage.setItem("wordle_date", today);
  localStorage.setItem("wordle_answer", newAnswer);

  return newAnswer;
};
const [answer] = useState(getDailyAnswer);

  const submitGuess = (e) => {
    e.preventDefault();

    const cleanGuess = guess.toUpperCase();

    if (cleanGuess.length !== 5) {
      alert("Please enter a 5-letter word");
      return;
    }

    const newGuesses = [...guesses, cleanGuess];
    setGuesses(newGuesses);
    setGuess("");

    if (cleanGuess === answer || newGuesses.length >= 6) {
      setGameOver(true);
    }
  };

  const getLetterColor = (letter, index) => {
    if (answer[index] === letter) {
      return "#4caf50";
    }

    if (answer.includes(letter)) {
      return "#ff9800";
    }

    return "#9e9e9e";
  };

  return (
    <div>
      <h3>Guess a 5 letter word!</h3>

      {guesses.map((word, wordIndex) => (
        <div
          key={wordIndex}
          style={{
            display: "flex",
            gap: "5px",
            marginBottom: "5px",
          }}
        >
          {word.split("").map((letter, index) => (
            <div
              key={index}
              style={{
                width: "35px",
                height: "35px",
                backgroundColor: getLetterColor(letter, index),
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                borderRadius: "4px",
              }}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}

      {!gameOver ? (
        <form onSubmit={submitGuess}>
          <input
            value={guess}
            maxLength={5}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Guess"
          />

          <button type="submit">
            Guess
          </button>
        </form>
      ) : (
        <p>
          Answer: <strong>{answer}</strong>
        </p>
      )}
    </div>
  );
}

export default Wordle;