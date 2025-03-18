import React from 'react';
import Quiz from './Quiz';
import './styles.css';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>League of Legends Champion Quiz</h1>
        <p>Test your knowledge of League of Legends champions! Can you guess the champion based on the hints?</p>
      </header>
      <Quiz />
    </div>
  );
}

export default App;