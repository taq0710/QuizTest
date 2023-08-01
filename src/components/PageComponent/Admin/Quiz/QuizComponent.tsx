"use client"
import React from 'react';
import Input from '../../../common/Input';
import InputFile from '../../../common/InputFile';
import Radio from '../../../common/RadioButton';
import QuestionQuizComponent from './QuestionQuizComponent';
import Button from '../../../common/Button';
import quizApi from '@/redux/features/quiz/factories';
import GameQuizComponent from './GameQuizComponent';
import { Question } from '@/redux/features/quiz/interface';

interface ITypeQuiz {
  label: string;
  value: 'game' | 'question';
}

const typeQuizzes: ITypeQuiz[] = [
  {
    label: 'Game',
    value: 'game',
  },
  {
    label: 'Question',
    value: 'question',
  },
];

const QuizComponent = () => {
  const [title, setTitle] = React.useState<string>('');
  const [subtitle, setSubtitle] = React.useState<string>('');
  const [checked, setChecked] = React.useState<'game' | 'question' | undefined>('question');
  const [thumb, setThumb] = React.useState<string>('');
  const [sourceId, setSourceId] = React.useState<string>('');

  const [questions, setQuestions] = React.useState<Array<Question>>([
    {
      question: '',
      answers: [{ value: '', isCorrect: true }],
      image: '',
    },
  ]);

  const handleSubmitQuiz = async () => {
    try {
      const data = {
        title,
        subtitle,
        type: checked,
        thumb,
        questions,
        sourceId,
      };
      const result = await quizApi.postQuiz(data);
      console.log(result);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-8">
        <div className="basis-1/2 ">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span>Title</span>
              <Input
                inputClassName="border-[#000000]"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span>Subtitle</span>
              <Input
                inputClassName="border-[#000000]"
                value={subtitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubtitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span>Type</span>
              <div className="flex gap-4">
                {typeQuizzes.map((typeQuiz, index) => (
                  <Radio
                    key={index}
                    label={typeQuiz.label}
                    value={typeQuiz.value}
                    checked={typeQuiz.value === checked}
                    onClick={() => setChecked(typeQuiz.value)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="basis-1/2 h-[250px]">
          <div className="flex flex-col gap-1 h-full">
            <span>Thumb</span>
            <InputFile
              setImageUrl={(url) => {
                if (url) {
                  setThumb(url);
                }
              }}
            />
          </div>
        </div>
      </div>

      {checked === 'question' ? (
        <QuestionQuizComponent questions={questions} setQuestions={setQuestions} />
      ) : (
        <GameQuizComponent sourceId={sourceId} setSourceId={setSourceId} />
      )}

      <div className="pt-6 flex justify-end">
        <Button title="Submit" className="!text-[#ffffff]" onClick={handleSubmitQuiz} />
      </div>
    </div>
  );
};

export default QuizComponent;
