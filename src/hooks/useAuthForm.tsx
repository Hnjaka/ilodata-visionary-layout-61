
import { useNavigate } from 'react-router-dom';
import { useAuthState } from './auth/useAuthState';
import { useAuthentication } from './auth/useAuthentication';
import { usePasswordReset } from './auth/usePasswordReset';
import { useConfirmation } from './auth/useConfirmation';

export const useAuthForm = () => {
  const navigate = useNavigate();
  
  // Compose from smaller hooks
  const {
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
  } = useAuthState();
  
  const { handleAuth } = useAuthentication();
  const { handleResetPassword } = usePasswordReset();
  const { handleResendConfirmation } = useConfirmation();

  // Wrap handlers to provide necessary state
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleAuth(
      isSignUp, 
      email, 
      password, 
      setLoading, 
      setError,
      setIsSignUp,
      setShowConfirmationResend
    );
    return;
  };

  const handlePasswordReset = async (resetEmail: string) => {
    await handleResetPassword(resetEmail, () => setShowForgotPassword(false));
    return;
  };

  const handleConfirmationResend = async () => {
    await handleResendConfirmation(email, setLoading, setError);
    return;
  };

  return {
    // State
    email,
    setEmail,
    password,
    setPassword,
    loading,
    isSignUp,
    showForgotPassword,
    showConfirmationResend,
    errorMessage,
    
    // Actions
    handleAuth: handleAuthSubmit,
    handleResetPassword: handlePasswordReset,
    handleResendConfirmation: handleConfirmationResend,
    toggleSignUp,
    toggleForgotPassword
  };
};
