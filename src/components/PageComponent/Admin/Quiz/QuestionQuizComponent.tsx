"use client"
import React from 'react';
import Input from '../../../common/Input';
import { IconContext } from 'react-icons';
import { AiOutlineClose, AiOutlinePlusCircle } from 'react-icons/ai';
import Radio from '../../../common/RadioButton';
import InputFile from '../../../common/InputFile';
import { Question } from '@/redux/features/quiz/interface';

interface IQuestionQuiz {
  questions: Array<Question>;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const QuestionQuizComponent = ({ questions, setQuestions }: IQuestionQuiz) => {
  const handleNewQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        answers: [{ value: '', isCorrect: true }],
        image: '',
      },
    ]);
  };

  const onChangeQuestionText = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleNewAnswer = (indexQuestion: number) => {
    const newQuestions = [...questions];
    newQuestions[indexQuestion].answers.push({ value: '', isCorrect: false });
    setQuestions(newQuestions);
  };

  const onChangeAnswerText = (indexQuestion: number, indexAnswer: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[indexQuestion].answers[indexAnswer].value = value;
    setQuestions(newQuestions);
  };

  const handleClickChecker = (indexQuestion: number, indexAnswer: number) => {
    const newQuestions = [...questions];
    newQuestions[indexQuestion].answers.forEach((answer) => {
      answer.isCorrect = false;
    });
    newQuestions[indexQuestion].answers[indexAnswer].isCorrect = true;
    setQuestions(newQuestions);
  };

  const handleSetImage = (indexQuestion: number, url: string) => {
    const newQuestions = [...questions];
    newQuestions[indexQuestion].image = url;
    setQuestions(newQuestions);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, indexQuestion: number, indexAnswer: number) => {
    if (e.key === 'Enter') {
      if (indexAnswer === questions[indexQuestion].answers.length - 1) handleNewAnswer(indexQuestion);
    }
  };

  const handleDeleteQuestion = (indexQuestion: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(indexQuestion, 1);
    setQuestions(newQuestions);
  };
  return (
    <div className="flex flex-col gap-3">
      {questions.map((question, index) => {
        return (
          <div className="border-2 p-6 rounded-sm flex flex-col gap-4 relative" key={index}>
            <div className="flex flex-col gap-1">
              <span>Question {index + 1}</span>
              <Input
                inputClassName="border-[#000000]"
                value={question.question}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeQuestionText(index, e.target.value)}
              />
              <div className="h-[200px]">
                <InputFile
                  setImageUrl={(url) => {
                    if (url) {
                      handleSetImage(index, url);
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-y-2 items-center">
              {question.answers.map((answer, indexAnswer) => {
                return (
                  <div className="flex flex-col gap-1 w-1/2 pr-3" key={`answer${indexAnswer}`}>
                    <span>Answer {indexAnswer + 1}</span>
                    <div className="flex gap-2 w-full items-center">
                      <Radio
                        label=""
                        checked={answer.isCorrect}
                        onClick={() => handleClickChecker(index, indexAnswer)}
                        color={answer.isCorrect ? '#FF9533' : '#000'}
                      />
                      <Input
                        className="w-full"
                        inputClassName={`border-[#000000] ${answer.isCorrect ? '!border-[#FF9533]' : 'border-[#000000]'}`}
                        value={answer.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeAnswerText(index, indexAnswer, e.target.value)}
                        onKeyDown={(e) => handleOnKeyDown(e, index, indexAnswer)}
                        autoFocus={indexAnswer === question.answers.length - 1}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="w-1/2 pr-3 ">
                <div className="relative h-full pb-6">
                  <div
                    onClick={() => handleNewAnswer(index)}
                    className="flex gap-1 w-fit absolute top-0 p-2 rounded-sm items-center cursor-pointer hover:bg-slate-100"
                  >
                    <IconContext.Provider
                      value={{
                        color: '#000',
                      }}
                    >
                      <div>
                        <AiOutlinePlusCircle size={30} />
                      </div>
                    </IconContext.Provider>
                    <span>New answer</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-2" onClick={() => handleDeleteQuestion(index)}>
              <IconContext.Provider
                value={{
                  className: 'text-[#e6e6e6] hover:text-red-500 cursor-pointer',
                }}
              >
                <div>
                  <AiOutlineClose size={30} />
                </div>
              </IconContext.Provider>
            </div>
          </div>
        );
      })}

      <div onClick={handleNewQuestion} className="border-2 p-6 rounded-sm flex gap-1 items-center cursor-pointer hover:bg-slate-100">
        <IconContext.Provider
          value={{
            color: '#000',
          }}
        >
          <div>
            <AiOutlinePlusCircle size={30} />
          </div>
        </IconContext.Provider>
        <span>New question</span>
      </div>
    </div>
  );
};

export default React.memo(QuestionQuizComponent);
