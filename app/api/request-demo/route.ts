import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

interface DemoRequestBody {
  fullName: string;
  email: string;
  phone?: string;
  organization: string;
  role: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "grewalramandeepkaur@gmail.com";

    const body: DemoRequestBody = await req.json();

    const { fullName, email, organization, role, phone, message } = body;

    if (!fullName || !email || !organization || !role) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0284c7, #0d9488); padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 22px;">New Demo Request</h1>
          <p style="color: #e0f2fe; margin: 4px 0 0; font-size: 14px;">Senoria Seniors</p>
        </div>
        <div style="background: #f8fafc; padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; width: 140px; vertical-align: top;">Full Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px; font-weight: 600;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; vertical-align: top;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px;"><a href="mailto:${email}" style="color: #0284c7;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; vertical-align: top;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px;">${phone}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; vertical-align: top;">Organization</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px; font-weight: 600;">${organization}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; ${message ? "border-bottom: 1px solid #e2e8f0;" : ""} color: #64748b; font-size: 13px; vertical-align: top;">Role</td>
              <td style="padding: 12px 0; ${message ? "border-bottom: 1px solid #e2e8f0;" : ""} color: #1e293b; font-size: 14px;">${role}</td>
            </tr>
            ${message ? `
            <tr>
              <td style="padding: 12px 0; color: #64748b; font-size: 13px; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; color: #1e293b; font-size: 14px;">${message}</td>
            </tr>` : ""}
          </table>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "Senoria Seniors <onboarding@resend.dev>",
      to: [NOTIFICATION_EMAIL],
      subject: `Demo Request from ${fullName} — ${organization}`,
      html: htmlContent,
      replyTo: email,
    });

    return NextResponse.json(
      { message: "Demo request submitted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send demo request email:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
