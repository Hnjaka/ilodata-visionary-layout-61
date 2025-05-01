
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.0";

// Configure Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

// HTML template for successful approval
const successHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Utilisateur approuvé</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
      text-align: center;
      line-height: 1.6;
    }
    .success {
      color: #2E7D32;
      font-size: 24px;
      margin-bottom: 20px;
    }
    .container {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .button {
      background-color: #4F46E5;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 4px;
      display: inline-block;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="success">✓ Utilisateur approuvé avec succès</div>
    <p>L'utilisateur a été approuvé et peut maintenant accéder au site.</p>
    <a href="https://ilodata.com" class="button">Retour au site</a>
  </div>
</body>
</html>
`;

// HTML template for error
const errorHtml = (message: string) => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Erreur d'approbation</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
      text-align: center;
      line-height: 1.6;
    }
    .error {
      color: #C62828;
      font-size: 24px;
      margin-bottom: 20px;
    }
    .container {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .button {
      background-color: #4F46E5;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 4px;
      display: inline-block;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="error">✗ Erreur d'approbation</div>
    <p>${message}</p>
    <a href="https://ilodata.com" class="button">Retour au site</a>
  </div>
</body>
</html>
`;

serve(async (req) => {
  // Only GET requests are allowed for this endpoint
  if (req.method !== "GET") {
    return new Response(errorHtml("Méthode non autorisée"), {
      status: 405,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(supabaseUrl as string, supabaseServiceKey as string);
    
    // Get token from URL
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    
    if (!token) {
      return new Response(errorHtml("Token d'approbation manquant"), {
        status: 400,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    // Decode token
    let decodedData;
    try {
      const decodedToken = atob(token);
      decodedData = JSON.parse(decodedToken);
    } catch (e) {
      return new Response(errorHtml("Token d'approbation invalide"), {
        status: 400,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    const { userId, exp } = decodedData;

    // Check token expiration
    if (Date.now() > exp) {
      return new Response(errorHtml("Le lien d'approbation a expiré"), {
        status: 400,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    // Update user profile to set is_approved to true
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ is_approved: true })
      .eq("id", userId);

    if (updateError) {
      console.error("Error updating user profile:", updateError);
      return new Response(errorHtml(`Erreur lors de l'approbation: ${updateError.message}`), {
        status: 500,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    // Return success HTML page
    return new Response(successHtml, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });

  } catch (error) {
    console.error("Error in approve-user function:", error);
    
    return new Response(errorHtml(`Une erreur inattendue s'est produite: ${error.message}`), {
      status: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }
});
