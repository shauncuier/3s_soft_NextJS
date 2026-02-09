import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { to, subject, message, contactId } = await resolveData(req);

        if (!to || !message) {
            return NextResponse.json({ success: false, error: "Missing recipient or message" }, { status: 400 });
        }

        // Setup Transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email Options
        const mailOptions = {
            from: `"3S-SOFT" <${process.env.SMTP_USER}>`,
            to,
            subject: subject || "Re: Your Inquiry at 3S-SOFT",
            text: message,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #2563eb;">3S-SOFT</h2>
                    <p style="font-size: 16px; line-height: 1.6; color: #333;">
                        ${message.replace(/\n/g, '<br>')}
                    </p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #666;">
                        This is an official reply from 3S-SOFT regarding your inquiry.<br>
                        Website: <a href="https://www.3s-soft.com">www.3s-soft.com</a>
                    </p>
                </div>
            `,
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "Email sent successfully" });
    } catch (error: any) {
        console.error("SMTP Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

async function resolveData(req: Request) {
    try {
        return await req.json();
    } catch {
        return {};
    }
}
