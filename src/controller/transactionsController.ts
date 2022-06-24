import 'dotenv/config';
import axios from 'axios';

import { Request, Response} from 'express'

import { PagseguroAdapters } from '../adapters/provider/pagSeguro/pagSeguroAdapters';
import { TransactionsUseCases } from '../user-cases/transactions/transactionsUseCases'

export class TransactionsController {
  async checkoutCode(req: Request, res:Response) {
    const config = {
      method: 'post',
      url: `https://ws.sandbox.pagseguro.uol.com.br/v2/sessions?email=${process.env.email}&token=${process.env.PS_TOKEN_DEV}`
    }

    const request = async () => {
      try {
        const response = await axios(config)

        return res.status(200).json(response.data)

      } catch (error) {
        console.log(error)
      }
    }

    request()
  }

  async sendProvider(req: Request, res:Response) {
    try {
      const {
        customerName, 
        customerDocument,
        customerEmail,
        customerMobileAreaCode,
        customerMobile,
        paymentType,
        courseId,
        reference,
        courseName,
        coursePrice,
        cardHolderName,
        cardHolderCpf,
        quantityInstallments,
        valueInstallments,
        addressStreet,
        addressNumber,
        addressComplement,
        addressDistrict,
        addressPostalCode,
        addressCity,
        addressState,
        senderHash,
        tokenCard
      } = req.body

      const pagSeguroAdapters = new PagseguroAdapters()
      const submitProvider = new TransactionsUseCases(
        pagSeguroAdapters
      )
  
      const getDataTransaction = await submitProvider.execute({
        paymentType,
        customer: {
          name: customerName,
          document: customerDocument,
          email: customerEmail,
          mobileAreaCode: customerMobileAreaCode,
          mobile: customerMobile,
          hash: senderHash
        },
        item: {
          id: courseId,
          description: courseName,
          amount: coursePrice,
          quantity: '1',
          reference
        },
        creditCard: {
          holderName: cardHolderName,
          holderCpf: cardHolderCpf,
          street: addressStreet,
          number: addressNumber,
          complement: addressComplement,
          district: addressDistrict,
          postalCode: addressPostalCode,
          city: addressCity,
          state: addressState,
          token: tokenCard,
        },
        installments: {
          quantity: quantityInstallments,
          value: valueInstallments
        }
      })

      
  
      return res.status(200).json(getDataTransaction)

    } catch(error) {
      const err = error as Error

      res.status(401).json({
        error: err.message
      })
    }
  }
}