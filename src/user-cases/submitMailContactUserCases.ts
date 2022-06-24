import { parsePhoneNumber } from 'libphonenumber-js';
import * as yup from 'yup'

import { MailContactAdapter } from '../adapters/mail-contact/mailContactAdapters';

interface MailContactData {
  userName: string
  userEmail: string
  userMobile: string
  userSubject: string
  userMessage: string
}

export class SubmitMailContactUserCases {
  constructor(
    private mailContactAdapter: MailContactAdapter
  ) {}

  async execute({
    userName,
    userEmail,
    userMobile,
    userSubject,
    userMessage
  }: MailContactData) {
    const schema = yup.object({
      userName: yup
        .string()
        .required('É obrigatório informar seu nome'),

      userEmail: yup
        .string()
        .required('É obrigatório informar um email')
        .email('por favor, informe um email válido'),

      userMobile: yup
        .string()
        .required('É obrigatório informar um telefone')
        .test(
          "is-valid-mobile", 
          `${userMobile} não é número válido.`,
          value => parsePhoneNumber(value as string, "BR").isValid()
        ),

      userSubject: yup
        .string()
        .required('É obrigatório informar o assunto'),

      userMessage: yup
        .string()
        .required('É obrigatório mandar uma messagem')
    })

    try {
      await schema.validate({
        userName,
        userEmail,
        userMobile,
        userSubject,
        userMessage
      })
    } catch (err) {
      const error = (err as Error)
      throw new Error(error.message)
    }

    await this.mailContactAdapter.sendMail({
      userName,
      userEmail,
      userMobile,
      userSubject,
      userMessage
    })
  }
}