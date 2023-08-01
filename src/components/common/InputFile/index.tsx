"use client"
import React, { useRef } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineClose } from 'react-icons/ai';
import { uploadFile } from '../../../utils/upload.api';

interface IInputFile {
  setImageUrl?: (url: string | null) => void;
}

const InputFile = ({ setImageUrl }: IInputFile) => {
  const [imagePreview, setImagePreview] = React.useState<string | null>();

  const inputFileRef = useRef<HTMLInputElement>();
  const wrapperImageRef = useRef<HTMLDivElement>();

  const onDragEnter = () => wrapperImageRef.current?.classList.add('dragover');

  const onDragLeave = () => wrapperImageRef.current?.classList.remove('dragover');

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    wrapperImageRef.current?.classList.remove('dragover');
    handleImageData(e.dataTransfer.files);
  };

  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageData(e.target.files);
  };

  const handleImageData = async (files: FileList | null) => {
    if (files && files.length > 0) {
      setImagePreview(URL.createObjectURL(files[0]));
      try {
        const result = await uploadFile(files[0]);
        setImageUrl!(result[0]);
      } catch (error) {
        setImageUrl!(null);
        throw error;
      }
    } else {
      setImagePreview(null);
    }
  };

  const handleCloseImagePreview = () => {
    setImagePreview(null);
  };

  return (
    <>
      <div
        className={`border-dashed flex justify-center items-center border-2 rounded transition relative w-full h-full  ${
          !imagePreview && 'cursor-pointer hover:bg-orange-50'
        }`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onClick={() => !imagePreview && inputFileRef.current?.click()}
      >
        {imagePreview ? (
          <div className="absolute h-full">
            <img src={imagePreview} alt="" className="h-full" />
            <div className="absolute top-0 right-0 cursor-pointer" onClick={handleCloseImagePreview}>
              <IconContext.Provider
                value={{
                  color: '#fff',
                }}
              >
                <div>
                  <AiOutlineClose size={15} />
                </div>
              </IconContext.Provider>
            </div>
          </div>
        ) : (
          <span>Click to upload or drag and drop SVG, PNG, JPG or GIF (MAX. 800x400px)</span>
        )}
      </div>
      <input
        ref={inputFileRef as React.LegacyRef<HTMLInputElement>}
        type={'file'}
        onChange={handleInputFileChange}
        className="invisible"
        accept="image/*"
        key={imagePreview || ''}
      />
    </>
  );
};

export default InputFile;
