import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

type NotificationType = 'success' | 'error';

interface NotificationProps {
  message: string;
  type: NotificationType;
  duration?: number;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow time for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-400';
      case 'error':
        return 'bg-red-50 border-red-400';
      default:
        return 'bg-gray-50 border-gray-400';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      default:
        return 'text-gray-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'error':
        return <AlertCircle className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 flex items-center p-4 border rounded-md shadow-md transition-all duration-300 ${getBackgroundColor()} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
      role="alert"
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-2">{getIcon()}</div>
        <div className={`text-sm font-medium ${getTextColor()}`}>{message}</div>
      </div>
      <button
        className="ml-4 text-gray-400 hover:text-gray-500 focus:outline-none"
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Notification;