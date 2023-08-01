import Button from "@/components/common/Button";
import React, { useRef } from "react";
import { IconContext } from "react-icons";
import { FaUserAlt } from "react-icons/fa";

export interface ResultProps {
  image?: string;
  title?: string;
  score: number;
  total: number;
  name?: string;
  resultComment: string;
  handleShareResult: () => void;
  resultRef: any;
}

export default function Result({
  image,
  title,
  score,
  total,
  name,
  resultComment,
  handleShareResult,
  resultRef,
}: ResultProps) {
  const handleShare = async () => {
    handleShareResult();
  };
  return (
    <div className="w-full h-fit">
      <div ref={resultRef} className="rounded-xl overflow-hidden p-4">
        <h1 className="capitalize text-3xl pb-5">{title}</h1>
        <div className=" w-full pt-[55%] relative rounded-xl overflow-hidden">
          <div className="w-full h-full absolute top-0 left-0">
            <div className="w-full h-full bg-[#FEAC48] flex items-center justify-center">
              <div className="basis-1/2 flex flex-col justify-center items-center">
                <div className="w-[100px] md:w-[180px] h-[100px] md:h-[180px] rounded-full overflow-hidden bg-white">
                  {image ? (
                    <img
                      src={image}
                      alt={title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <IconContext.Provider
                      value={{
                        color: "#FE7900",
                      }}
                    >
                      <div className="h-full w-full flex justify-center items-center">
                        <FaUserAlt size={100} />
                      </div>
                    </IconContext.Provider>
                  )}
                </div>
                <div className="capitalize text-[#fff] font-semibold text-xl md:text-2xl mt-2 whitespace-nowrap">
                  {name ? name : "You"}
                </div>
              </div>
              <div className="basis-1/2 flex flex-col justify-center items-center">
                <div className="flex w-full items-center text-md sm:text-lg md:text-xl font-semibold text-white">
                  <div className="whitespace-nowrap">Score:</div>
                  <div className="pl-2">
                    {score} / {total}
                  </div>
                </div>
                <div className="flex w-full text-md sm:text-lg md:text-xl font-semibold text-white">
                  <div className="">Result:</div>
                  <div className="pl-2">{resultComment}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-2 p-4">
        <p className="text-center text-3xl font-semibold text-[#FE7900] mb-4">
          Share Your Result By
        </p>
        <div className="flex justify-center items-center space-x-4">
          <div
            className="h-[50px] flex justify-center items-center hover:cursor-pointer w-[300px] py-1 font-semibold text-xl text-[#FE7900] border-solid border-[1px] border-[#FE7900] bg-[#ffffff] hover:scale-[1.1] transition-all rounded-md"
            onClick={() => {}}
          >
            <img
              className="m-2 h-full object-contain"
              src="/images/share_icon_facebook_hover.png"
              alt="testquizs facebook"
              onClick={() => handleShare()}
            />
            <p>Share on Facebook</p>
          </div>
          <div
            className="h-[50px] flex justify-center items-center hover:cursor-pointer w-[300px] py-1 font-semibold text-xl text-[#FE7900] border-solid border-[1px] border-[#FE7900] bg-[#ffffff] hover:scale-[1.1] transition-all rounded-md"
            onClick={() => {}}
          >
            <img
              className="m-2 h-full object-contain"
              src="/images/share_icon_twitter_hover.png"
              alt="testquizs Twitter"
            />
            <p>Share on Twitter</p>
          </div>
        </div>
        <div className="my-4">
          <p className="text-center text-xl">What do you think?</p>
          <div className="flex justify-center items-center w-full space-x-4 mt-3">
            <div className="w-[40px] h-[40px] rounded-full hover:cursor-pointer hover:scale-[1.1] transition-all">
              <img
                src="/images/Love.svg"
                alt="love"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="w-[40px] h-[40px] rounded-full hover:cursor-pointer hover:scale-[1.1] transition-all">
              <img
                src="/images/Lol.svg"
                alt="Lol"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="w-[40px] h-[40px] rounded-full hover:cursor-pointer hover:scale-[1.1] transition-all">
              <img
                src="/images/Like.svg"
                alt="like"
                className="h-full w-full object-contain"
              />
            </div>
            <div
              className="w-[40px] h-[40px] rounded-full hover:cursor-pointer 
            hover:scale-[1.1] transition-all"
            >
              <img
                src="/images/sad.svg"
                alt="sad"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="w-[40px] h-[40px] rounded-full hover:cursor-pointer hover:scale-[1.1] transition-all">
              <img
                src="/images/angry.svg"
                alt="angry"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center space-y-4 mt-8">
          <Button
            title="Next Test"
            className="w-[300px] py-5 font-semibold text-xl text-[#ffffff] hover:scale-[1.1] transition-all"
            onClick={() => {}}
          />
          <Button
            title="Test Again"
            className="w-[300px] py-5 font-semibold text-xl text-[#FE7900] border-solid border-[1px] border-[#FE7900] bg-[#ffffff] hover:scale-[1.1] transition-all"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
