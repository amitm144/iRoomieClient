import React, { useState, useCallback } from "react";
import { questionsArray as questions } from "@/lib/register"; //questionsTest as questions
import Question from "./question";
import { ChevronRight, ChevronLeft } from "lucide-react";

function QuestionnaireForm({ initialData ={}, onSubmit }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(initialData);

  const question = questions[currentQuestion];

  const handleAnswer = useCallback(
    (value, importance) => {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [question.id]: { value, importance },
      }));
    },
    [question.id]
  );

  const handleNext = useCallback(
    (e) => {
      e.preventDefault();
      if (currentQuestion === questions.length - 1) {
        onSubmit(answers);
      } else {
        setCurrentQuestion((prev) => prev + 1);
      }
    },
    [currentQuestion, questions.length, answers, onSubmit]
  );

  const handleBack = useCallback((e) => {
    e.preventDefault();
    setCurrentQuestion((prev) => Math.max(0, prev - 1));
  }, []);

  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <form
      onSubmit={handleNext}
      className="h-screen flex flex-col  items-center p-4 lg:py-8   "
    >
      <main className="flex flex-col justify-between w-full h-full items-center ">
        <Question
          key={question.id}
          question={question}
          onAnswer={handleAnswer}
          currentAnswer={answers[question.id]}
        />

        <div className="grid grid-cols-3 justify-items-center items-center w-full max-w-xl  ">
          <div >
            {!isFirstQuestion && (
              <button
                type="button"
                onClick={handleBack}
                className="flex text-center bg-transparent text-blue-500 text-sm rounded-md font-semibold hover:underline"              >
                <ChevronLeft />
                Prev
              </button>
            )}
          </div>

          <div className="flex gap-4 ">
            <span>{currentQuestion + 1}</span>
            <span>/</span>
            <span>{questions.length}</span>
          </div>

          <div >
            <button
              type={isLastQuestion ? "submit" : "button"}
              onClick={handleNext}
              className="flex w-fit  text-center bg-transparent text-blue-500 text-sm rounded-md font-semibold  hover:underline"
            >
              {isLastQuestion ? "Submit" : "Next"}
              <ChevronRight />
            </button>
          </div>
        </div>
      </main>
    </form>
  );
}

export default QuestionnaireForm;
