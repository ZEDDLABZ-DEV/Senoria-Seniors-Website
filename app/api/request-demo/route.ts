import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface DemoRequestBody {
  fullName: string;
  email: string;
  phone?: string;
  location: string;
  services: string[];
  message?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const NOTIFICATION_EMAIL =
      process.env.NOTIFICATION_EMAIL || "grewalramandeepkaur@gmail.com";
    const FROM_EMAIL =
      process.env.FROM_EMAIL || "no-reply@senoriaseniors.com";
    const FROM_NAME = process.env.FROM_NAME || "Senoria Seniors";
    const FROM_HEADER = `${FROM_NAME} <${FROM_EMAIL}>`;

    const body: DemoRequestBody = await req.json();

    const fullName = (body.fullName || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const location = (body.location || "").trim();
    const message = (body.message || "").trim();
    const services = Array.isArray(body.services)
      ? body.services.map((s) => String(s).trim()).filter(Boolean)
      : [];

    if (!fullName || !email || !location || services.length === 0) {
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

    const servicesHtml = services
      .map(
        (s) =>
          `<span style="display: inline-block; margin: 0 6px 6px 0; padding: 4px 10px; background: #ecfeff; border: 1px solid #a5f3fc; border-radius: 999px; color: #0e7490; font-size: 12px;">${escapeHtml(s)}</span>`
      )
      .join("");

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0284c7, #0d9488); padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 22px;">New Easy Access Request</h1>
          <p style="color: #e0f2fe; margin: 4px 0 0; font-size: 14px;">Senoria Seniors</p>
        </div>
        <div style="background: #f8fafc; padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; width: 140px; vertical-align: top;">Full Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px; font-weight: 600;">${escapeHtml(fullName)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; vertical-align: top;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px;"><a href="mailto:${escapeHtml(email)}" style="color: #0284c7;">${escapeHtml(email)}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; vertical-align: top;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px;">${escapeHtml(phone)}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; vertical-align: top;">Location</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px; font-weight: 600;">${escapeHtml(location)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; ${message ? "border-bottom: 1px solid #e2e8f0;" : ""} color: #64748b; font-size: 13px; vertical-align: top;">Services</td>
              <td style="padding: 12px 0; ${message ? "border-bottom: 1px solid #e2e8f0;" : ""} color: #1e293b; font-size: 14px;">${servicesHtml}</td>
            </tr>
            ${message ? `
            <tr>
              <td style="padding: 12px 0; color: #64748b; font-size: 13px; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; color: #1e293b; font-size: 14px;">${escapeHtml(message).replace(/\n/g, "<br/>")}</td>
            </tr>` : ""}
          </table>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: FROM_HEADER,
      to: [NOTIFICATION_EMAIL],
      subject: `Easy Access Request from ${fullName} — ${location}`,
      html: htmlContent,
      replyTo: email,
    });

    const firstName = fullName.split(/\s+/)[0] || fullName;
    const servicesListHtml = services
      .map(
        (s) =>
          `<li style="margin: 0 0 6px;">${escapeHtml(s)}</li>`
      )
      .join("");

    const acknowledgementHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0284c7, #0d9488); padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 22px;">We've Received Your Request</h1>
          <p style="color: #e0f2fe; margin: 4px 0 0; font-size: 14px;">Senoria Seniors — Easy Access</p>
        </div>
        <div style="background: #ffffff; padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px; color: #1e293b; font-size: 15px; line-height: 1.6;">
          <p style="margin: 0 0 16px;">Hi ${escapeHtml(firstName)},</p>
          <p style="margin: 0 0 16px;">
            Thank you for requesting Easy Access to Senoria Seniors. We're excited
            to have you join our early community of partners helping shape the
            future of senior care.
          </p>
          <p style="margin: 0 0 8px; font-weight: 600;">Here's a copy of what you shared with us:</p>
          <ul style="margin: 0 0 16px; padding-left: 20px; color: #334155;">
            <li style="margin: 0 0 6px;"><strong>Location:</strong> ${escapeHtml(location)}</li>
            <li style="margin: 0 0 6px;"><strong>Services of interest:</strong></li>
            <ul style="margin: 6px 0 0; padding-left: 20px; color: #475569;">
              ${servicesListHtml}
            </ul>
          </ul>
          <p style="margin: 0 0 16px;">
            Our team will review your request and reach out personally with next
            steps. In the meantime, if you have any questions, simply reply to
            this email and we'll get back to you.
          </p>
          <p style="margin: 0 0 16px;">
            Learn more about us at
            <a href="https://senoriaseniors.com" style="color: #0284c7;">senoriaseniors.com</a>.
          </p>
          <p style="margin: 0 0 8px;">Warmly,</p>
          <p style="margin: 0; font-weight: 600;">The Senoria Seniors Team</p>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="margin: 0; color: #94a3b8; font-size: 12px;">
            This is an automated confirmation. If you did not submit this
            request, you can safely ignore this message.
          </p>
        </div>
      </div>
    `;

    const acknowledgementText = [
      `Hi ${firstName},`,
      "",
      "Thank you for requesting Easy Access to Senoria Seniors. We're excited to have you join our early community of partners helping shape the future of senior care.",
      "",
      "Here's a copy of what you shared with us:",
      `- Location: ${location}`,
      `- Services of interest: ${services.join(", ")}`,
      "",
      "Our team will review your request and reach out personally with next steps. In the meantime, if you have any questions, simply reply to this email and we'll get back to you.",
      "",
      "Warmly,",
      "The Senoria Seniors Team",
      "",
      "— This is an automated confirmation. If you did not submit this request, you can safely ignore this message.",
    ].join("\n");

    try {
      await resend.emails.send({
        from: FROM_HEADER,
        to: [email],
        subject: "We've received your Easy Access request — Senoria Seniors",
        html: acknowledgementHtml,
        text: acknowledgementText,
      });
    } catch (ackError) {
      console.error(
        "Failed to send Easy Access acknowledgement email:",
        ackError
      );
    }

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
