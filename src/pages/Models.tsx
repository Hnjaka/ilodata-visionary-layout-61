import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useToast } from "@/hooks/use-toast"

const Models = () => {
  const [modelName, setModelName] = useState("Modèle de livre");
  const [price, setPrice] = useState("29.00");
  const { toast } = useToast()

  // Inside the Models component where the PayPal options are defined:
  const paypalOptions = {
    "client-id": "test", // Use your actual client ID in production
    currency: "EUR",
    intent: "CAPTURE" // Add the required 'intent' property
  };

  // For the PayPalScriptProvider component props:
  return (
    <div>
      <h1>Nos Modèles</h1>
      <p>Choisissez votre modèle de livre préféré :</p>

      <div>
        <h2>{modelName}</h2>
        <p>Prix: {price} €</p>

        <PayPalScriptProvider options={{
          clientId: "test", // Use your actual client ID in production
          currency: "EUR",
          intent: "CAPTURE"
        }}>
          <PayPalButtons
            createOrder={(data: any, actions: any) => {
              return actions.order.create({
                intent: "CAPTURE", // Add the required 'intent' property
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
            onApprove={(data: any, actions: any) => {
              return actions.order.capture().then((details: any) => {
                toast({
                  title: "Paiement réussi!",
                  description: `Transaction complétée pour ${details.payer.name.given_name}!`,
                })
              });
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default Models;
