import "./style.css";
import { useEffect, useRef } from "react";
interface IProps {
  isOpen: boolean;
  setIsOverlayOpen(isOpen: boolean): void;
  children: JSX.Element;
}
export default function Overlay(props: IProps) {
  const overlayRef = useRef<any>();

  const openOverlay = () => {
    overlayRef.current.style.width = "100%";
  };

  // This function is called when the "Close" button is clicked
  const closeOverlay = () => {
    props.setIsOverlayOpen(false);
    overlayRef.current.style.width = "0%";
  };
  useEffect(() => {
    if (props.isOpen) {
      openOverlay();
    } else {
      closeOverlay();
    }
    return () => {};
  }, [props.isOpen]);
  return (
    <>
      {/* <div className="container"> */}
        <div ref={overlayRef} className="overlay">
          <button className="close-button" onClick={closeOverlay}>
            &times;
          </button>
          <div className="overlay-content container">{props.children}</div>
        </div>
      {/* </div> */}
    </>
  );
}
