# Configuration et Utilisation de Nodemailer avec Gmail

## Prérequis
Avant de commencer, assurez-vous d'avoir :

1. **Un compte Gmail** configuré pour permettre l'envoi d'emails via des applications tierces.
2. **Un mot de passe d'application Gmail** (nécessaire si vous avez activé l'authentification à deux facteurs).
3. **Node.js et npm installés** sur votre machine.
4. **Un fichier `.env`** contenant les identifiants d'authentification Gmail.

## Installation de Nodemailer

Dans votre projet Node.js, installez Nodemailer avec la commande suivante :

```sh
npm install nodemailer dotenv
```

## Configuration des variables d'environnement

Dans votre fichier `.env`, ajoutez :

```env
GMAIL_USER=votre.email@gmail.com
GMAIL_APP_PASS=mot_de_passe_application
```

⚠️ **Important** : Assurez-vous qu'il n'y a pas d'espaces autour des `=` et que votre fichier `.env` est bien ajouté à `.gitignore` pour éviter d'exposer vos identifiants.

## Création du module d'envoi d'email

Créez un fichier `mailer.js` :

```javascript
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
 * Envoie un email via Nodemailer
 * @param {string} to - Adresse email du destinataire
 * @param {string} subject - Objet de l'email
 * @param {string} [text] - Contenu en texte brut (optionnel si `html` est fourni)
 * @param {string} [html] - Contenu HTML de l'email
 * @returns {Promise<{success: boolean, message: string, error?: any}>}
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
```

## Utilisation dans une route Express

Vous pouvez maintenant appeler la fonction `sendMail` dans une route spécifique :

```javascript
const express = require("express");
const sendMail = require("./mailer");

const app = express();
app.use(express.json());

async sendEmail(req, res) => {
    const { to, subject, text, html } = req.body;
    const notification = await sendMail(to, subject, text, html);
    
    if (notification.success) {
        res.status(200).json(notification);
    } else {
        res.status(500).json(notification);
    }
};

```

## Point Important

- Assurez-vous que `GMAIL_APP_PASS` est bien généré depuis [Google Account Security](https://myaccount.google.com/security).

## Dépannage

Si vous rencontrez des problèmes d'envoi d'email :

1. **Vérifiez vos identifiants** dans `.env`.
2. **Activez l'accès aux applications tierces** dans votre compte Google.
3. **Regardez les logs d'erreur** dans la console pour identifier un problème spécifique.

🚀 Vous êtes prêt à envoyer des emails avec Nodemailer et Gmail !

