import { ReceiverNewsMailAdapter } from '../adapters/mail-receiver-news/receiverNewsMailAdapter'

interface SubmitReceiverNewsMailData {
  registrationCourses: string,
}

export class SubmitReceiverNewsMailUserCases {
  constructor(
    private receiverNewsMailAdapter: ReceiverNewsMailAdapter
  ) {}

  async execute(data: SubmitReceiverNewsMailData) {
    const { registrationCourses } = data

    this.receiverNewsMailAdapter.sendMail({
      registrationCourses
    })
  }
}