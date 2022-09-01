import React, { useState } from 'react';
import AddQuestion from './AddQuestion';
import { Button, TextField, Box } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const AddQuiz = ({ quizTemplate, setShowAddQuiz }) => {

  const [quiz, setQuiz] = useState(quizTemplate);

  const [title, setTitle] = useState("");

  const handleSaveQuestion = (question) => {
    quiz.title = title;
    quiz.questions = [question, ...quiz.questions];
    quiz.questions = quiz.questions.filter(q => q.text !== 'Enter Question Text');
    setQuiz(quiz);
  }

  const questionTemplate = {
    'text': 'Enter Question Text', 'options':
      [{ 'text': 'Enter Option Text', 'isCorrect': false },
      { 'text': 'Enter Option Text', 'isCorrect': false },
      { 'text': 'Enter Option Text', 'isCorrect': false },
      { 'text': 'Enter Option Text', 'isCorrect': false }]
  };

  const handleAddQuestion = () => {
    const newQuiz = {};
    newQuiz.title = quiz.title;
    newQuiz.questions = [...quiz.questions, questionTemplate];
    setQuiz(newQuiz);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const newQuiz = {};
    newQuiz.title = title;
    newQuiz.questions = [...quiz.questions];
    fetch('https://getit-app.azurewebsites.net/api/Quizzes', {
      method: 'POST',
      headers: { 'Content-type': 'Application/Json' },
      body: JSON.stringify(newQuiz)
    })
    setShowAddQuiz(false);
  }

  return (
    <>
      <h1>Add Quiz</h1>
      {(quiz) && (
        <form>
          <Box sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "75%"
            },
          }}>
            <TextField label="Quiz Title" variant='outlined' type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder={quiz.title} />
          </Box>
          <br />
          {quiz.questions.map(question =>
            <AddQuestion key={question.text} question={question} handleAddQuestion={handleAddQuestion} handleSaveQuestion={handleSaveQuestion} />
          )}
          <Button sx={{
            m: 5,
            width: "80%",
            p: 3,
            backgroundColor: 'black'
          }} variant="contained" endIcon={<SendIcon />} type="submit" onClick={e => handleSubmit(e)}>Submit Quiz</Button>
        </form>
      )}
    </>
  );
};

export default AddQuiz;