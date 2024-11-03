import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, AuthState } from '../types/user';
import { useNavigate } from 'react-router-dom';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  upgradeToPremium: () => Promise<void>;
  startAssessment: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const navigate = useNavigate();

  // Add authentication methods here
  const login = async (email: string, password: string) => {
    try {
      // Mock API call
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Simulate API validation
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      const user = { 
        id: '1', 
        email, 
        name: 'User', 
        isPremium: false, 
        dietaryPreferences: [], 
        allergies: [], 
        healthGoals: [], 
        assessmentCompleted: false 
      };
      setAuthState({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      console.error('Login failed:', error);
      throw new Error(error.message || 'Invalid email or password');
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      // Validate inputs
      if (!email || !password || !name) {
        throw new Error('All fields are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Mock API call
      const user = { 
        id: '1', 
        email, 
        name, 
        isPremium: false, 
        dietaryPreferences: [], 
        allergies: [], 
        healthGoals: [], 
        assessmentCompleted: false 
      };
      setAuthState({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      console.error('Signup failed:', error);
      throw new Error(error.message || 'Failed to create account');
    }
  };

  const logout = async () => {
    // Implement logout logic
    setAuthState({ user: null, isAuthenticated: false, isLoading: false });
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!authState.user) return;
    // Implement profile update logic
    setAuthState({
      ...authState,
      user: { ...authState.user, ...updates },
    });
  };

  const upgradeToPremium = async () => {
    if (!authState.user) return;
    
    setAuthState({
      ...authState,
      user: { ...authState.user, isPremium: true }
    });
    
    // Redirect to assessment
    navigate('/assessment');
  };

  const startAssessment = async () => {
    if (!authState.user?.isPremium) {
      throw new Error('Premium subscription required');
    }
    navigate('/assessment');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout, updateProfile, upgradeToPremium, startAssessment }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
