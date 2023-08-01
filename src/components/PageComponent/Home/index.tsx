
import Item from "@/components/PageComponent/Home/QuestionItem";
import Title from "@/components/PageComponent/Home/Title";
import Button from "@/components/common/Button";
import { getQuizList } from "@/redux/features/quiz/quizSlide";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react"

export interface HomePageProps {
}

export default function HomePage(props: HomePageProps) {
    const dispatch = useAppDispatch()
    const quizInfo = useAppSelector((state) => state.quiz);
    useEffect(() => {
        if (quizInfo.listQuiz.length === 0) {
            dispatch(getQuizList());
        }
    }, [])
    return (
        <div>
            <div className="my-6">
                <Title>Most Popular</Title>
                <div className="w-full h-fit flex justify-center">
                    <div className="w-[1400px] my-3 h-fit px-[100px] hidden lg:flex">
                        <div className="h-fit w-full shadow-[0_2px_25px_-0px_rgba(0,0,0,0.3)] rounded-xl p-4 flex justify-between items-center flex-wrap">
                            {
                                quizInfo.listQuiz.map((item, index) => (
                                    <Item image={item.thumb} key={index} title={item.title} width={3} id={item._id} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-[1400px] my-3 h-fit px-[100px] lg:hidden md:flex hidden">
                        <div className="h-fit w-full shadow-[0_2px_25px_-0px_rgba(0,0,0,0.3)] rounded-xl p-4 flex justify-between items-center flex-wrap">
                            {
                                quizInfo.listQuiz.map((item, index) => (
                                    <Item image={item.thumb} key={index} title={item.title} width={2} id={item._id} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-[1400px] my-3 h-fit px-[30px] sm:px-[100px] md:hidden flex">
                        <div className="h-fit w-full shadow-[0_2px_25px_-0px_rgba(0,0,0,0.3)] rounded-xl p-4 flex justify-between items-center flex-wrap">
                            {
                                quizInfo.listQuiz.map((item, index) => (
                                    <Item image={item.thumb} key={index} title={item.title} width={1} id={item._id} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[150px] my-6 flex justify-center items-center">
                <div className="w-[1200px] h-full">

                </div>
            </div>
            <div className="my-6">
                <Title>The Latest</Title>
                <div className="w-full h-fit flex justify-center">
                    <div className="w-[1400px] my-3 h-fit px-[100px] hidden lg:flex">
                        <div className="h-fit w-full shadow-[0_2px_25px_-0px_rgba(0,0,0,0.3)] rounded-xl p-4 flex justify-between items-center flex-wrap">
                            {
                                quizInfo.listQuiz.map((item, index) => (
                                    <Item image={item.thumb} key={index} title={item.title} width={3} id={item._id} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-[1400px] my-3 h-fit px-[100px] lg:hidden md:flex hidden">
                        <div className="h-fit w-full shadow-[0_2px_25px_-0px_rgba(0,0,0,0.3)] rounded-xl p-4 flex justify-between items-center flex-wrap">
                            {
                                quizInfo.listQuiz.map((item, index) => (
                                    <Item image={item.thumb} key={index} title={item.title} width={2} id={item._id} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-[1400px] my-3 h-fit px-[30px] sm:px-[100px] md:hidden flex">
                        <div className="h-fit w-full shadow-[0_2px_25px_-0px_rgba(0,0,0,0.3)] rounded-xl p-4 flex justify-between items-center flex-wrap">
                            {
                                quizInfo.listQuiz.map((item, index) => (
                                    <Item image={item.thumb} key={index} title={item.title} width={1} id={item._id} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[150px] my-6 flex justify-center items-center">
                <div className="w-[1200px] h-full">

                </div>
            </div>
            <div className="my-6">
                <Title>You May Like</Title>
                <div className="w-full h-fit flex justify-center">
                    <div className="w-[1400px] my-3 h-fit px-[100px] hidden lg:flex">
                        <div className="h-fit w-full shadow-[0_2px_25px_-0px_rgba(0,0,0,0.3)] rounded-xl p-4 flex justify-between items-center flex-wrap">
                            {
                                quizInfo.listQuiz.map((item, index) => (
                                    <Item image={item.thumb} key={index} title={item.title} width={3} id={item._id} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-[1400px] my-3 h-fit px-[100px] lg:hidden md:flex hidden">
                        <div className="h-fit w-full shadow-[0_2px_25px_-0px_rgba(0,0,0,0.3)] rounded-xl p-4 flex justify-between items-center flex-wrap">
                            {
                                quizInfo.listQuiz.map((item, index) => (
                                    <Item image={item.thumb} key={index} title={item.title} width={2} id={item._id} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-[1400px] my-3 h-fit px-[30px] sm:px-[100px] md:hidden flex">
                        <div className="h-fit w-full shadow-[0_2px_25px_-0px_rgba(0,0,0,0.3)] rounded-xl p-4 flex justify-between items-center flex-wrap">
                            {
                                quizInfo.listQuiz.map((item, index) => (
                                    <Item image={item.thumb} key={index} title={item.title} width={1} id={item._id} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center items-center my-4">
                <Button
                    title="Next Test"
                    className="w-[300px] py-5 font-semibold text-xl text-[#ffffff] hover:scale-[1.1] transition-all"
                    onClick={() => { }}
                />
            </div>
        </div>

    );
}
