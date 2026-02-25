import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ApplicationData {
  platform: string;
  reach: string;
  handle: string;
  fullName: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { platform, reach, handle, fullName, email }: ApplicationData = await req.json();

    if (!platform || !reach || !handle || !fullName || !email) {
      throw new Error("Missing required fields");
    }

    const { error } = await resend.emails.send({
      from: "Affiliate App <onboarding@resend.dev>",
      to: ["wifirackss@gmail.com"],
      subject: `New Affiliate Application: ${fullName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #ffffff;">
          <h1 style="color: #111; font-size: 24px; margin-bottom: 24px;">New Affiliate Application</h1>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; width: 140px;">Full Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #111; font-weight: 600;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #111; font-weight: 600;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">Handle</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #111; font-weight: 600;">${handle}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">Platform</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #111; font-weight: 600;">${platform}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #666;">Audience Size</td>
              <td style="padding: 12px 0; color: #111; font-weight: 600;">${reach}</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error(error.message);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending application email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
