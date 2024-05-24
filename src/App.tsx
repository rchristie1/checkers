import React from 'react';
import CheckersBoard from './components/CheckersBoard';
import "./App.scss"

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Checkers Game</h1>
      <CheckersBoard />
    </div>
  );
};

export default App;
