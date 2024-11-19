import { useState, useEffect } from "react";

import ScrambledWord from "./components/ScrambledWord";
import Guess from "./components/Guess";
import Feedback from "./components/Feedback";
import Display from "./components/Display";
import Timer from "./components/Timer";
import Score from "./components/Score";
import Hint from "./components/Hint";

const App = () => {
  // Predefine a WordList
  const [wordList, setWordList] = useState(["javascript", "web3", "blockchain", "react", "typescript"]);

  // State variables
  const [scrambledWord, setScrambledWord] = useState("");
  const [originalWord, setOriginalWord] = useState("");
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);

  // function to scramble a word
  function scrambleWord(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
  }

  // Select a random word from the list
  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const word = wordList[randomIndex];
    setOriginalWord(word);
    setScrambledWord(scrambleWord(word));
  };

  // Check the player's guess
  const checkGuess = () => {
    if (guess.trim().toLowerCase() === originalWord.toLowerCase()) {
      setFeedback("Correct! Well done.");
      setGuess("");
      setWordList(prevWordList => prevWordList.filter(word => word !== originalWord));
      setScore(score + 10); // Increment score for correct guess
      setTimeout(() => {
        getRandomWord(); // Load the next word
        setGuess(""); // Clear the input field
      }, 1000);
    } else {
      setFeedback("Incorrect! Try again.");
    }
  };

  // Start a new game
  useEffect(() => {
    getRandomWord();
    // remove the scrambled word from the WordList
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft === 0) {
      setIsGameOver(true);
    } else if (!isGameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isGameOver]);

  // Hint functionality
  const showHint = () => {
    alert(`Hint: The first letter is "${originalWord[0]}"`);
  };

  return (
    <div>
      <Display />
      {!isGameOver ? (
        <>
          <ScrambledWord word={scrambledWord} />
          <Guess guess={guess} setGuess={setGuess} />
          <button onClick={checkGuess}>Submit Guess</button>
          <Feedback feedback={feedback} />
          <Score score={score} />
          <Timer timeLeft={timeLeft} />
          <Hint showHint={showHint} />
        </>
      ) : (
        <div>
          <h2>Game Over! Your final score is {score}</h2>
        </div>
      )}
    </div>
  )
}

export default App