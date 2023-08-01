import React, { useState } from "react";

export interface QuestionProps {
  question: string;
  image: string;
  total: number;
  currentNumber: number;
  choice: {value:string}[];
  handleNextQuestion: (choice: string) => void;
  handleResult: (choice: string) => void;
}

export default function Question({
  question,
  image,
  total,
  currentNumber,
  choice,
  handleNextQuestion,
  handleResult,
}: QuestionProps) {
  const [showNext, setShowNext] = useState<boolean>(false);
  const [activeChoice, setActiveChoice] = useState<string>("");
  const handleNext = () => {
    if (showNext) {
      handleNextQuestion(activeChoice);
    }
  };
  const handleChoose = (index: string) => {

    if(currentNumber===total){
      setActiveChoice(index);
      handleShowResult(index)
    }else{
      setActiveChoice(index);
      setShowNext(true);
    }
  };
  const handleShowResult = (answer: string) => {
      handleResult(answer);
  };
  return (
    <div className="w-full h-fit p-4">
      <div className="flex items-center">
        <div className="text-xl font-semibold text-[#FF6400]">
          {currentNumber}
        </div>
        <div className="text-md text-[#888]">/{total}</div>
      </div>
      <div className="mt-5 w-full pt-[55%] relative rounded-xl overflow-hidden">
        <div className="w-full h-full absolute top-0 left-0">
          <img
            src={image}
            alt={question}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <h1 className="capitalize text-3xl font-semibold text-[#FF6400] my-4">
        {question}
      </h1>
      <div className="flex items-center justify-between flex-wrap">
        {choice.map((item, index) => (
          <div
            key={index}
            className={` p-1 rounded-md border w-[49%] mt-2 hover:cursor-pointer
               border-solid  hover:scale-[1.03] 
              ${
                activeChoice === item.value
                  ? "bg-[#FF9400] text-[#fff] border-[#FF9400]"
                  : "bg-[#fff] text-[#888] border-[#888]"
              }`}
            onClick={() => handleChoose(item.value)}
          >
            {item.value}
          </div>
        ))}
      </div>
      {currentNumber === total ? (
        <></>
      ) : (
        
        <div className="frame">
          <button
            className={`${
              showNext
                ? "custom-btn btn-7"
                : "bg-[#bebebe] w-[230px] h-[50px] text-xl text-[#7e7e7e] hover:cursor-default"
            }`}
            onClick={() => handleNext()}
          >
            <span>Next</span>
          </button>
        </div>
      )}
    </div>
  );
}
