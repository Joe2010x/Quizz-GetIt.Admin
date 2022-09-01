import './App.css';
import React, { useEffect, useState } from 'react';
import AddQuiz from './Components/AddQuiz';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [quizzes, setQuizzes] = useState(null);
  const [showAddQuiz, setShowAddQuiz] = useState(false);
  const [showQuizzes, setShowQuizzes] = useState(true);
  const quizTemplate = {
    'title': 'Enter Quiz Title', 'questions':
      [{
        'text': 'Enter Question Text', 'options':
          [{ 'text': 'Enter Option Text', 'isCorrect': false },
          { 'text': 'Enter Option Text', 'isCorrect': false },
          { 'text': 'Enter Option Text', 'isCorrect': false },
          { 'text': 'Enter Option Text', 'isCorrect': false }]
      }]
  }

  const handleShowQuizzes = () => {
    fetchQuizzes();
    setShowQuizzes(true);
    setShowAddQuiz(false);
  }

  const fetchQuizzes = () => {
    fetch('https://getit-app.azurewebsites.net/api/Quizzes')
      .then(response => response.json())
      .then(result => setQuizzes(result));
  }

  const handleDelete = id => {
    fetch(`https://getit-app.azurewebsites.net/api/Quizzes/${id}`, {
      method: 'DELETE'
    })
    setQuizzes(quizzes.filter(q => q.id !== id))
  }

  useEffect(() => {
    fetchQuizzes();
  }, [])

  const addQuiz = () => {
    setShowAddQuiz(true);
    setShowQuizzes(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header__title">{'{ get; it; }'}</h1>
      </header>
      <div className='home-buttons'>
        <Button variant='contained' sx={{
          backgroundColor: 'black',
          color: 'rgb(210, 157, 23)'
        }} type="button" onClick={addQuiz}>Add</Button>
        <Button variant='contained' sx={{
          backgroundColor: 'black',
          color: 'rgb(210, 157, 23)'
        }} type="button" onClick={handleShowQuizzes}>View All Quizzes</Button>
      </div>
      {(showAddQuiz) && <AddQuiz quizTemplate={quizTemplate} setShowAddQuiz={setShowAddQuiz} />}
      {(quizzes && showQuizzes) &&
        <ul>{quizzes.map(quiz => <li key={quiz.id}>
          {quiz.title}<Button startIcon={<DeleteIcon />} sx={{
            color: 'red',
            borderColor: 'red'
          }} className="quizButton" variant="outlined" type="button" onClick={() => handleDelete(quiz.id)}>Delete Quiz</Button>
        </li>)}
        </ul>}
      <footer className="App-footer">
        <p className="footer__title">{'Mobbydick, 2022, a part of </salt>'}</p>
      </footer>
    </div>
  );
}

export default App;
