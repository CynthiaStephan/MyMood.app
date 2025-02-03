const nodemailer = require("nodemailer");
require("dotenv").config();


const transporter = nodemailer.createTransport({
    service: "Gmail",
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
 * @param {string} text - mail content
 * @returns {Promise}
 */
const sendMail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: to,
            subject: subject,
            text: text,
        });
        console.log("Email envoyé :", info.response);
        return { success: true, message: "Email envoyé avec succès !" };
    } catch (error) {
        console.error("Erreur d'envoi d'email :", error);
        return { success: false, message: "Erreur d'envoi d'email", error };
    }
};

module.exports = sendMail;
