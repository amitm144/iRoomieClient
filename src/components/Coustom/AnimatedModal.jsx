import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "@/components/ui/animated-modal";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";

function ModalContents({ label, children }) {
  const [animationClass, setAnimationClass] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const { setOpen } = useModal();

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setAnimationClass("");
        setIsAnimating(false);
        setOpen(false);
      }, 300); // Adjust this to match your animation duration

      return () => clearTimeout(timer);
    }
  }, [isAnimating, setOpen]);

  const closeWithAnimation = (direction) => {
    if (!isAnimating) {
      setAnimationClass(
        direction === "left" ? "animate-swipe-left" : "animate-swipe-right"
      );
      setIsAnimating(true);
    }
  };

  return (
    <>
      <ModalTrigger
        className="bg-blue-gray-800 rounded-e-none rounded-es-none rounded-ss-2xl px-8 py-4
        text-white flex justify-center group/modal-btn"
      >
        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
          {label || "View Details"}
        </span>
        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
          <ChairOutlinedIcon />
        </div>
      </ModalTrigger>

      <ModalBody className={`mx-2 rounded-2xl ${animationClass}`}>
        <ModalContent className="overflow-scroll" >
          {children}
        </ModalContent>

        <ModalFooter className="gap-4">
          <button
            onClick={() => closeWithAnimation("left")}
            className="bg-gray-400 text-white text-sm px-2 py-1 rounded-md border w-28 hover:bg-red-600 transition-colors"
          >
            Pass
          </button>
          <button
            onClick={() => closeWithAnimation("right")}
            className="bg-blue-600 text-white text-sm px-2 py-1 rounded-md border w-28 hover:bg-blue-600 transition-colors"
          >
            Like
          </button>
        </ModalFooter>
      </ModalBody>
    </>
  );
}

export default function AnimatedModal({ label, children }) {
  return (
    <Modal>
      <ModalContents label={label}>{children}</ModalContents>
    </Modal>
  );
}
