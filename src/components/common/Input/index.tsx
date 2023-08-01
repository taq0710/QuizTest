"use client"
import React, { FC, InputHTMLAttributes, ReactNode } from 'react';
import { useToggle } from 'react-use';

import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  description?: string;
  placeholder?: string;
  iconTitle?: ReactNode;
  value?: string;
  block?: boolean;
  width?: 'md' | 'lg' | 'base' | 'xl';
  inputClassName?: string;
  pattern?: 'base' | 'highlight' | 'modal';
  flight?: boolean;
  error?: ReactNode;
  iconRight?: ReactNode;
}

const Input: FC<IProps> = React.forwardRef<HTMLInputElement, IProps>(
  (
    {
      type,
      title,
      value,
      description,
      placeholder,
      iconTitle,
      block,
      width = 'xl',
      inputClassName,
      className,
      pattern = 'base',
      iconRight,
      flight = false,
      error,
      onChange,
      ...props
    },
    ref
  ) => {
    const [showPassword, toggleShowPassword] = useToggle(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
    };
    return (
      <div className={`flex flex-col relative ${block && 'w-full'} ${className}`}>
        {title && (
          <div
            className={`
            font-medium flex items-center text-[13px] 
            ${pattern === 'base' && 'text-[#FE7900]'},
            ${pattern === 'highlight' && 'text-[#FF9533]'},
            ${pattern === 'modal' && 'text-[#FE7900]'}`}
          >
            {iconTitle && <span className="mr-2">{iconTitle}</span>}
            <span>{title}</span>
          </div>
        )}
        {description && (
          <div className={`flex justify-between items-center mb-2 mt-1 ${!description && 'absolute top-0 right-0'}`}>
            {description && <div className="flex-auto text-xs text-neutral-400">{description}</div>}
          </div>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={type === 'password' && showPassword ? 'text' : type}
            className={`
             border  text-[#505470] focus:outline-none px-1 placeholder-[#505470] 
            ${type === 'password' && 'pr-8 '}
            ${pattern === 'base' && 'border-[#FE7900] '}
            ${pattern === 'highlight' && 'border-[#FF9533] '}
            ${pattern === 'modal' && 'border-[#E4E6EE] focus:border-[#575C76] '}
            ${flight ? 'py-[4px] ' : 'py-[5px] '}
            ${width === 'xl'
                ? 'w-full '
                : width === 'lg'
                  ? 'w-[150px] '
                  : width === 'base'
                    ? 'w-[80px] '
                    : width === 'md'
                      ? 'w-[52px] '
                      : 'w-[52px] '
              }
            ${iconRight ? 'rounded-[100px] ' : 'rounded-[4px] '}
            ${error ? 'border-red-500 ' : ''}
            ${inputClassName}
          `}
            placeholder={placeholder}
            value={value}
            onChange={(e) => handleChange(e)}
            {...props}
          />
          {iconRight && <div className="absolute inset-y-0 left-0 flex items-center justify-center w-8">{iconRight}</div>}
          {type === 'password' && (
            <div className="absolute inset-y-0 right-0 flex items-center justify-center w-8">
              <button type="button" className="focus:outline-none text-neutral-500" onClick={toggleShowPassword}>
                {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
              </button>
            </div>
          )}
        </div>
        {!!error && <div className="mt-1 text-sm text-red-500">{error}</div>}
      </div>
    );
  }
);

export default Input;
