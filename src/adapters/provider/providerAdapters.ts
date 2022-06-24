export interface ParamsRequest {
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

export interface ProviderAdapters {
  submitPovider: (data: ParamsRequest) => void
}