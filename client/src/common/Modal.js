import React, { useEffect } from "react";
import "./Modal.css"; // Стили для модального окна

export const Modal = ({ isOpen, onClose, children, isOpenSearch }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Запрещаем прокрутку
    } else if(isOpen && isOpenSearch) {
      document.body.style.overflow = ""; // Восстанавливаем прокрутку
    } else{
      document.body.style.overflow = ""; 
    }

    // Чистка эффекта при размонтировании
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};
