import React from "react";
import "../App.css"; // Make sure to import your styles

function Modal({ show, onClose, url }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={url} alt="Full Size" className="modal-image" />
      </div>
    </div>
  );
}

export default Modal;
