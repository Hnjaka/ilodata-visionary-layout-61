
import { useState } from 'react';

export const useAuthState = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showConfirmationResend, setShowConfirmationResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage(null);
    setShowForgotPassword(false);
    setShowConfirmationResend(false);
  };

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
    setErrorMessage(null);
    setShowConfirmationResend(false);
  };

  // Helper to set error message with proper logging
  const setError = (message: string, error?: any) => {
    if (error) {
      console.error("Authentication error:", error);
    }
    setErrorMessage(message);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    setLoading,
    isSignUp,
    setIsSignUp,
    showForgotPassword,
    setShowForgotPassword,
    showConfirmationResend,
    setShowConfirmationResend,
    errorMessage,
    setErrorMessage,
    toggleSignUp,
    toggleForgotPassword,
    setError
  };
};
