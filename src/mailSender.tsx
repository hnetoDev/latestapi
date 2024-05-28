const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");

const mailersend = new MailerSend({
    api_key: "mlsn.8653ea43de0786c7379652f9bb8c7968bdc1a219e75d05934b961b082cfe9c39",
});

const recipients = [new Recipient("lunnadamassa@gmail.com", "Recipient")];

const emailParams = new EmailParams()
    .setFrom("hnetorocha@gmail.com")
    .setFromName("Your Name")
    .setRecipients(recipients)
    .setSubject("Subject")
    .setHtml("Greetings from the team, you got this message through MailerSend.")
    .setText("Greetings from the team, you got this message through MailerSend.");

mailersend.send(emailParams);
console.log('Enviado')