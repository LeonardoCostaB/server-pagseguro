import { Router } from 'express'

import { SendMailController } from './controller/sendMailController'
import { TransactionsController } from './controller/transactionsController'

export const router = Router()

const sendMailController = new SendMailController()
const transactionsController = new TransactionsController()

// routas de envio de email
router.post('/receiverNewMail', sendMailController.receiverNew)
router.post('/newLetterMail', sendMailController.newLetter)
router.post('/sendContact', sendMailController.contact)

// rota de transações
router.post('/checkoutCode', transactionsController.checkoutCode)
router.post('/transactions', transactionsController.sendProvider)