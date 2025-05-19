import React from 'react';
import type{ ScreenName } from '../../types';

interface NavigationProps {
  currentScreen: ScreenName;
  onScreenChange: (screen: ScreenName) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentScreen, onScreenChange }) => {
  return (
    <nav className="mt-6 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4">
          <button
            className={`px-6 py-3 rounded-md transition-all duration-200 ${
              currentScreen === 'Lead Generation'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => onScreenChange('Lead Generation')}
          >
            Lead Generation
          </button>
          <button
            className={`px-6 py-3 rounded-md transition-all duration-200 ${
              currentScreen === 'Customer Details'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => onScreenChange('Customer Details')}
          >
            Customer Details
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;