import React, { useState, useEffect } from "react";
import axios from "axios";
import MathJax from "react-mathjax";
import "./index.css";
import Button from 'react-bootstrap/Button';
import { BiCaretLeft , BiCaretRight } from 'react-icons/bi';


const App = () => {
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const topicIds = [
    "AreaUnderTheCurve_1",
    "AreaUnderTheCurve_2",
    "AreaUnderTheCurve_3",
    "AreaUnderTheCurve_4",
    "AreaUnderTheCurve_5",
  ];
  const fetchData = async (id) => {
    await axios
      .get(
        `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${id}`
      )
      .then((response) => {
        console.log(response.data[0].Question);
        setQuestion((prevQuestions) => ({
          ...prevQuestions,
          [id]: response.data[0].Question,
        }));
        setAnswer((prevAnswers) => ({
          ...prevAnswers,
          [id]: response.data[0].Result2,
        }));
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    for (const id of topicIds) {
      fetchData(id);
    }
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestion < topicIds.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  return (
    <MathJax.Provider>
      <div className="container">
            <p className="answer">
              Answer :{" "}
              <MathJax.Node inline formula={answer[topicIds[currentQuestion]]} />
            </p>
        <div className="card">
          <div>
            <h3>{topicIds[currentQuestion]}</h3>
            <h4><MathJax.Node inline formula={question[topicIds[currentQuestion]]} /></h4>
            <hr></hr>
          </div>
        </div>
        <div className="navigation-Buttons gap-2">
              <Button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
              <BiCaretLeft />
              </Button>
              <Button
                onClick={handleNextQuestion}
                disabled={currentQuestion === topicIds.length - 1}
              >
            <BiCaretRight />
              </Button>
            </div>
      </div>
    </MathJax.Provider>
  );
};

export default App;