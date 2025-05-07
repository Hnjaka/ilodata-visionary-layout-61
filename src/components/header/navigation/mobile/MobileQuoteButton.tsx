
import React from 'react';
import { Link } from 'react-router-dom';

interface MobileQuoteButtonProps {
  onLinkClick: () => void;
}

const MobileQuoteButton: React.FC<MobileQuoteButtonProps> = ({ onLinkClick }) => {
  return (
    <Link 
      to="/contact" 
      className="button-quote w-full text-center mt-2"
      onClick={onLinkClick}
    >
      Demandez un devis
    </Link>
  );
};

export default MobileQuoteButton;
