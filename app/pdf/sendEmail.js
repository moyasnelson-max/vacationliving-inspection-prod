// /app/pdf/sendEmail.js

/**
 * Sends an inspection email with the PDF link using SendGrid REST API.
 * Requires:
 *   process.env.SENDGRID_API_KEY
 *   process.env.SENDGRID_FROM
 */

export async function sendEmail({ to, subject, message, pdfUrl }) {
  try {
    if (!to) throw new Error("Recipient email 'to' is required");
    if (!subject) throw new Error("Email subject is required");
    if (!message) throw new Error("Message text required");
    if (!pdfUrl) throw new Error("PDF URL missing");

    const apiKey = process.env.SENDGRID_API_KEY;
    const from = process.env.SENDGRID_FROM;

    if (!apiKey || !from) {
      throw new Error("Missing SENDGRID_API_KEY or SENDGRID_FROM");
    }

    const emailBody = {
      personalizations: [
        {
          to: [{ email: to }],
          subject: subject,
        },
      ],
      from: { email: from, name: "Vacation Living Reports" },
      content: [
        {
          type: "text/html",
          value: `
            <h2 style="color:#0A2540;margin:0">Inspection Report</h2>
            <p style="font-size:16px;color:#333">${message}</p>
            <p>
              <strong>Download PDF:</strong><br/>
              <a href="${pdfUrl}" target="_blank">${pdfUrl}</a>
            </p>
          `,
        },
      ],
    };

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailBody),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`SendGrid error: ${errText}`);
    }

    return { ok: true };

  } catch (err) {
    return { ok: false, error: err.message };
  }
}
export { sendEmail as default };
