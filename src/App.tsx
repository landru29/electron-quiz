import React from 'react';
import './App.scss';
import QuizComponent from './components/quiz'

function App() {
  return (
    <div className="App">
      <h1>Quiz</h1>
      <QuizComponent count={5}></QuizComponent>
    </div>
  );
}

export default App;
