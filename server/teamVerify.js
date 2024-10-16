import nodemailer from "nodemailer";
import env from "dotenv"

env.config();


const verifyTeam = async (teamMembers) => {
    console.log(teamMembers);

    try {
        teamMembers.map(async (member) => {
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
            const verificationUrl = `https://gaming-6lc9.vercel.app/member-verify/${member.email}`;
            await transporter.sendMail({
                from: "nickyuki014@gmail.com", // sender address
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
