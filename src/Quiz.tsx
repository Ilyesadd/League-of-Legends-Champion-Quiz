import React, { useState, useEffect } from 'react';
import { Champion, getChampionByName } from './data/champions';
import { getRandomChampion } from './services/championService';

const Quiz = () => {
  const [currentChampion, setCurrentChampion] = useState<Champion | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [guess, setGuess] = useState<string>('');
  const [result, setResult] = useState<{ correct: boolean; message: string } | null>(null);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [guessedChampion, setGuessedChampion] = useState<Champion | null>(null);
  
  useEffect(() => {
    loadNewChampion();
  }, []);
  
  const loadNewChampion = async () => {
    setLoading(true);
    setResult(null);
    setRevealed(false);
    setGuess('');
    setGuessedChampion(null);
    
    try {
      const champion = await getRandomChampion();
      setCurrentChampion(champion);
    } catch (error) {
      console.error('Error loading champion:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGuess = () => {
    if (!currentChampion || !guess.trim()) return;
    
    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedName = currentChampion.name.toLowerCase();
    
    // Find the champion that matches the guess
    const foundChampion = getChampionByName(guess);
    setGuessedChampion(foundChampion || null);
    
    if (normalizedGuess === normalizedName) {
      setResult({ correct: true, message: `Correct! It's ${currentChampion.name}!` });
      setRevealed(true);
    } else {
      setResult({ correct: false, message: 'Incorrect. Try again!' });
      // If the guessed champion exists, we'll show the comparison
    }
  };
  
  const handleReveal = () => {
    setRevealed(true);
    setResult({ correct: false, message: `The champion was ${currentChampion?.name}!` });
  };
  
  if (loading) {
    return <div className="loading">Loading champion data...</div>;
  }
  
  return (
    <div className="quiz-container">
      <div className="champion-hints">
        <h2 className="hint-title">Champion Hints</h2>
        <div className="hint-list">
          <div className="hint-item">
            <span className="hint-label">Role:</span> {currentChampion?.role}
          </div>
          <div className="hint-item">
            <span className="hint-label">Species:</span> {currentChampion?.species}
          </div>
          <div className="hint-item">
            <span className="hint-label">Resource:</span> {currentChampion?.resource}
          </div>
          <div className="hint-item">
            <span className="hint-label">Range Type:</span> {currentChampion?.rangeType}
          </div>
          <div className="hint-item">
            <span className="hint-label">Regions:</span> {currentChampion?.regions.join(', ')}
          </div>
          <div className="hint-item">
            <span className="hint-label">Release Year:</span> {currentChampion?.releaseYear}
          </div>
        </div>
      </div>
      
      <div className="guess-section">
        <input 
          type="text" 
          className="guess-input" 
          placeholder="Enter champion name..." 
          value={guess} 
          onChange={(e) => setGuess(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
          disabled={revealed}
        />
        <div className="button-group">
          <button className="guess-button" onClick={handleGuess} disabled={revealed}>
            Submit Guess
          </button>
          <button className="reveal-button" onClick={handleReveal} disabled={revealed}>
            Reveal Champion
          </button>
          <button className="next-button" onClick={loadNewChampion}>
            Next Champion
          </button>
        </div>
      </div>
      
      {result && (
        <div className={`result-message ${result.correct ? 'success' : 'error'}`}>
          {result.message}
        </div>
      )}
      
      {revealed && currentChampion && (
        <div className="champion-reveal">
          <img 
            src={currentChampion.image} 
            alt={currentChampion.name} 
            className="champion-image" 
          />
        </div>
      )}
      
      {!result?.correct && guessedChampion && currentChampion && (
        <div className="champion-comparison">
          <h3>Comparison with your guess</h3>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Characteristic</th>
                <th>Your Guess: {guessedChampion.name}</th>
                <th>Correct Champion: {currentChampion.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr className={guessedChampion.role === currentChampion.role ? "match" : "mismatch"}>
                <td>Role</td>
                <td>{guessedChampion.role}</td>
                <td>{currentChampion.role}</td>
              </tr>
              <tr className={guessedChampion.species === currentChampion.species ? "match" : "mismatch"}>
                <td>Species</td>
                <td>{guessedChampion.species}</td>
                <td>{currentChampion.species}</td>
              </tr>
              <tr className={guessedChampion.resource === currentChampion.resource ? "match" : "mismatch"}>
                <td>Resource</td>
                <td>{guessedChampion.resource}</td>
                <td>{currentChampion.resource}</td>
              </tr>
              <tr className={guessedChampion.rangeType === currentChampion.rangeType ? "match" : "mismatch"}>
                <td>Range Type</td>
                <td>{guessedChampion.rangeType}</td>
                <td>{currentChampion.rangeType}</td>
              </tr>
              <tr className={JSON.stringify(guessedChampion.regions) === JSON.stringify(currentChampion.regions) ? "match" : "mismatch"}>
                <td>Regions</td>
                <td>{guessedChampion.regions.join(', ')}</td>
                <td>{currentChampion.regions.join(', ')}</td>
              </tr>
              <tr className={guessedChampion.releaseYear === currentChampion.releaseYear ? "match" : "mismatch"}>
                <td>Release Year</td>
                <td>{guessedChampion.releaseYear}</td>
                <td>{currentChampion.releaseYear}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Quiz;