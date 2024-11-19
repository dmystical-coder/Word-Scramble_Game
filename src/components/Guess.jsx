const GuessInput = ({ guess, setGuess }) => {
    return (
        <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess"
        />
    );
};

export default GuessInput;