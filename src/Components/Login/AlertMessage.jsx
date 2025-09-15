import React from "react";
import { AlertCircle, CheckCircle, X } from "lucide-react";

const AlertMessage = ({ type, title, message, onClose }) => {
  const styles = {
    error: {
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      icon: <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />,
      titleColor: "text-red-800 dark:text-red-200",
      textColor: "text-red-700 dark:text-red-300",
      closeColor: "text-red-400 hover:text-red-600"
    },
    success: {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      icon: <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />,
      titleColor: "text-green-800 dark:text-green-200",
      textColor: "text-green-700 dark:text-green-300",
      closeColor: "text-green-400 hover:text-green-600"
    }
  };

  const style = styles[type];

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md animate-slideDown">
      <div className={`${style.bg} ${style.border} border rounded-lg p-4 shadow-lg`}>
        <div className="flex items-start gap-3">
          {style.icon}
          <div className="flex-1 min-w-0">
            <h3 className={`text-sm font-semibold ${style.titleColor} mb-1`}>
              {title}
            </h3>
            <p className={`text-sm ${style.textColor} break-words`}>
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`${style.closeColor} transition-colors`}
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default AlertMessage;