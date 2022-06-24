import * as yup from 'yup';

import { NewLetterMailAdapter } from '../adapters/mail-news-letter/newLetterMailAdapter'

interface NewLetterData {
  emailRegister: string
}

export class SubmitNewLetterUserCases {
  constructor(
    private newLetterMailAdapter: NewLetterMailAdapter
  ) {}

  async execute(data: NewLetterData) {
    const { emailRegister } = data

    const schema = yup.object({
      emailRegister: yup.string()
      .email('Informe um email válido'),
    })
    
    try {
      await schema.validate({

      })
    } catch (err) {
      const error = (err as Error)

      throw new Error(error.message)
    }

    this.newLetterMailAdapter.send({
      emailRegister
    })
  }
}