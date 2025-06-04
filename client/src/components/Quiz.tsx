import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  fetchQuestions,
  setAnswer,
  submitAnswers,
  reset,
  selectQuiz
} from '../redux/quizStore';
import { AppDispatch } from '../redux';

const Quiz = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, questions, answers, score } = useSelector(selectQuiz);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [quantity, setQuantity] = useState(5);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleStart = () => {
    dispatch(fetchQuestions({ category: selectedCategory, difficulty, quantity }));
  };

  const handleAnswer = (questionId: string, answer: string) => {
    dispatch(setAnswer({ id: questionId, answer }));
  };

  const handleSubmit = () => {
    const answerArray = questions.map(q => ({
      id: q.id,
      selected: answers[q.id]
    }));
    dispatch(submitAnswers(answerArray));
  };

  const restart = () => {
    dispatch(reset());
    setDifficulty('easy');
    setSelectedCategory('');
    setQuantity(5);
  };

  const allAnswered = questions.length > 0 && Object.keys(answers).length === questions.length;

  if (score !== null) {
    const getColor = (score: number) => {
      if (score >= 4) return 'green';
      if (score >= 2) return 'goldenrod';
      return 'red';
    };

    return (
      <div className='Quiz-Wrapper'>
        <h2>Your Score: {score}/{questions.length}</h2>
        <ul>
          {questions.map(q => (
            <li key={q.id}>
              <p dangerouslySetInnerHTML={{ __html: q.question }}></p>
              {q.answers.map(ans => {
                const isCorrect = ans === q.correct_answer;
                const isWrong = ans === answers[q.id] && !isCorrect;

                return (
                  <div
                    key={ans}
                    style={{
                      color: isCorrect ? 'green' : isWrong ? 'red' : 'black',
                      fontWeight: isCorrect || isWrong ? 'bold' : 'normal'
                    }}
                    
                  >{ans}</div>
                );
              })}
             
            </li>
          ))}
        </ul>
       
        <button onClick={restart}> New Quiz</button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className='Quiz-Wrapper'>
        <h2>Start a New Quiz</h2>
        <label>
          Category:
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            <option value="">Select</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Difficulty:
          <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <br />
        <label>
          Number of Questions:
          <input
            type="number"
            min={1}
            max={10}
            value={quantity}
            onChange={e => setQuantity(parseInt(e.target.value))}
          />
        </label>
        <br />
        <button onClick={handleStart} disabled={!selectedCategory}>Begin Quiz</button>
      </div>
    );
  }

  return (
    <div className='Quiz-Wrapper'>
      <h2>Quiz</h2>
      <ul>
        {questions.map(q => (
          <li key={q.id}>
            <p dangerouslySetInnerHTML={{ __html: q.question }} />
            <div className='Answer-Toolbar'>
 {q.answers.map(ans => (
              <button key={ans}
              disabled={answers[q.id] === ans}
              onClick={() => handleAnswer(q.id, ans)}
              >
              

                <span >{ans}</span>
              </button>
            ))}
            </div>
           
          
          </li>
        ))}
      </ul>
     <button disabled={!allAnswered} onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default Quiz;