
import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useToast } from "@/hooks/use-toast";

const Models = () => {
  const [modelName, setModelName] = useState("Modèle de livre");
  const [price, setPrice] = useState("1.00");
  const { toast } = useToast();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nos Modèles</h1>
      <p className="text-lg mb-8">Choisissez votre modèle de livre préféré :</p>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">{modelName}</h2>
        <p className="text-gray-700 mb-4">Prix: {price} €</p>

        <PayPalScriptProvider options={{
          clientId: "test", // Use your actual client ID in production
          currency: "EUR",
          intent: "CAPTURE"
        }}>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [{
                  description: modelName,
                  amount: {
                    value: price,
                    currency_code: "EUR"
                  },
                  payee: {
                    email_address: "contact@layoutforall.com"
                  }
                }]
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                toast({
                  title: "Paiement réussi!",
                  description: `Transaction complétée pour ${details.payer.name.given_name}!`,
                });
              });
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default Models;
