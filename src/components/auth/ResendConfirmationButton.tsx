
import React from 'react';
import { Button } from '@/components/ui/button';

interface ResendConfirmationButtonProps {
  loading: boolean;
  onResend: () => Promise<void>;
}

const ResendConfirmationButton: React.FC<ResendConfirmationButtonProps> = ({
  loading,
  onResend
}) => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full mt-2"
      disabled={loading}
      onClick={onResend}
    >
      Renvoyer l'email de confirmation
    </Button>
  );
};

export default ResendConfirmationButton;
