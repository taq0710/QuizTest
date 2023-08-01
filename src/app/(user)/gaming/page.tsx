"use client"
import Item from '@/components/PageComponent/Home/QuestionItem';
import Title from '@/components/PageComponent/Home/Title';
import { getQuizList } from '@/redux/features/quiz/quizSlide';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React,{useEffect} from 'react';

export interface  GamingPageProps {
}

export default function GamingPage (props:  GamingPageProps) {
  const dispatch = useAppDispatch()
  const quizInfo = useAppSelector((state) => state.quiz);
  useEffect(()=>{
    if(quizInfo.listQuiz.length===0){
      dispatch(getQuizList());
    }
  },[])
  return (
    <div>
      <div className="my-6">
        <Title>Most Popular</Title>
        <div className="w-full h-fit flex justify-center">
          <div className="w-[1200px] my-3 h-fit shadow-[0_2px_25px_-0px_rgba(0,0,0,0.3)] rounded-xl p-4 flex justify-between items-center flex-wrap">
            {
              quizInfo.listQuiz.map((item,index)=>(
                <Item image={item.thumb} key={index} title={item.title} width={3} id={item._id}/>
              ))
            }
          </div>
        </div>
      </div>
      <div className="my-6">
        <Title>The Latest</Title>
        <div className="w-full h-fit flex justify-center">
          <div className="w-[1200px] my-3 h-fit shadow-[0_2px_25px_-0px_rgba(0,0,0,0.3)] rounded-xl p-4 flex justify-between items-center flex-wrap">
            {
              quizInfo.listQuiz.map((item,index)=>(
                <Item image={item.thumb} key={index} title={item.title} width={3} id={item._id}/>
              ))
            }
          </div>
        </div>
      </div>
      <div className="my-6">
        <Title>You May Like</Title>
        <div className="w-full h-fit flex justify-center">
          <div className="w-[1200px] my-3 h-fit shadow-[0_2px_25px_-0px_rgba(0,0,0,0.3)] rounded-xl p-4 flex justify-between items-center flex-wrap">
            {
              quizInfo.listQuiz.map((item,index)=>(
                <Item image={item.thumb} key={index} title={item.title} width={3} id={item._id}/>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
