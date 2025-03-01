import { useState, useEffect } from "react";
import useQuestionStore from "../../../store/store";
import { format } from "@formkit/tempo";
import { SingleQuestion } from "../../../interfaces/interfaces";
import { NavLink } from "react-router-dom";

const ShowQuestion = () => {
  const date = new Date();
  format(date, "full");
  const actualDate = format(date, "short");

  const { questions, setBurnedQuestion } = useQuestionStore((store) => store);
  const [answear, setAnswear] = useState("");
  const [burnedCounter, setBurnedCounter] = useState(0);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (answear) {
      questions.forEach((question) => {
        if (question?.burned) {
          setBurnedCounter(burnedCounter + 1);
        }
      });
    }
  }, [answear]);

  const showAnswear = (actualQuestion: SingleQuestion) => {
    const cuestionAnswear = questions.find(
      (question) => question.question === actualQuestion.question
    );
    cuestionAnswear && setAnswear(cuestionAnswear?.correct_answer);
    cuestionAnswear && setBurnedQuestion(actualQuestion);
  };

  const newQuestion = () => {
    setCounter(counter + 1);
    setAnswear("");
  };

  return (
    <>
      {questions[counter] ? (
        <div className="flex  justify-center mt-8 px-8">
          <div className="w-full md:w-8/12 lg:max-w-xl border border-pink-50/30 shadow-lg text-center px-8 py-8 rounded-xl">
            <div className="flex mb-8 font-semibold justify-between">
              <div className="flex">
                Burned questions
                <span className="ml-2 text-sm bg-blue-500 w-5 h-5 rounded-full text-white flex justify-center items-center shadow-sm ">
                  {burnedCounter}
                </span>
              </div>
              <div>{actualDate}</div>
            </div>
            <div className="text-start mb-2">
              <span className="ml-2 inline bg-violet-500 text-white rounded-xl text-sm p-2 mr-2 py-0.5">
                {" "}
                {questions[counter].category}
              </span>
            </div>
            <div className="text-start mb-8">
              <span className="ml-2 inline bg-violet-500 text-white rounded-xl text-sm p-2 py-0.5">
                Difficulty {questions[counter].difficulty}
              </span>
            </div>

            <h3
              className="text-gray-600 text-xl font-semibold mb-8"
              dangerouslySetInnerHTML={{
                __html: questions[counter]?.question || "",
              }}
            />

            <p
              className="text-gray-500 mb-8 text-lg font-semibold"
              dangerouslySetInnerHTML={{ __html: answear }}
            />
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded mr-2 font-semibold"
              onClick={() => showAnswear(questions[counter])}
            >
              Reveal answear
            </button>

            {answear ? (
              <button
                onClick={newQuestion}
                className="bg-black hover:bg-gray-600 text-white px-4 py-2 rounded font-semibold"
              >
                Next question
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center font-semibold text-xl">
          <div className="text-center">
            <h3 className="text-center font-semibold text-7xl py-8 text-gray-700 mb-7">Great job! You’ve finished the trivia. Ready for another challenge?</h3>
            <NavLink to="/" className="bg-blue-600 hover:bg-blue-500 text-white p-3 py-2 rounded-lg">Go home</NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowQuestion;
