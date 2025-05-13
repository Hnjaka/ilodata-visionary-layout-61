
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-gray-50 pt-24">
        <div className="text-center px-4 py-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-2xl text-gray-600 mb-8">Oops! Page non trouvée</p>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-ilodata-600 hover:bg-ilodata-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ilodata-500"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
