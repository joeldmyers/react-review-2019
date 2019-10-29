import React, { useEffect, useRef, FunctionComponent } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal: FunctionComponent = ({ children }) => {
  const elRef = useRef(document.createElement("div"));
  // cleanup on component unmounted. We have to do our own
  useEffect(() => {
    if (!modalRoot) {
      return;
    }

    modalRoot.appendChild(elRef.current);

    return () => {
      modalRoot.removeChild(elRef.current);
    };
  }, []); // only want this to run once.

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
