import nodemailer from "nodemailer";
import env from "dotenv"

env.config();


const verifyTeam = async (teamMembers) => {
    console.log(teamMembers);

    try {
        teamMembers.map(async (member) => {
            const transporter = nodemailer.createTransport({
                host: process.env.HOST,
                service: process.env.SERVICE,
                port: Number(process.env.EMAIL_PORT),
                secure: Boolean(process.env.SECURE),
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS,
                },
            });
            const verificationUrl = `https://gaming-6lc9.vercel.app/member-verify/${member.email}`;
            await transporter.sendMail({
                from: process.env.USER, // sender address
                to: member.email, // list of receivers
                subject: 'Team member Verification', // Subject line
                text: `Please verify your email by clicking the following link: ${verificationUrl}`,

            });
            console.log("Message sent Successfully");
        });

    } catch (error) {
        console.log("Email not sent")
        console.log(error);
    }
}
export default verifyTeam;
