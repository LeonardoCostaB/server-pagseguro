import * as yup from 'yup'
import { parsePhoneNumber } from 'libphonenumber-js';
import { cpf, cnpj } from 'cpf-cnpj-validator';

import { ProviderAdapters } from '../../adapters/provider/providerAdapters';

interface SubmitProviderData {
  paymentType: string,
  customer: {
    name: string
    document: string,
    email: string,
    mobileAreaCode: string,
    mobile: string,
    hash: string
  },
  item: {
    id: string
    description: string
    amount: string
    quantity: string
    reference: string
  }
  creditCard?: {
    holderName: string
    holderCpf: string
    street: string
    number: string
    complement: string
    district: string
    postalCode: string
    city: string
    state: string
    token: string
  }
  installments?: {
    quantity: string
    value: string
  }
}

export class TransactionsUseCases {
  constructor(
    private providerAdapters: ProviderAdapters
  ) {}

  async execute({
    paymentType,
    customer,
    item,
    creditCard,
    installments
  }: SubmitProviderData) {

    // validação dos valores da api
    if(!paymentType) {
      throw new Error("Por favor selecione um método de pagamento"); 
    }

    if(paymentType != 'boleto' && paymentType != 'creditCard') {
      throw new Error('Método de pagamento incompatível com o provedor')
    }

    const schema = yup.object({
      installments: yup
        .string()
        .when(
          'paymentType', 
          (paymentType, schema) => paymentType === 'creditCard' ? 
            schema.required('É obrigatório selecionar um método de pagamento') : schema
        ),
      
      name: yup
        .string()
        .required('É obrigatório informar o seu nome')
        .min(3),
    
      email: yup
        .string()
        .required('É obrigatório informar o seu email')
        .email('Digite um email válido'),
    
      mobileAreaCode: yup
        .string()
        .required('É obrigatório informar o DDD')
        .min(2)
        .max(2),

      mobile: yup
        .string()
        .required('É obrigatório informar o número de telefone')
        .test(
          "is-valid-mobile", 
          `${customer.mobile} não é número válido.`,
          value => parsePhoneNumber(value as string, "BR").isValid()
        ),

      document: yup
        .string()
        .required('É obrigatório informar o cpf ou cnpj')
        .test(
          'is-valid-document', 
          `${customer.document} não é um CPF / CNPJ válido.`, 
          value => cpf.isValid(value as string) || cnpj.isValid(value as string)
        ),

      reference: yup
      .string()
      .required('Tivemos um problema ao acessar as informações do produto, por favor atualize a página e tente novamente.'),

      description: yup
      .string()
      .required('Tivemos um problema ao acessar as informações do produto, por favor atualize a página e tente novamente.'),

      amount: yup
      .string()
      .required('Tivemos um problema ao acessar as informações do produto, por favor atualize a página e tente novamente.'),

      quantity: yup
      .string()
      .required('Tivemos um problema ao acessar as informações do produto, por favor atualize a página e tente novamente.'),

      id: yup
      .string()
      .required('Tivemos um problema ao acessar as informações do produto, por favor atualize a página e tente novamente.'),

      street: yup
        .string()
        .when(
          'paymentType',
          (paymentType, schema) => paymentType === 'creditCard' ? 
            schema.required('É obrigatório informar seu endereço') : schema
        ),

      number: yup
        .string()
        .when(
          'paymentType',
          (paymentType, schema) => paymentType === 'creditCard' ? 
            schema.required('É obrigatório informar o número do seu endereço') : schema
        ),

      complement: yup.string(),

      district: yup
        .string()
        .when(
          'paymentType',
          (paymentType, schema) => paymentType === 'creditCard' ? 
            schema.required('É obrigatório informar sua bairro') : schema
        ),

      city: yup
        .string()
        .when(
          'paymentType',
          (paymentType, schema) => paymentType === 'creditCard' ? 
            schema.required('É obrigatório informar sua cidade') : schema
        ),

      state: yup
        .string()
        .when(
          'paymentType',
          (paymentType, schema) => paymentType === 'creditCard' ? 
          schema.required('erro: É obrigatório informar sua estado') : schema
        ),

      postalCode: yup
        .string()
        .when(
          'paymentType',
          (paymentType, schema) => paymentType === 'creditCard' ? 
            schema.required('erro: É obrigatório informar seu cep') : schema
        ),
      
      holderName: yup
        .string()
        .when(
          'paymentType',
          (paymentType, schema) => paymentType === 'creditCard' ? 
            schema.required('É obrigatório informar o nome do proprietario') : schema
        ),

      holderCpf: yup
        .string()
        .when(
          'paymentType',
          (paymentType, schema) => paymentType === 'creditCard' ? 
            schema.required('É obrigatório informar o cpf do proprietario do cartão') : schema
        )        
    })

    // respostas das validações
    try {
      await schema.validate({
        ...customer,
        ...item,
        ...creditCard,
      })
    } catch (err) {
      const error = (err as Error)
      throw new Error(error.message)
    }

    return this.providerAdapters.submitPovider({
      paymentType,
      customer: {
        name: customer.name,
        document: customer.document,
        email: customer.email,
        mobileAreaCode: customer.mobileAreaCode,
        mobile: customer.mobile,
        hash: customer.hash,
      },
      item: {
        id: item.id,
        description: item.description,
        amount: item.amount,
        quantity: item.quantity,
        reference: item.reference
      },
      creditCard: {
        holderName: creditCard?.holderName as string,
        holderCpf: creditCard?.holderCpf as string,
        street: creditCard?.street as string,
        number: creditCard?.number as string,
        complement: creditCard?.complement as string,
        district: creditCard?.district as string,
        postalCode: creditCard?.postalCode as string,
        city: creditCard?.city as string,
        state: creditCard?.state as string,
        token: creditCard?.token as string,
      },
      installments: {
        quantity: installments?.quantity as string,
        value: installments?.value as string
      }
    })
  }
}