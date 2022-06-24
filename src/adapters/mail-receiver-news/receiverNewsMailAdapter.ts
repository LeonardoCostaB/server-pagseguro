export interface ReceiverNewsMailData {
  registrationCourses: string
}

export interface ReceiverNewsMailAdapter {
  sendMail: (data: ReceiverNewsMailData) => Promise<void>;
}