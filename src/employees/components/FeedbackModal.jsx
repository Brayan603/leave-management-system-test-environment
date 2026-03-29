import React from "react";
import "../styles/feedbackModal.css";

const FeedbackModal = ({ show, type = "success", message, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-box ${type}`}>
        
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {/* Icon */}
        <div className="modal-icon">
          {type === "success" && "✅"}
          {type === "error" && "❌"}
          {type === "warning" && "⚠️"}
        </div>

        {/* Message */}
        <h2 className="modal-message">{message}</h2>

        {/* Action Button */}
        <button className="modal-btn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;