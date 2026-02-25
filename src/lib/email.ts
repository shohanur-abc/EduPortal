import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport(
    process.env.EMAIL_SERVER || "",
    {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || "587"),
        secure: process.env.EMAIL_SECURE === "true",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    }
)

export async function sendVerificationEmail(
    email: string,
    token: string,
    name: string
) {
    const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM || "noreply@eduportal.com",
            to: email,
            subject: "Verify your email address",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Welcome to EduPortal!</h2>
            <p>Hi ${name},</p>
            <p>Thank you for signing up. Please verify your email address by clicking the link below:</p>
            <p>
                <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 5px;">
                Verify Email
                </a>
            </p>
            <p>Or copy and paste this link in your browser:</p>
            <p><code>${verificationUrl}</code></p>
            <p>This link will expire in 24 hours.</p>
            <p>If you didn't sign up for this account, please ignore this email.</p>
            <hr />
            <p style="color: #666; font-size: 12px;">© 2026 EduPortal. All rights reserved.</p>
        </div>`,
        })
        return { success: true }
    } catch (error) {
        console.error("Failed to send verification email:", error)
        return { success: false, error }
    }
}

export async function sendResetPasswordEmail(
    email: string,
    token: string,
    name: string
) {
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM || "noreply@eduportal.com",
            to: email,
            subject: "Reset your password",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Password Reset Request</h2>
                    <p>Hi ${name},</p>
                    <p>We received a request to reset your password. Click the link below to set a new password:</p>
                    <p>
                        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 5px;">
                            Reset Password
                        </a>
                    </p>
                    <p>Or copy and paste this link in your browser:</p>
                    <p><code>${resetUrl}</code></p>
                    <p>This link will expire in 1 hour.</p>
                    <p>If you didn't request this, please ignore this email.</p>
                    <hr />
                    <p style="color: #666; font-size: 12px;">© 2026 EduPortal. All rights reserved.</p>
                </div>`,
        })
        return { success: true }
    } catch (error) {
        console.error("Failed to send password reset email:", error)
        return { success: false, error }
    }
}
