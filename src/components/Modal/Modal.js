import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root");

export default function Modal({ children, onClose, bg }) {
  const [isOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, navigate, onClose]);

  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.overlay}
      onClick={onOverlayClick}
      style={{
        background: "rgba(47, 48, 58, 1)",
        backgroundImage: `linear-gradient(rgba(47, 48, 58, 0.5), rgba(47, 48, 58, 0.5)), ${bg}`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}
