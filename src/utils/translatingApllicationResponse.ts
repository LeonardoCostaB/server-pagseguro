import DomParser from "dom-parser";

export class translatingApplicationResponse {
  translatingXmlToJson(response: string) {
    const parser = new DomParser();
    const xmlDoc = parser.parseFromString(response);
    
    const code = xmlDoc.getElementsByTagName("code")![0].childNodes[0].textContent
    const status = xmlDoc.getElementsByTagName("status")![0].childNodes[0].textContent
    const reference = xmlDoc.getElementsByTagName("reference")![0].childNodes[0].textContent
    const paymentLink = xmlDoc.getElementsByTagName('paymentLink')![0].childNodes[0].textContent

    return {
      code,
      status: this.translateStatus(status),
      reference,
      paymentLink: paymentLink ? paymentLink : ''
    }
  }

  translateStatus(status:string) {
    const statusMap = {
      '1': 'started',
      '2': 'pending',
      '3': 'approved',
      '4': 'available',
      '5': 'dispute',
      '6': 'returned',
      '7': 'canceled'
    }

    return Object
      .entries(statusMap)
      .filter(([key, value]) => key == status)
      .join(' ')
      .replace(`${status},`, '')
  }
}