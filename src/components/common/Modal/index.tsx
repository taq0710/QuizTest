"use client"
import { FC, ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ReactModal from 'react-modal';

interface IProps {
  isOpen: boolean;
  title: ReactNode;
  titleSize?: "sm" | "lg";
  description?: string;
  children: ReactNode;
  size?: "sm" | "lg" | "xl";
  modalWidth?: string;
  disableOverflow?: boolean;
  disableClose?: boolean;
  onClose: () => void;
}

const Modal: FC<IProps> = ({
  isOpen,
  title,
  titleSize = "sm",
  description,
  children,
  size = "sm",
  modalWidth,
  disableOverflow,
  disableClose = true,
  onClose,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.75)",
          zIndex: 50,
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "90%",
          maxHeight: "95vh",
          paddingBottom: disableClose ? "20px" : 0,
          paddingTop: disableClose ? "20px" : 0,
          width: modalWidth
            ? modalWidth
            : size === "sm"
            ? "30rem"
            : size === "lg"
            ? "40rem"
            : "90%",
          overflow: !disableOverflow ? "auto" : "visible",
        },
      }}
    >
      <div
        className="flex justify-between items-center"
      >
        <span
          className={`font-semibold text-[#5B5F7B] text-[14px] ${
            titleSize === "lg"&&"text-[14px]"
          }`}
        >
          {title}
        </span>
        {disableClose && (
          <button
            className="text-xl text-red-500 focus:outline-none"
            onClick={onClose}
          >
            <AiOutlineClose />
          </button>
        )}
      </div>
      {description && (
        <div className="mt-2 mb-4 text-sm text-neutral-400">{description}</div>
      )}
      <div className={`${ !disableOverflow && "overflow-auto"}`}>
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;