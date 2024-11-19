import { useState, useEffect } from "react";

import ScrambledWord from "./components/ScrambledWord";
import Guess from "./components/Guess";
import Feedback from "./components/Feedback";
import Display from "./components/Display";

const App = () => {
  // Predefine a WordList
  const [wordList, setWordList] = useState(["javascript", "web3", "blockchain", "react", "typescript"]);

  // State variables
  const [scrambledWord, setScrambledWord] = useState("");
  const [originalWord, setOriginalWord] = useState("");
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
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
    } else {
      setFeedback("Incorrect! Try again.");
    }
  };

  // Start a new game
  useEffect(() => {
    getRandomWord();
    // remove the scrambled word from the WordList
  }, []);


  console.log(wordList);
  return (
    <div>
      <Display />
      {!isGameOver ? (
        <>
          <ScrambledWord word={scrambledWord} />
          <Guess guess={guess} setGuess={setGuess} />
          <button onClick={checkGuess}>Submit Guess</button>
          <Feedback feedback={feedback} />
        </>
      ) : (
        <div>
          <h2>Game Over!</h2>
        </div>
      )}
    </div>
  )
}

export default App