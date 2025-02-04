const nodemailer = require("nodemailer");
require("dotenv").config();


const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
    },
});

/**
 * Send Mail Methode
 * @param {string} to - email adress
 * @param {string} subject - object
 * @param {string} text - plain text mail content
 * @param {string} html - html mail content
 * @returns {Promise} 
 */
const sendMail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: to,
            subject: subject,
            text: text,
            html: html,
        });
        console.log("Email sent:", info.response);
        return { success: true, message: "Email sent successfully!" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Error sending email", error };
    }
};

module.exports = sendMail;
