import 'dotenv/config'
import axios from 'axios';
import qs from 'qs';

import { ProviderAdapters, ParamsRequest } from '../providerAdapters';
import { translatingApplicationResponse } from '../../../utils/translatingApllicationResponse';

interface SubmitProviderCreditCard {
  paymentMode: string,
  paymentMethod: string,
  receiverEmail: string,
  currency: string,
  extraAmount: string,
  itemId1: string,
  itemDescription1: string,
  itemAmount1: string,
  itemQuantity1: string,
  notificationURL: string,
  reference: string,
  senderName: string,
  senderCPF: string,
  senderAreaCode: string,
  senderPhone: string,
  senderEmail: string,
  senderHash: string,
  shippingAddressRequired: string,
  creditCardToken: string,
  installmentQuantity: string,
  installmentValue: string,
  noInterestInstallmentQuantity: string,
  creditCardHolderName: string,
  creditCardHolderCPF: string,
  billingAddressStreet: string,
  billingAddressNumber: string,
  billingAddressComplement: string,
  billingAddressDistrict: string,
  billingAddressPostalCode: string,
  billingAddressCity: string,
  billingAddressState: string,
  billingAddressCountry: string
};

interface SubmitProviderBoleto {
  paymentMode: string,
  paymentMethod: string,
  receiverEmail: string,
  currency: string,
  extraAmount: string,
  itemId1: string,
  itemDescription1: string,
  itemAmount1: string,
  itemQuantity1: string,
  notificationURL: string,
  reference: string,
  senderName: string,
  senderCPF: string,
  senderAreaCode: string,
  senderPhone: string,
  senderEmail: string,
  senderHash: string,
  shippingAddressRequired: string,
};

export class PagseguroAdapters implements ProviderAdapters {
  async submitPovider ({
    paymentType,
    customer,
    item,
    creditCard,
    installments
  }: ParamsRequest) {
    const creditCardParams: SubmitProviderCreditCard = {
      paymentMode: 'default',
      paymentMethod: 'creditCard',
      receiverEmail: process.env.email as string,
      currency: 'BRL',
      extraAmount: '0.00',
      itemId1: item.id,
      itemDescription1: item.description,
      itemAmount1: item.amount,
      itemQuantity1: '1',
      notificationURL: '',
      reference: item.reference,
      senderName: customer.name,
      senderCPF: customer.document,
      senderAreaCode: customer.mobileAreaCode,
      senderPhone: customer.mobile,
      senderEmail: customer.email,
      senderHash: customer.hash,
      shippingAddressRequired: 'false',
      creditCardToken: creditCard?.token as string,
      installmentQuantity: installments?.quantity as string,
      installmentValue: installments?.value as string,
      noInterestInstallmentQuantity: '2',
      creditCardHolderName: creditCard?.holderName as string,
      creditCardHolderCPF: creditCard?.holderCpf as string,
      billingAddressStreet: creditCard?.street as string,
      billingAddressNumber: creditCard?.number as string,
      billingAddressComplement: creditCard?.complement as string,
      billingAddressDistrict: creditCard?.district as string,
      billingAddressPostalCode: creditCard?.postalCode as string,
      billingAddressCity: creditCard?.city as string,
      billingAddressState: creditCard?.state as string,
      billingAddressCountry: 'BRA' 
    }

    const billetParams: SubmitProviderBoleto = {
      paymentMode: 'default',
      paymentMethod: 'boleto',
      receiverEmail: process.env.email as string,
      currency: 'BRL',
      extraAmount: '0.00',
      itemId1: item.id,
      itemDescription1: item.description,
      itemAmount1: item.amount,
      itemQuantity1: '1',
      notificationURL: '',
      reference: item.reference,
      senderName: customer.name,
      senderCPF: customer.document,
      senderAreaCode: customer.mobileAreaCode,
      senderPhone: customer.mobile,
      senderEmail: customer.email,
      senderHash: customer.hash,
      shippingAddressRequired: 'false',
    }

    let paymentTypeTransaction: object;

    paymentType == 'boleto' ? 
      paymentTypeTransaction = billetParams : paymentTypeTransaction = creditCardParams
     
    const requestProvider = async () => {
      try {
        const configHeadersRequest = {
          method: 'post',
          url: `https://ws.sandbox.pagseguro.uol.com.br/v2/transactions?email=${process.env.PS_EMAIL}&token=${process.env.PS_TOKEN_DEV}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: qs.stringify(paymentTypeTransaction)
        }
        
        const response = await axios(configHeadersRequest)

        const dataResponse = response.data
        
        return translatingApplicationResponse.prototype.translatingXmlToJson(dataResponse)

      } catch (error) {
        console.log(error)
      }
    }

    return requestProvider()
  };
};