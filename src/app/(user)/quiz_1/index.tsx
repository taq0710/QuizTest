import React, { useState } from 'react';
import data from './data.json';
import MainTest from '@/components/PageComponent/Detail/ListTest/mainTest';
import Button from '@/components/common/Button';

function Quiz_1() {
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const [answerQuestionOne, setAnswerQuestionOne] = useState<string>('');

  const handleChoose = (answer: string) => {
    if (currentNumber === 7) {
    } else if (currentNumber === 1) {
      setAnswerQuestionOne(answer)
      setCurrentNumber(currentNumber + 1);
    } else {
      setCurrentNumber(currentNumber + 1);
    }
  };
  return (
    <div>
      {showQuestion === true ? (
        <div>
          {showResult === true ? (
            <div></div>
          ) : (
            <div className="w-full h-fit p-4">
              <div className="flex items-center">
                <div className="text-xl font-semibold text-[#FF6400]">
                  {currentNumber}
                </div>
                <div className="text-md text-[#888]">/{7}</div>
              </div>
              <div className="mt-5 w-full pt-[55%] relative rounded-xl overflow-hidden">
                <div className="w-full h-full absolute top-0 left-0">
                  <img
                    src={
                      currentNumber === 1
                        ? data.Question_one.image
                        : (data as any)[answerQuestionOne][currentNumber - 2].image
                    }
                    alt={
                      currentNumber === 1
                        ? data.Question_one.question
                        : (data as any)[answerQuestionOne][currentNumber - 2]
                          .question
                    }
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <h1 className="capitalize text-3xl font-semibold text-[#FF6400] my-4">
                {currentNumber === 1
                  ? data.Question_one.question
                  : (data as any)[answerQuestionOne][currentNumber - 2].question
                }
              </h1>
              <div className="flex items-center justify-between flex-wrap">
                {currentNumber === 1
                  ? data.Question_one.answer.map((item, index) => (
                    <div
                      key={index}
                      className={` p-1 rounded-md w-[49%] mt-2 hover:cursor-pointer border-[1px] border-solid  hover:scale-[1.03] `}
                      onClick={() => handleChoose(item)}
                    >
                      {item}
                    </div>
                  ))
                  :
                  (data as any)[answerQuestionOne][currentNumber - 2].answer.map(
                    (ans: any) => {
                      console.log((data as any)[answerQuestionOne][currentNumber - 2])
                      return (
                        <div
                          key={ans}
                          className={` p-1 rounded-md  w-[49%] mt-2 hover:cursor-pointer border-[1px] border-solid  hover:scale-[1.03]`}
                          onClick={() => handleChoose(ans)}
                        >
                          {ans}
                        </div>
                      )
                    }
                  )
                }
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <MainTest title="This is title quiz one" image="/images/thumb_quiz/quiz_1/thumb.png" />
          <div className="absolute w-full h-full z-10 top-0 left-0 rounded-lg flex justify-center items-center">
            <Button
              title="START"
              className="text-white px-24 py-4 font-semibold text-xl zoom-animation"
              onClick={() => setShowQuestion(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz_1;
