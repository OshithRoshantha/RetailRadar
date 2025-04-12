import React, { useState } from 'react';
import './css/LogoutConfirmation.css'; 

interface LogoutConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const LogoutConfirmation: React.FC<LogoutConfirmationProps> = ({
  onConfirm,
  onCancel,
  isOpen,
  title = 'Logout',
  message = 'Are you sure you want to logout?',
  confirmText = 'Logout',
  cancelText = 'Cancel',
}) => {
  if (!isOpen) return null;

  return (
    <div className="logout-confirmation-overlay">
      <div className="logout-confirmation-dialog">
        <h3 className="logout-confirmation-title">{title}</h3>
        <p className="logout-confirmation-message">{message}</p>
        
        <div className="logout-confirmation-buttons">
          <button 
            onClick={onCancel}
            className="logout-confirmation-cancel"
          >
            {cancelText}
          </button>
          
          <button 
            onClick={onConfirm}
            className="logout-confirmation-confirm"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;