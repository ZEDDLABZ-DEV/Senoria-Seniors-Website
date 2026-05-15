import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;

const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderRow(label: string, value: string, isLast = false): string {
  const borderStyle = isLast ? "" : "border-bottom: 1px solid #e2e8f0;";
  return `
    <tr>
      <td style="padding: 12px 0; ${borderStyle} color: #64748b; font-size: 13px; width: 170px; vertical-align: top;">${escapeHtml(label)}</td>
      <td style="padding: 12px 0; ${borderStyle} color: #1e293b; font-size: 14px;">${value}</td>
    </tr>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const NOTIFICATION_EMAIL =
      process.env.NOTIFICATION_EMAIL || "grewalramandeepkaur@gmail.com";
    const FROM_EMAIL =
      process.env.FROM_EMAIL || "no-reply@senoriaseniors.com";
    const FROM_NAME = process.env.FROM_NAME || "Senoria Seniors Careers";
    const FROM_HEADER = `${FROM_NAME} <${FROM_EMAIL}>`;

    const formData = await req.formData();

    const fullName = (formData.get("fullName") as string | null)?.trim() || "";
    const email = (formData.get("email") as string | null)?.trim() || "";
    const phone = (formData.get("phone") as string | null)?.trim() || "";
    const location = (formData.get("location") as string | null)?.trim() || "";
    const position = (formData.get("position") as string | null)?.trim() || "";
    const experience =
      (formData.get("experience") as string | null)?.trim() || "";
    const availability =
      (formData.get("availability") as string | null)?.trim() || "";
    const certifications =
      (formData.get("certifications") as string | null)?.trim() || "";
    const coverLetter =
      (formData.get("coverLetter") as string | null)?.trim() || "";
    const immigrationSupport =
      (formData.get("immigrationSupport") as string | null)?.trim() || "";
    const resume = formData.get("resume") as File | null;

    if (
      !fullName ||
      !email ||
      !phone ||
      !location ||
      !position ||
      !experience ||
      !availability ||
      !immigrationSupport
    ) {
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

    if (!resume || !(resume instanceof File) || resume.size === 0) {
      return NextResponse.json(
        { error: "Please upload your resume." },
        { status: 400 }
      );
    }

    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json(
        { error: "Resume must be 5 MB or smaller." },
        { status: 400 }
      );
    }

    if (resume.type && !ALLOWED_RESUME_TYPES.has(resume.type)) {
      return NextResponse.json(
        { error: "Resume must be a PDF or Word document." },
        { status: 400 }
      );
    }

    const resumeBuffer = Buffer.from(await resume.arrayBuffer());
    const safeResumeName =
      resume.name?.replace(/[^a-zA-Z0-9._-]/g, "_") || "resume";

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0284c7, #0d9488); padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 22px;">New Caretaker Application</h1>
          <p style="color: #e0f2fe; margin: 4px 0 0; font-size: 14px;">Senoria Seniors — Careers</p>
        </div>
        <div style="background: #f8fafc; padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            ${renderRow("Full Name", `<strong>${escapeHtml(fullName)}</strong>`)}
            ${renderRow("Email", `<a href="mailto:${escapeHtml(email)}" style="color: #0284c7;">${escapeHtml(email)}</a>`)}
            ${renderRow("Phone", `<a href="tel:${escapeHtml(phone)}" style="color: #0284c7;">${escapeHtml(phone)}</a>`)}
            ${renderRow("Location", escapeHtml(location))}
            ${renderRow("Position Applied For", `<strong>${escapeHtml(position)}</strong>`)}
            ${renderRow("Years of Experience", escapeHtml(experience))}
            ${renderRow("Availability", escapeHtml(availability))}
            ${renderRow("Needs Immigration / Work Authorization Support", `<strong>${escapeHtml(immigrationSupport)}</strong>`)}
            ${certifications ? renderRow("Certifications", escapeHtml(certifications).replace(/\n/g, "<br/>")) : ""}
            ${coverLetter ? renderRow("Cover Letter", escapeHtml(coverLetter).replace(/\n/g, "<br/>"), true) : renderRow("Cover Letter", "<em style='color:#94a3b8;'>Not provided</em>", true)}
          </table>
          <p style="margin: 24px 0 0; padding: 12px 16px; background: #ecfeff; border: 1px solid #a5f3fc; border-radius: 8px; color: #0e7490; font-size: 13px;">
            Resume attached: <strong>${escapeHtml(resume.name)}</strong>
            (${(resume.size / 1024).toFixed(1)} KB)
          </p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: FROM_HEADER,
      to: [NOTIFICATION_EMAIL],
      subject: `Caretaker Application — ${fullName} (${position})`,
      html: htmlContent,
      replyTo: email,
      attachments: [
        {
          filename: safeResumeName,
          content: resumeBuffer,
        },
      ],
    });

    const firstName = fullName.split(/\s+/)[0] || fullName;
    const acknowledgementHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0284c7, #0d9488); padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 22px;">Application Received</h1>
          <p style="color: #e0f2fe; margin: 4px 0 0; font-size: 14px;">Senoria Seniors — Careers</p>
        </div>
        <div style="background: #ffffff; padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px; color: #1e293b; font-size: 15px; line-height: 1.6;">
          <p style="margin: 0 0 16px;">Hi ${escapeHtml(firstName)},</p>
          <p style="margin: 0 0 16px;">
            Thank you for applying to join the Senoria Seniors caregiving team.
            We've received your application for the
            <strong>${escapeHtml(position)}</strong> role and your resume is
            safely with our hiring team.
          </p>
          <p style="margin: 0 0 16px;">
            Our team will review your application carefully. If your experience
            aligns with what we're looking for, we'll reach out with next steps.
            Please allow us a few business days to get back to you.
          </p>
          <p style="margin: 0 0 16px;">
            In the meantime, feel free to learn more about us at
            <a href="https://senoriaseniors.com" style="color: #0284c7;">senoriaseniors.com</a>.
          </p>
          <p style="margin: 0 0 8px;">Warmly,</p>
          <p style="margin: 0; font-weight: 600;">The Senoria Seniors Team</p>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="margin: 0; color: #94a3b8; font-size: 12px;">
            This is an automated confirmation — please do not reply to this email.
            If you did not submit an application to Senoria Seniors, you can
            safely ignore this message.
          </p>
        </div>
      </div>
    `;
    const acknowledgementText = [
      `Hi ${firstName},`,
      "",
      `Thank you for applying to join the Senoria Seniors caregiving team. We've received your application for the ${position} role and your resume is safely with our hiring team.`,
      "",
      "Our team will review your application carefully. If your experience aligns with what we're looking for, we'll reach out with next steps. Please allow us a few business days to get back to you.",
      "",
      "Warmly,",
      "The Senoria Seniors Team",
      "",
      "— This is an automated confirmation. Please do not reply to this email.",
    ].join("\n");

    try {
      await resend.emails.send({
        from: FROM_HEADER,
        to: [email],
        subject: "We received your application — Senoria Seniors",
        html: acknowledgementHtml,
        text: acknowledgementText,
      });
    } catch (ackError) {
      console.error(
        "Failed to send applicant acknowledgement email:",
        ackError
      );
    }

    return NextResponse.json(
      { message: "Application submitted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send careers application email:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
