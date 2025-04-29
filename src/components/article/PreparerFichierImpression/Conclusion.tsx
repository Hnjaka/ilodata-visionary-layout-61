
import React from 'react';
import { Link } from 'react-router-dom';

const Conclusion = () => {
  return (
    <section id="conclusion" className="border-t border-gray-200 pt-6 mt-8">
      <p>
        Ces conseils vous ont été utiles ? Découvrez nos <Link to="/guides" className="text-ilodata-600 hover:text-ilodata-800">autres guides pour auteurs</Link> ou partagez votre expérience en commentaire !
      </p>
    </section>
  );
};

export default Conclusion;
