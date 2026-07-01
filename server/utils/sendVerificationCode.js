import { generateVerificationOtpEmailTemplate } from "./emailTemplates.js ";
import { sendEmail } from "./sendEmail.js";

export async function sendVerificationCode(verificationCode , email,res) {
    try {

        const message = generateVerificationOtpEmailTemplate(verificationCode);

        sendEmail({
            email ,
            subject : "verification code (BookWorm library Management System)",
            message,
        });

        res.status(200).json({
            success : true ,
            message : "Verification code sent Successfully",
        })

    }catch(err) {
        return res.status(500).json({
            success : false,
            message : "verification code failed to send",
        });
    }
} 