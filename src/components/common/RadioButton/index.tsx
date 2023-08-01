"use client"
import { FC, InputHTMLAttributes, ReactNode, useRef } from 'react';
import { IconContext } from 'react-icons';
import { BsCircle, BsRecordCircle} from 'react-icons/bs';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  align?: 'top' | 'center';
  block?: boolean;
  error?: boolean;
  blue?: boolean;
  className?: string;
  color?: string;
}

const Radio: FC<IProps> = ({ label, align = 'center', block, error, checked, blue = false, className, color = '#000', ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`flex cursor-pointer'
        ${align === 'center' && 'items-center'}
        ${!block && 'w-fit'}
        ${error && 'text-red-500'}
        ${className}`}
      onClick={() => inputRef.current?.click()}
    >
      <input type="radio" hidden {...props} ref={inputRef} />
      <div className={`w-8 flex-shrink-0 text-xl ${align === 'top' && 'mt-1'}`}>
        {checked ? (
          blue ? (
            <IconContext.Provider
              value={{
                color,
              }}
            >
              <div>
                <BsCircle className="text-[#041AFD] text-2xl" />
              </div>
            </IconContext.Provider>
          ) : (
            <IconContext.Provider
              value={{
                color,
              }}
            >
              <div>
                <BsRecordCircle className="text-xl" />
              </div>
            </IconContext.Provider>
          )
        ) : (
          <IconContext.Provider
            value={{
              color,
            }}
          >
            <div>
              <BsCircle className="text-xl" />
            </div>
          </IconContext.Provider>
        )}
      </div>
      <div className="text-sm">{label}</div>
    </div>
  );
};

export default Radio;
