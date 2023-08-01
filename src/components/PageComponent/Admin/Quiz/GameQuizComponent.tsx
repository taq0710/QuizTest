"use client"
import React from 'react';
import Input from '../../../common/Input';

interface IGameQuizComponent {
  sourceId: string;
  setSourceId: React.Dispatch<React.SetStateAction<string>>;
}

const GameQuizComponent = ({ sourceId, setSourceId }: IGameQuizComponent) => {
  return (
    <div className="flex flex-col gap-2">
      <span>SourceId</span>
      <Input
        inputClassName="border-[#000000]"
        value={sourceId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSourceId(e.target.value)}
      />
    </div>
  );
};

export default React.memo(GameQuizComponent);
