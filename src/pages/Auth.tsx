
import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { useAuthForm } from '@/hooks/useAuthForm';
import AuthForm from '@/components/auth/AuthForm';
import AuthError from '@/components/auth/AuthError';
import ResendConfirmationButton from '@/components/auth/ResendConfirmationButton';
import ToggleAuthMode from '@/components/auth/ToggleAuthMode';

const Auth = () => {
  const { user } = useAuth();
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    isSignUp,
    showConfirmationResend,
    errorMessage,
    handleAuth,
    handleResendConfirmation,
    toggleSignUp
  } = useAuthForm();
  
  // Check if user is already logged in
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-center mb-6">
              {isSignUp ? "Créer un compte" : "Connexion"}
            </h1>
            
            <AuthError errorMessage={errorMessage} />
            
            <AuthForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              isSignUp={isSignUp}
              loading={loading}
              onSubmit={handleAuth}
            />
            
            {showConfirmationResend && (
              <ResendConfirmationButton
                loading={loading}
                onResend={handleResendConfirmation}
              />
            )}
            
            <ToggleAuthMode
              isSignUp={isSignUp}
              onToggle={toggleSignUp}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
