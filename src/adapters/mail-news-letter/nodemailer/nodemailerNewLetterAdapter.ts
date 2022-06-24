import nodemailer from 'nodemailer'

import { NewLetterRegister, NewLetterMailAdapter } from '../newLetterMailAdapter'

const transport = nodemailer.createTransport({
  host: "",
  port: 0,
  auth: {
    user: "",
    pass: ""
  }
});

export class NodemailerNewLetterAdapter implements NewLetterMailAdapter {
  async send({ emailRegister }: NewLetterRegister) {
    await transport.sendMail({  
      from: 'Equipe feedget <oi@gmail.com>',
      to: '',
      subject: '',
      html: [
        '<p>Informações pessoais:</p>',
        `<p>${emailRegister}</p>` 
      ].join('\n')
    })
  }
}