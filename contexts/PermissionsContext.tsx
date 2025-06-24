import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface PermissionsContextType {
  hasPermission: (permission: string) => boolean;
  permissions: string[];
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export const usePermissions = () => {
  const context = useContext(PermissionsContext);
  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};

interface PermissionsProviderProps {
  children: ReactNode;
}

export const PermissionsProvider: React.FC<PermissionsProviderProps> = ({ children }) => {
  const { user } = useAuth();

  // Mock permissions - return true for everything initially as requested
  const hasPermission = (permission: string): boolean => {
    return true; // Always return true for initial version
  };

  // Mock permissions list
  const permissions = [
    'dashboard:view',
    'student:create',
    'student:view',
    'student:update',
    'teacher:create',
    'teacher:view',
    'teacher:update',
    'attendance:take',
    'attendance:view',
    'fee:create',
    'fee:view',
    'school:manage',
    'user:manage'
  ];

  const value: PermissionsContextType = {
    hasPermission,
    permissions
  };

  return (
    <PermissionsContext.Provider value={value}>
      {children}
    </PermissionsContext.Provider>
  );
};