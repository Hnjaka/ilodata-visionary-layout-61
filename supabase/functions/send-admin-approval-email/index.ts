
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.0";
import { Resend } from "npm:resend@2.0.0";

// Configuration
const ADMIN_EMAIL = "hery.n@ilodata.com";
const PROJECT_URL = "https://valzxjecoceltiyzkogw.supabase.co";

// Initialize Resend for sending emails
const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resend = new Resend(resendApiKey);

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Interface for request body
interface RequestBody {
  userEmail: string;
  userId: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get request data
    const { userEmail, userId } = await req.json() as RequestBody;
    
    if (!userEmail || !userId) {
      throw new Error("Missing required parameters: userEmail and userId");
    }

    console.log(`Preparing to send approval email for user: ${userEmail} (${userId}) to admin: ${ADMIN_EMAIL}`);

    // Create approval token with user ID
    const approvalToken = btoa(JSON.stringify({ 
      userId, 
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days expiry
    }));
    
    // Create the approval link
    const approvalLink = `${PROJECT_URL}/functions/v1/approve-user?token=${encodeURIComponent(approvalToken)}`;

    console.log(`Generated approval link: ${approvalLink}`);
    console.log(`Using Resend API key: ${resendApiKey ? "API key present" : "No API key found"}`);

    // Send email to admin
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "IloData <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      subject: "Nouvelle demande d'inscription sur IloData",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Nouvelle demande d'inscription</h1>
          <p>Un nouvel utilisateur vient de s'inscrire sur IloData:</p>
          <p><strong>Email:</strong> ${userEmail}</p>
          <p>Pour approuver cet utilisateur, veuillez cliquer sur le bouton ci-dessous:</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${approvalLink}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Approuver l'utilisateur
            </a>
          </p>
          <p>Ce lien d'approbation est valable pendant 7 jours.</p>
          <p style="color: #666; font-size: 14px;">Si vous n'avez pas demandé cette approbation, veuillez ignorer cet email.</p>
        </div>
      `,
    });

    if (emailError) {
      console.error("Error sending email:", emailError);
      throw new Error(`Failed to send admin notification: ${emailError.message}`);
    }

    console.log("Admin notification sent successfully:", emailData);

    return new Response(
      JSON.stringify({ success: true, message: "Admin notification sent successfully" }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error in send-admin-approval-email function:", error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
