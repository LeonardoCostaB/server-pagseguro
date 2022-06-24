import { Request, Response } from 'express';

import { NodemailerMailNewsAdapter } from '../adapters/mail-receiver-news/nodemailer/nodemailerNewsMailAdapter';
import { SubmitReceiverNewsMailUserCases } from '../user-cases/submitReceiverNewsMailUserCases';

import { NodemailerNewLetterAdapter } from '../adapters/mail-news-letter/nodemailer/nodemailerNewLetterAdapter';
import { SubmitNewLetterUserCases } from '../user-cases/submitNewLetterUserCases';

import { NodemailerMailContactAdapter } from '../adapters/mail-contact/nodemailer/nodemailerMailContactAdapters';
import { SubmitMailContactUserCases } from '../user-cases/submitMailContactUserCases';

interface SendMailParams {
  registrationCourses: string,
}

interface SendMailNewLetterParams {
  emailRegister: string
}

interface SendMailContactParams {
  userName: string
  userEmail: string
  userMobile: string
  userSubject: string
  userMessage: string
}

export class SendMailController {
  async receiverNew(req:Request, res:Response) {
    try {
      const { registrationCourses }:SendMailParams = req.body
  
      const receiverNewsMail = new NodemailerMailNewsAdapter()
    
      const submitMail = new SubmitReceiverNewsMailUserCases(
        receiverNewsMail
      )
    
      await submitMail.execute({
        registrationCourses
      })
  
      res.status(201).json('Cadastro com sucesso')
      
    } catch (error) {
      console.log(error)
  
      res.status(500).json('Internal Server error')
    }
  }

  async newLetter(req:Request, res:Response) {
    try {
      const { emailRegister }:SendMailNewLetterParams = req.body
    
      const receiverNewsMail = new NodemailerNewLetterAdapter()
      
      const submitNewLetter = new SubmitNewLetterUserCases(
        receiverNewsMail
      )
  
      submitNewLetter.execute({
        emailRegister
      })
  
      res.status(201).json('Email cadastrado com sucesso')
      
    } catch (err) {
      console.log(err)

      const error = (err as Error)

      return res.status(401).json({
        message: error.message
      })
    }
  }

  async contact(req: Request, res:Response) {
    try {
      const { 
        userName,
        userEmail,
        userMobile,
        userSubject,
        userMessage
      }:SendMailContactParams = req.body
  
      const mailContactAdapter = new NodemailerMailContactAdapter()
  
      const submitMailContact = new SubmitMailContactUserCases(
        mailContactAdapter
      ) 
  
      await submitMailContact.execute({
        userName,
        userEmail,
        userMobile,
        userSubject,
        userMessage
      })

      return res.status(201).json({
        message: 'Email enviado com sucesso'
      })
      
    } catch (error) {
      const err = error as Error

      return res.status(401).json({
        error: err.message
      })


    }
  }
}