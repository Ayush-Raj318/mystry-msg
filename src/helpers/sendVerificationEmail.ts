import { render } from "@react-email/render";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { resend } from "@/lib/resend";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    console.log('🚀 Attempting to send email to:', email);
    console.log('📧 Username:', username);
    console.log('🔢 Verification code:', verifyCode);
    console.log('🔑 Resend API Key exists:', !!process.env.RESEND_API_KEY);
    
    const emailHtml = await render(VerificationEmail({ username, otp: verifyCode }));
    console.log('📝 Email HTML rendered successfully');
    
    const result = await resend.emails.send({
      from: 'ayush-dev.tech',
      to: email,
      subject: 'Mystery Message Verification Code',
      html: emailHtml,
    });
    
    console.log('✅ Email sent successfully:', result);
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('❌ Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}