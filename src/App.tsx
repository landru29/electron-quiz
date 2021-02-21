import React from 'react';
import './App.scss';
import QuizComponent from './components/quiz'
import Instance from './service/electron';
import Data from './service/data';

function App() {
  let count = 5;
  if (Instance.isElectron()) {
    count=0;
    Data.listenOpenFile();
  }

  return (
    <div className="App">
      <h1>Quiz</h1>
      <QuizComponent count={count}></QuizComponent>
    </div>
  );
}

export default App;
