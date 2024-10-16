import nodemailer from "nodemailer";
import env from "dotenv"

env.config();


const sendEmail = async (ema, pas) => {
    console.log(ema);
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                user: "nickyuki014@gmail.com",
                pass: "retk fxzk skyn vcsw",
            },
        });
        const verificationUrl = `https://gaming-6lc9.vercel.app/signup/${ema}/${pas}`;
        await transporter.sendMail({
            from: "nickyuki014@gmail.com", // sender address
            to: ema, // list of receivers
            subject: 'Email Verification', // Subject line
            text: `Please verify your email by clicking the following link: ${verificationUrl}`,

        });
        console.log("Message sent Successfully");
    } catch (error) {
        console.log("Email not sent")
        console.log(error);
    }
}
export default sendEmail;
