
import React from 'react';
import { Link } from 'react-router-dom';

interface MobileQuoteButtonProps {
  onLinkClick: () => void;
}

const MobileQuoteButton: React.FC<MobileQuoteButtonProps> = ({ onLinkClick }) => {
  return (
    <Link 
      to="/contact" 
      className="w-full button-quote flex items-center justify-center"
      onClick={onLinkClick}
    >
      Demandez un devis
    </Link>
  );
};

export default MobileQuoteButton;
