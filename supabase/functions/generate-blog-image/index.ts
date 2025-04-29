
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Le prompt est requis pour générer une image' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Vérifier que la clé API est définie
    if (!openAIApiKey) {
      console.error('OpenAI API key is not defined in environment variables');
      return new Response(
        JSON.stringify({ error: "Clé API OpenAI non configurée. Veuillez configurer la clé API dans les secrets de la fonction Edge." }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Enrichir le prompt pour de meilleurs résultats mais le limiter pour éviter les erreurs
    const enhancedPrompt = `Une image professionnelle représentant: ${prompt}. Style moderne, haute qualité, adapté pour un blog.`;
    console.log('Prompt envoyé à OpenAI:', enhancedPrompt);

    // Appel à l'API d'OpenAI pour générer l'image
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAIApiKey}`,
        },
        body: JSON.stringify({
          model: "dall-e-2", // Utiliser dall-e-2 qui est plus stable
          prompt: enhancedPrompt,
          n: 1,
          size: "1024x1024",
          response_format: "url"
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API error response:', errorData);
        throw new Error(errorData.error?.message || `Erreur API OpenAI: ${response.status}`);
      }

      const data = await response.json();
      console.log('OpenAI API response:', JSON.stringify(data));
      
      // Récupérer l'URL de l'image générée
      const imageUrl = data.data?.[0]?.url;

      if (!imageUrl) {
        throw new Error('Aucune image générée');
      }

      return new Response(
        JSON.stringify({ imageUrl }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (apiError) {
      console.error('OpenAI API call error:', apiError);
      return new Response(
        JSON.stringify({ error: `Erreur lors de l'appel à l'API OpenAI: ${apiError.message}` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in generate-blog-image function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
