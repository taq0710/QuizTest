import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { ImSpinner2 } from "react-icons/im";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: ReactNode;
  variant?:
    | "fill"
    | "outline"
    | "transparent"
    | "border"
    | "outlinetransparent";
  size?: "sm" | "md" | "lg";
  block?: boolean;
  bold?: boolean;
  underline?: boolean;
  loading?: boolean;
  background?: "primary" | "black";
  className?: string;
  onClick?: () => void;
}

const Button: FC<IProps> = ({
  title,
  icon,
  variant = "fill",
  size = "md",
  block,
  bold,
  underline,
  disabled,
  background = "primary",
  loading,
  className,
  onClick = () => {},
  ...props
}) => {
  return (
    <button
      disabled={loading || disabled}
      onClick={onClick}
      className={
        `
        ${
          variant === "fill"?" disabled:bg-neutral-500 ": 
          variant === "outline"?"text-gray-500 disabled:border-neutral-400 disabled:text-neutral-400 ":
          variant === "border"?"text-gray-500 border-neutral-400  border ":
          variant === "transparent"?"border-none ":
          "text-[#171717] text-xs font-semibold py-[8px] px-5 border-[1px] border-solid border-[#E5E5E5] rounded-[100px] bg-white "
        }

        ${background === "primary"?"bg-[#FE7900] rounded-[15px] text-black ":
        background === "black"? "bg-[#101010] rounded-lg ":" " }
        ${size === "sm"? "px-2 py-0.5 ": size === "md"? "px-4 py-3 ":"px-6 py-3 "}
        ${ block && "w-full "}
        ${bold&& "font-semibold " }
        "text-white flex justify-center items-center "
        ${className}`
      }
      {...props}
    >
      {icon && <div className="mr-2">{icon}</div>}
      {loading&&<ImSpinner2 className="animate-spin"/>}
      <span
        className={
          `
          ${ variant === "outlinetransparent" && "text-xs "}
          ${ underline }`
        }
      >
        {title}
      </span>
    </button>
  );
};

export default Button;
