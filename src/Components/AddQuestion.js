import React, { useState, useRef } from 'react';
import { Button, TextField, Radio, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

const AddQuestion = ({ question, handleSaveQuestion, handleAddQuestion }) => {
  const option0Ref = useRef(null);
  const option1Ref = useRef(null);
  const option2Ref = useRef(null);
  const option3Ref = useRef(null);
  const [radioIndex, setRadioIndex] = useState(-1);

  const [text, setText] = useState("");
  const saveQuestion = (e) => {
    e.preventDefault();
    const newQuestion = {};
    newQuestion.text = text;

    newQuestion.options = [];
    const option0 = {};
    option0.text = option0Ref.current.value;
    option0.isCorrect = false;
    const option1 = {};
    option1.text = option1Ref.current.value;
    option1.isCorrect = false;
    const option2 = {};
    option2.text = option2Ref.current.value;
    option2.isCorrect = false;

    const option3 = {};
    option3.text = option2Ref.current.value;
    option3.isCorrect = false;
    newQuestion.options.push(option0);
    newQuestion.options.push(option1);
    newQuestion.options.push(option2);
    newQuestion.options.push(option3);
    newQuestion.options[radioIndex].isCorrect = true;

    console.log(option3Ref.current.value);
    handleSaveQuestion(newQuestion);
  }

  const addQuestion = e => {
    e.preventDefault();
    handleAddQuestion()
  }


  return (
    <>
      <Button sx={{
        color: 'black',
        borderColor: 'black'
      }} variant='outlined' endIcon={<AddIcon />} onClick={addQuestion}>Add Question</Button>
      <Box className="question--block" sx={{
        "& .MuiTextField-root": {
          m: 1,
          width: "50%",
        },
      }}>
        <br />
        <TextField label='Question' variant="outlined" type="text" placeholder="Please enter a question.." onChange={e => setText(e.target.value)} value={text} />
        <br />
        <div>
          {question.options &&
            <>
              <TextField variant="outlined" label="Option" type="text" placeholder="Please enter an option.." ref={option0Ref} />
              <Radio type="radio" name={question.text} value={question.options[0].isCorrect} checked={radioIndex === 0} onClick={() => setRadioIndex(0)} />
              <label> Correct Answer </label>
              <br />

              <TextField variant="outlined" label="Option" type="text" placeholder="Please enter an option.." ref={option1Ref} />
              <Radio type="radio" name={question.text} value={question.options[0].isCorrect} checked={radioIndex === 1} onClick={() => setRadioIndex(1)} />
              <label> Correct Answer </label>
              <br />

              <TextField variant="outlined" label="Option" type="text" placeholder="Please enter an option.." ref={option2Ref} />
              <Radio type="radio" name={question.text} value={question.options[0].isCorrect} checked={radioIndex === 2} onClick={() => setRadioIndex(2)} />
              <label> Correct Answer </label>
              <br />

              <TextField variant="outlined" label="Option" type="text" placeholder="Please enter an option.." ref={option3Ref} />
              <Radio type="radio" name={question.text} value={question.options[0].isCorrect} checked={radioIndex === 3} onClick={() => setRadioIndex(3)} />
              <label> Correct Answer </label>
              <br />
            </>
          }
        </div>

        <Button sx={{
          color: 'black',
          borderColor: 'black'
        }} variant="outlined" endIcon={<SaveIcon />} onClick={saveQuestion}>Save Question</Button>
      </Box>
    </>
  );
};

export default AddQuestion;
