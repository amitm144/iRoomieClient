import React, { useState, useEffect } from "react";
import RadioCombobox from "@/components/Coustom/radioCbx";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { importanceMap } from "@/lib/registrationUtils";

const Question = ({ question, onAnswer, currentAnswer }) => {
  const [value, setValue] = useState(currentAnswer?.value ?? null);
  const [importance, setImportance] = useState(currentAnswer?.importance ?? 3);

  // Reset state when question changes
  useEffect(() => {
    setValue(currentAnswer?.value ?? null);
    setImportance(currentAnswer?.importance ?? 3);
  }, [question.id, currentAnswer]);

  useEffect(() => {
    if (value !== null) {
      onAnswer(value, importance);
    }
  }, [value, importance, onAnswer]);

  const handleAnswerChange = (index) => {
    setValue(index + 1);
  };

  const handleImportanceChange = (e, value) => {
    e.preventDefault();
    setImportance(value);
  };

  return (
    <div className="flex flex-col max-w-4xl w-full gap-4 text-sm lg:text-lg  h-full">
      <h2 className="lg:text-xl text-lg font-semibold flex items-center justify-between">
        {question.question}
      </h2>
      <main className="flex flex-col h-full ">
        <section className="flex flex-col justify-around gap-4 h-3/4   ">
          {question.answers.map((answer, index) => (
            <RadioCombobox
              key={index}
              value={index}
              onChange={() => handleAnswerChange(index)}
              checked={value - 1 === index}
              label={answer}
              style="h-full w-full text-center "
            />
          ))}
        </section>

        {value !== null && (
          <section className="flex flex-col lg:gap-3 h-1/4 justify-center">
            <p className="">How important is this to you?</p>
            <div className="flex">
              <Button
                className="lg:text-2xl lg:mr-8 bg-transparent text-blue-500 hover:bg-transparent"
                onClick={(e) =>
                  handleImportanceChange(e, Math.max(importance - 1, 1))
                }
              >
                -
              </Button>

              <Slider
                defaultValue={[3]}
                value={[importance]}
                max={5}
                min={1}
                step={1}
              />
              <Button
                className="lg:text-2xl lg:ml-8 bg-transparent text-blue-500 hover:bg-transparent"
                onClick={(e) =>
                  handleImportanceChange(e, Math.min(5, importance + 1))
                }
              >
                +
              </Button>
            </div>
            <p className="text-center text-xl font-semibold">
              {importanceMap[importance - 1]}
            </p>
          </section>
        )}
      </main>
    </div>
  );
};

export default Question;
