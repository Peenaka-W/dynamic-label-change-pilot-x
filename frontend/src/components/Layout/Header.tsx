import React from 'react';
import type{ TenantId } from '../../types';

interface HeaderProps {
  currentTenant: TenantId;
  onTenantChange: (tenant: TenantId) => void;
}

const Header: React.FC<HeaderProps> = ({ currentTenant, onTenantChange }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Lending</h1>
          <div className="flex items-center">
            <span className="mr-2 text-gray-600">Tenant:</span>
            <div className="flex space-x-2">
              <button
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  currentTenant === 'tenant1'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => onTenantChange('tenant1')}
              >
                Tenant 1
              </button>
              <button
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  currentTenant === 'tenant2'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => onTenantChange('tenant2')}
              >
                Tenant 2
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;