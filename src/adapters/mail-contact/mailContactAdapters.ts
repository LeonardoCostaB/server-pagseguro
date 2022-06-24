export interface MailContactAdaptersData {
  userName: string
  userEmail: string
  userMobile: string
  userSubject: string
  userMessage: string
}

export interface MailContactAdapter {
  sendMail: (data: MailContactAdaptersData) => Promise<void>
}