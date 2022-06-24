import { ReceiverNewsMailData } from '../receiverNewsMailAdapter'
import { ReceiverNewsMailAdapter } from '../receiverNewsMailAdapter'

import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "",
  port: 0,
  auth: {
    user: "",
    pass: ""
  }
});

export class NodemailerMailNewsAdapter implements ReceiverNewsMailAdapter {
  async sendMail({ registrationCourses }: ReceiverNewsMailData) {
    await transport.sendMail({  
      from: '',
      to: '',
      subject: '',
      html: [
        '<p>Informações pessoais:</p>',
        `<p>${registrationCourses}</p>` 
      ].join('\n')
    })
  }
}