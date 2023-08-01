"use client"
import { useState, useEffect, useRef } from 'react';
import { signInWithFacebook } from '../../../firebase';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getQuiz, getQuizAnswer, getQuizList, sendPhoto } from '@/redux/features/quiz/quizSlide';
import html2canvas from 'html2canvas';
import { FacebookShareButton } from 'react-share';
import FacebookIcon from 'react-share/lib/FacebookIcon';
import Quiz_1 from '../../quiz_1';
import Loading from '@/components/common/Loading';
import Result from '@/components/PageComponent/Detail/ListTest/result';
import { useParams } from 'next/navigation';
import MainTest from '@/components/PageComponent/Detail/ListTest/mainTest';
import Button from '@/components/common/Button';
import Question from '@/components/PageComponent/Detail/ListTest/question';
import Title from '@/components/PageComponent/Home/Title';
import Item from '@/components/PageComponent/Home/QuestionItem';
import CustomFacebookShareButton from '@/components/common/ButtonShare';
export interface DetailPageProps { }

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}

export default function DetailPage(props: DetailPageProps) {
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [questionNo, setQuestionNo] = useState<number>(1);
  const [listChoice, setListChoice] = useState<string[]>([]);
  const [showFinalResult, setShowFinalResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(-1);
  const [comment, setComment] = useState<string>('');
  const [imageShare, showImageShare] = useState<boolean>(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const shareRef = useRef<HTMLButtonElement>(null);

  const dispatch = useAppDispatch();
  const quizInfo = useAppSelector((state) => state.quiz);
  console.log("assda", quizInfo);

  const userInfo = useAppSelector((state) => state.login);
  const params = useParams();
  const handleShowQuestion = () => {
    setShowQuestion(true);
  };
  const handleNext = (choice: string) => {
    setQuestionNo((prev) => prev + 1);
    setListChoice([...listChoice, choice]);
  };
  const handleShowResult = (choice: string) => {
    setListChoice([...listChoice, choice]);
    setShowResult(true);
  };
  const finalResult = () => {
    dispatch({
      type: getQuizAnswer().type,
      payload: quizInfo.quizDetail?._id,
    });
    setShowFinalResult(true);
  };
  const handleShare = async () => {
    if (!userInfo.info._id) {
      signInWithFacebook().then(async (result) => {
        showImageShare(true);
      });
    } else {
      if (resultRef.current) {
        const canvas = await html2canvas(resultRef.current);
        const photo = canvas.toDataURL('image/png', 1.0);
        const file = DataURIToBlob(photo);
        const formData = new FormData();
        formData.append('files', file, 'image.jpg');
        dispatch({
          type: sendPhoto().type,
          payload: formData,
        });
        if (shareRef.current) {
          shareRef.current.click();
        }
      }
    }
  };
  function DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',');
    const byteString =
      splitDataURI[0].indexOf('base64') >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  useEffect(() => {
    if (quizInfo.listQuiz.length === 0) {
      dispatch(getQuizList());
    }
    dispatch({
      type: getQuiz().type,
      payload: params.quizId ? params.quizId : '',
    });
  }, []);
  useEffect(() => {
    if (quizInfo.quizDetailAnswer) {
      let scores = 0;
      quizInfo.quizDetailAnswer.map((item, index) => {
        if (item.answer === listChoice[index]) {
          scores++;
        }
      });
      if (
        scores >= Math.round((quizInfo.quizDetail.questions.length / 3) * 2)
      ) {
        setComment('You do very well');
      } else if (
        scores >= Math.round(quizInfo.quizDetail.questions.length / 3)
      ) {
        setComment('You tried so hard');
      } else {
        setComment('Please try next time');
      }
      setScore(scores);
    }
  }, [quizInfo]);
  useEffect(() => {
    async function takePhoto() {
      if (resultRef.current) {
        const canvas = await html2canvas(resultRef.current);
        const photo = canvas.toDataURL('image/png', 1.0);
        const file = DataURIToBlob(photo);
        const formData = new FormData();
        formData.append('files', file, 'image.jpg');
        dispatch({
          type: sendPhoto().type,
          payload: formData,
        });
      }
    }
    if (userInfo.info._id && imageShare) {
      takePhoto();
      if (shareRef.current) {
        console.log(quizInfo.listLinkPhoto[0]);
        shareRef.current.click();
      }
    }
  }, [userInfo]);
  return (
    <>
      <div className="w-full h-fit flex items-center justify-center">
        <div className="w-[1400px] my-3 h-fit px-[50px] md:px-[100px]">
          <div className="w-full h-fit flex justify-between flex-wrap my-8">
            <div className="w-[100%] lg:w-[65%] h-fit ">
              <div
                className="w-full h-[fit] min-h-[500px] rounded-lg 
              shadow-[0_2px_25px_-0px_rgba(0,0,0,0.3)] relative"
              >
                {/* Social Share Quiz */}
                <div className="hidden">
                  <FacebookShareButton
                    ref={shareRef}
                    url={'http://207.148.113.139:3000/detail/7'}
                    quote={quizInfo.quizDetail.title}
                    hashtag={'#testquizs'}
                    className="Demo__some-network__share-button"
                  >
                    <FacebookIcon size={32} round /> Facebookでshare
                  </FacebookShareButton>
                  {/* <CustomFacebookShareButton
                    url={''}
                    thumbUrl={quizInfo.listLinkPhoto[0]}
                    title={quizInfo.quizDetail.title}
                    description={''}
                  /> */}
                </div>
                {params.quizId === '1' ? (
                  <div className="w-full h-fit ">
                    <Quiz_1 />
                  </div>
                ) : (
                  <div className="w-full h-fit ">
                    {quizInfo.isLoading ? (
                      <div className="h-full w-full flex justify-center items-center">
                        <Loading color="#FF9400" />
                      </div>
                    ) : showFinalResult ? (
                      <Result
                        title={quizInfo.quizDetail.title}
                        score={score}
                        total={quizInfo.quizDetail.questions.length}
                        resultComment={comment}
                        handleShareResult={() => {
                          handleShare();
                        }}
                        name={
                          userInfo.info.firstName
                            ? userInfo.info.firstName + userInfo.info.lastName
                            : ''
                        }
                        image={userInfo.info.avatar ? userInfo.info.avatar : ''}
                        resultRef={resultRef}
                      />
                    ) : !showQuestion ? (
                      <>
                        <MainTest
                          title={quizInfo.quizDetail.title}
                          image={quizInfo.quizDetail.thumb}
                        />
                        <div className="absolute w-full h-full z-10 top-0 left-0 rounded-lg flex justify-center items-center">
                          <Button
                            title="START"
                            className="text-white px-24 py-4 font-semibold text-xl zoom-animation"
                            onClick={() => handleShowQuestion()}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="">
                        {quizInfo.quizDetail.questions.map(
                          (item, index) =>
                            questionNo === index + 1 && (
                              <Question
                                key={index}
                                question={item.question}
                                image={item.image}
                                total={quizInfo.quizDetail.questions.length}
                                currentNumber={index + 1}
                                choice={item.answers}
                                handleNextQuestion={(choice) =>
                                  handleNext(choice)
                                }
                                handleResult={(choice) =>
                                  handleShowResult(choice)
                                }
                              />
                            )
                        )}
                        {showResult && (
                          <div className="absolute w-full h-full z-10 bg-[#5f5f5f89] top-0 left-0 rounded-lg flex justify-center items-center">
                            <Button
                              title="SHOW RESULT"
                              className="text-white px-24 py-4 font-semibold text-xl zoom-animation"
                              onClick={() => finalResult()}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="w-full my-6 h-fit shadow-[0_2px_25px_-0px_rgba(0,0,0,0.3)] rounded-xl p-4">
                <Title>RECOMMEND QUIZZES</Title>
                <div className="w-full h-fit flex justify-center">
                  <div className="w-full my-3 hidden md:flex justify-between items-center flex-wrap">
                    {quizInfo.listQuiz.map((item, index) => (
                      <Item
                        image={item.thumb}
                        key={index}
                        title={item.title}
                        width={2}
                        id={item._id}
                      />
                    ))}
                  </div>
                  <div className="w-full my-3 flex md:hidden justify-between items-center flex-wrap">
                    {quizInfo.listQuiz.map((item, index) => (
                      <Item
                        image={item.thumb}
                        key={index}
                        title={item.title}
                        width={1}
                        id={item._id}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[100%] lg:w-[33%] h-fit rounded-lg shadow-[0_2px_25px_-0px_rgba(0,0,0,0.3)] p-4 overflow-x-hidden">
              <Title>Most Tested</Title>
              <div className="w-full h-fit hidden lg:flex justify-center">
                <div className="w-full my-3 flex justify-center items-center flex-wrap">
                  {quizInfo.listQuiz.map((item, index) => (
                    <Item
                      image={item.thumb}
                      key={index}
                      title={item.title}
                      width={1}
                      id={item._id}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full h-fit flex lg:hidden justify-center">
                <div className="w-full my-3 hidden md:flex justify-between items-center flex-wrap">
                  {quizInfo.listQuiz.map((item, index) => (
                    <Item
                      image={item.thumb}
                      key={index}
                      title={item.title}
                      width={2}
                      id={item._id}
                    />
                  ))}
                </div>
                <div className="w-full my-3 flex md:hidden justify-between items-center flex-wrap">
                  {quizInfo.listQuiz.map((item, index) => (
                    <Item
                      image={item.thumb}
                      key={index}
                      title={item.title}
                      width={1}
                      id={item._id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
