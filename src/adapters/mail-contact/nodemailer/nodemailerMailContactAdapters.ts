import nodemailer from 'nodemailer'
import { MailContactAdaptersData, MailContactAdapter } from '../mailContactAdapters'

const transporter = nodemailer.createTransport({
  host: "",
  port: 0,
  auth: {
    user: "",
    pass: ""
  }
});

export class NodemailerMailContactAdapter implements MailContactAdapter { 
  async sendMail ({
    userName,
    userEmail,
    userMobile,
    userSubject,
    userMessage
  }: MailContactAdaptersData) {
    await transporter.sendMail({
      from: 'email@contato.com',
      to: 'email@contato.com',
      subject: userSubject,
      html: [
        `<p>Informações pessoais:</p>`,
        `<p>nome: ${userName} </p>`,
        `<p>email: ${userEmail}</p>`,
        `<p>telefone: ${userMobile}</p>`,
        `<p>Messagem: ${userMessage}</p>` 
      ].join('\n')
    })
  }
}