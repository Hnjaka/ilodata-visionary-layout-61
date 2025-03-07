
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, Download, ChevronRight, ShoppingCart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useToast } from '@/hooks/use-toast';

// PayPal button component for checkout
const PayPalCheckout = ({ 
  amount, 
  title,
  onSuccess 
}: { 
  amount: string; 
  title: string;
  onSuccess: () => void;
}) => {
  const { toast } = useToast();
  const numericAmount = amount.replace(/[^0-9]/g, '');
  
  return (
    <div className="w-full mt-4">
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: `Achat de modèle: ${title}`,
                amount: {
                  value: numericAmount,
                  currency_code: "EUR"
                },
                payee: {
                  email_address: "contact@layoutforall.com"
                }
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order!.capture().then((details) => {
            console.log("Payment completed", details);
            toast({
              title: "Paiement réussi !",
              description: `Merci pour votre achat du modèle ${title}.`,
            });
            onSuccess();
          });
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          toast({
            title: "Erreur de paiement",
            description: "Une erreur s'est produite lors du traitement de votre paiement. Veuillez réessayer.",
            variant: "destructive"
          });
        }}
        style={{ layout: "vertical" }}
      />
    </div>
  );
};

const ModelCard = ({ 
  title, 
  description, 
  price, 
  features 
}: { 
  title: string;
  description: string;
  price: string;
  features: string[];
}) => {
  const [isPaid, setIsPaid] = useState(false);
  const [showPaypal, setShowPaypal] = useState(false);
  const { toast } = useToast();

  const handlePurchase = () => {
    if (isPaid) {
      // If already paid, allow download
      toast({
        title: "Téléchargement commencé",
        description: `Le téléchargement de votre modèle ${title} a commencé.`,
      });
    } else {
      // Show PayPal checkout
      setShowPaypal(true);
    }
  };

  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setShowPaypal(false);
  };

  return (
    <div className="glass-card p-8 flex flex-col h-full animate-fade-up">
      <div className="mb-4 p-3 rounded-lg bg-blue-50 w-fit">
        <Book className="h-6 w-6 text-ilodata-600" />
      </div>
      <h3 className="text-2xl font-semibold mb-3 text-slate-800">{title}</h3>
      <p className="text-slate-600 mb-6">{description}</p>
      <div className="text-3xl font-bold text-ilodata-600 mb-6">{price}</div>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <ChevronRight className="h-5 w-5 text-ilodata-600 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-slate-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      {showPaypal ? (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2 text-slate-700">Paiement sécurisé via PayPal</h4>
          <PayPalCheckout 
            amount={price} 
            title={title}
            onSuccess={handlePaymentSuccess} 
          />
          <button 
            onClick={() => setShowPaypal(false)}
            className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700"
          >
            Annuler
          </button>
        </div>
      ) : (
        <button 
          onClick={handlePurchase}
          className="button-primary w-full text-center flex items-center justify-center gap-2"
        >
          {isPaid ? (
            <>
              <Download size={18} />
              Télécharger
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              Acheter maintenant
            </>
          )}
        </button>
      )}
    </div>
  );
};

const Models = () => {
  return (
    <PayPalScriptProvider options={{ 
      "client-id": "test", // This would be replaced with your actual PayPal client ID in production
      currency: "EUR"
    }}>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-white to-blue-50 pt-32 pb-16">
            <div className="container mx-auto px-4 md:px-6">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  Modèles de mise en page professionnels
                </h1>
                <p className="text-xl text-slate-600 mb-8">
                  Découvrez notre collection de modèles Word prêts à l'emploi pour créer des livres au design professionnel
                </p>
              </div>
            </div>
          </section>

          {/* Models Grid */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid md:grid-cols-3 gap-8">
                <ModelCard 
                  title="Modèle Roman"
                  description="Parfait pour les romans, nouvelles et récits de fiction."
                  price="29"
                  features={[
                    "Format standard 15,5 x 23,5 cm",
                    "Styles Word préconfigurés",
                    "Marges et en-têtes optimisés",
                    "Compatible avec Word et LibreOffice",
                    "Guides d'utilisation inclus"
                  ]}
                />
                
                <ModelCard 
                  title="Modèle Livre Illustré"
                  description="Idéal pour les beaux livres, livres photos et catalogues."
                  price="39"
                  features={[
                    "Format A4 (21 x 29,7 cm)",
                    "Mise en page flexible",
                    "Gestion des images optimisée",
                    "Légendes et notes de bas de page",
                    "Support technique inclus"
                  ]}
                />
                
                <ModelCard 
                  title="Modèle Livre Technique"
                  description="Adapté aux manuels, guides et documentation technique."
                  price="35"
                  features={[
                    "Format B5 (17,6 x 25 cm)",
                    "Table des matières automatique",
                    "Index et références",
                    "Styles pour code source",
                    "Mise à jour gratuite"
                  ]}
                />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-slate-50 py-16">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">
                  Pourquoi choisir nos modèles ?
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-left">
                    <h3 className="font-semibold text-xl mb-2">Facile à utiliser</h3>
                    <p className="text-slate-600">
                      Nos modèles sont conçus pour être simples d'utilisation, même sans expérience en mise en page.
                    </p>
                  </div>
                  
                  <div className="text-left">
                    <h3 className="font-semibold text-xl mb-2">Design professionnel</h3>
                    <p className="text-slate-600">
                      Des mises en page élégantes et optimisées pour une lecture agréable.
                    </p>
                  </div>
                  
                  <div className="text-left">
                    <h3 className="font-semibold text-xl mb-2">Support inclus</h3>
                    <p className="text-slate-600">
                      Une documentation détaillée et une assistance technique pour vous accompagner.
                    </p>
                  </div>
                  
                  <div className="text-left">
                    <h3 className="font-semibold text-xl mb-2">Compatibilité</h3>
                    <p className="text-slate-600">
                      Fonctionne avec Microsoft Word, LibreOffice et d'autres éditeurs de texte.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PayPalScriptProvider>
  );
};

export default Models;
