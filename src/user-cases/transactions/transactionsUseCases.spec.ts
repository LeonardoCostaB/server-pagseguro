import { TransactionsUseCases } from './transactionsUseCases'

const sendTransactions = jest.fn()

const SendTransactions = new TransactionsUseCases(
  { submitPovider: sendTransactions }
)

describe('send transactions', () => {
  it('should be able to send a credit card transaction to the provider', async () => {
   await expect(SendTransactions.execute({
    paymentType: 'creditCard',
    customer: {
      name: 'Leonardo costa batista barroso',
      email: 'leonardo@hotmail.com',
      document: '33290159000',
      mobileAreaCode: '21',
      mobile: '988888888',
      hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
    },
    item: {
      id: '1',
      description: 'curso',
      amount: '180.00',
      quantity: '1',
      reference: '12156'
    },
    creditCard: {
      holderName: 'leonardo costa b',
      holderCpf: '33290159000',
      street: 'rua exemplo',
      number: '12',
      complement: '',
      district: 'varginha',
      postalCode: '81710-140',
      city: 'nova hamburgo',
      state: 'RJ',
      token: '116513513664156315'
    },
    installments: {
      quantity: '1',
      value: '180.00',
    }
   })).resolves.not.toThrow()

   expect(sendTransactions).toHaveBeenCalled()
  })

  it('should be able to send a billet transaction to the provider', async () => {
    await expect(SendTransactions.execute({
     paymentType: 'boleto',
     customer: {
       name: 'Leonardo costa batista barroso',
       email: 'leonardo@hotmail.com',
       document: '33290159000',
       mobileAreaCode: '21',
       mobile: '988888888',
       hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
     },
     item: {
       id: '1',
       description: 'curso',
       amount: '180.00',
       quantity: '1',
       reference: '12156'
     }
    })).resolves.not.toThrow()
 
    expect(sendTransactions).toHaveBeenCalled()
  })

  it('should not be able to send transactions without paymentType', async () => {
    expect(SendTransactions.execute({
     paymentType: '',
     customer: {
       name: 'leonardo costa',
       email: 'leonardo@hotmail.com',
       document: '33290159000',
       mobileAreaCode: '21',
       mobile: '988888888',
       hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
     },
     item: {
       id: '1',
       description: 'curso',
       amount: '180.00',
       quantity: '1',
       reference: '12156'
     },
     creditCard: {
      holderName: 'leonardo costa b',
      holderCpf: '33290159000',
      street: 'rua exemplo',
      number: '12',
      complement: '',
      district: 'varginha',
      postalCode: '81710-140',
      city: 'nova hamburgo',
      state: 'RJ',
      token: '116513513664156315'
     },
     installments: {
       quantity: '',
       value: '',
     }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without paymentDifferent type of bank slip and credit card', async () => {
    expect(SendTransactions.execute({
     paymentType: 'pix',
     customer: {
       name: 'leonardo costa',
       email: 'leonardo@hotmail.com',
       document: '33290159000',
       mobileAreaCode: '21',
       mobile: '988888888',
       hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
     },
     item: {
       id: '1',
       description: 'curso',
       amount: '180.00',
       quantity: '1',
       reference: '12156'
     },
     creditCard: {
      holderName: 'leonardo costa b',
      holderCpf: '33290159000',
      street: 'rua exemplo',
      number: '12',
      complement: '',
      district: 'varginha',
      postalCode: '81710-140',
      city: 'nova hamburgo',
      state: 'RJ',
      token: '116513513664156315'
     },
     installments: {
       quantity: '',
       value: '',
     }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without customer name', async () => {
    expect(SendTransactions.execute({
     paymentType: 'boleto',
     customer: {
       name: '',
       email: 'leonardo@hotmail.com',
       document: '33290159000',
       mobileAreaCode: '21',
       mobile: '988888888',
       hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
     },
     item: {
       id: '1',
       description: 'curso',
       amount: '180.00',
       quantity: '1',
       reference: '12156'
     }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without customer email', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: '',
        document: '33290159000',
        mobileAreaCode: '21',
        mobile: '988888888',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '1',
        description: 'curso',
        amount: '180.00',
        quantity: '1',
        reference: '12156'
      },
      creditCard: {
        holderName: '',
        holderCpf: '',
        street: '',
        number: '',
        complement: '',
        district: '',
        postalCode: '',
        city: '',
        state: '',
        token: ''
      },
      installments: {
        quantity: '',
        value: '',
      }
    })).rejects.toThrow()
    
    
  })
  
  it('should not be able to send transactions without customer document', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: 'leonardo@hotmail.com',
        document: '',
        mobileAreaCode: '21',
        mobile: '988888888',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '1',
        description: 'curso',
        amount: '180.00',
        quantity: '1',
        reference: '12156'
      },
      creditCard: {
        holderName: '',
        holderCpf: '',
        street: '',
        number: '',
        complement: '',
        district: '',
        postalCode: '',
        city: '',
        state: '',
        token: ''
      },
      installments: {
        quantity: '',
        value: ''
      }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without customer mobileAreaCode', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: 'leonardo@hotmail.com',
        document: '33290159000',
        mobileAreaCode: '',
        mobile: '988888888',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '1',
        description: 'curso',
        amount: '180.00',
        quantity: '1',
        reference: '12156'
      },
      creditCard: {
        holderName: '',
        holderCpf: '',
        street: '',
        number: '',
        complement: '',
        district: '',
        postalCode: '',
        city: '',
        state: '',
        token: ''
      },
      installments: {
        quantity: '',
        value: ''
      }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without customer mobile', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: 'leonardo@hotmail.com',
        document: '33290159000',
        mobileAreaCode: '21',
        mobile: '',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '1',
        description: 'curso',
        amount: '180.00',
        quantity: '1',
        reference: '12156'
      },
      creditCard: {
        holderName: '',
        holderCpf: '',
        street: '',
        number: '',
        complement: '',
        district: '',
        postalCode: '',
        city: '',
        state: '',
        token: ''
      },
      installments: {
        quantity: '',
        value: ''
      }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without item id', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: 'leonardo@hotmail.com',
        document: '33290159000',
        mobileAreaCode: '21',
        mobile: '',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '',
        description: 'curso',
        amount: '180.00',
        quantity: '1',
        reference: '12156'
      },
      creditCard: {
        holderName: '',
        holderCpf: '',
        street: '',
        number: '',
        complement: '',
        district: '',
        postalCode: '',
        city: '',
        state: '',
        token: ''
      },
      installments: {
        quantity: '',
        value: ''
      }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without item description', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: 'leonardo@hotmail.com',
        document: '33290159000',
        mobileAreaCode: '21',
        mobile: '',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '1',
        description: '',
        amount: '180.00',
        quantity: '1',
        reference: '12156'
      },
      creditCard: {
        holderName: '',
        holderCpf: '',
        street: '',
        number: '',
        complement: '',
        district: '',
        postalCode: '',
        city: '',
        state: '',
        token: ''
      },
      installments: {
        quantity: '',
        value: ''
      }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without item amount', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: 'leonardo@hotmail.com',
        document: '33290159000',
        mobileAreaCode: '21',
        mobile: '',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '1',
        description: 'curso',
        amount: '',
        quantity: '1',
        reference: '12156'
      },
      creditCard: {
        holderName: '',
        holderCpf: '',
        street: '',
        number: '',
        complement: '',
        district: '',
        postalCode: '',
        city: '',
        state: '',
        token: ''
      },
      installments: {
        quantity: '',
        value: ''
      }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without item quantity', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: 'leonardo@hotmail.com',
        document: '33290159000',
        mobileAreaCode: '21',
        mobile: '',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '1',
        description: 'curso',
        amount: '180.00',
        quantity: '',
        reference: '12156'
      },
      creditCard: {
        holderName: '',
        holderCpf: '',
        street: '',
        number: '',
        complement: '',
        district: '',
        postalCode: '',
        city: '',
        state: '',
        token: ''
      },
      installments: {
        quantity: '',
        value: ''
      }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without item reference', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: 'leonardo@hotmail.com',
        document: '33290159000',
        mobileAreaCode: '21',
        mobile: '',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '1',
        description: 'curso',
        amount: '180.00',
        quantity: '1',
        reference: ''
      },
      creditCard: {
        holderName: '',
        holderCpf: '',
        street: '',
        number: '',
        complement: '',
        district: '',
        postalCode: '',
        city: '',
        state: '',
        token: ''
      },
      installments: {
        quantity: '',
        value: ''
      }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without item reference', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: 'leonardo@hotmail.com',
        document: '33290159000',
        mobileAreaCode: '21',
        mobile: '',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '1',
        description: 'curso',
        amount: '180.00',
        quantity: '1',
        reference: ''
      },
      creditCard: {
        holderName: '',
        holderCpf: '',
        street: '',
        number: '',
        complement: '',
        district: '',
        postalCode: '',
        city: '',
        state: '',
        token: ''
      },
      installments: {
        quantity: '',
        value: ''
      }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without creditCard holder name', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: 'leonardo@hotmail.com',
        document: '33290159000',
        mobileAreaCode: '21',
        mobile: '',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '1',
        description: 'curso',
        amount: '180.00',
        quantity: '1',
        reference: ''
      },
      creditCard: {
        holderName: '',
        holderCpf: '33290159000',
        street: 'rua exemplo',
        number: '12',
        complement: '',
        district: 'varginha',
        postalCode: '81710-140',
        city: 'nova hamburgo',
        state: 'RJ',
        token: '116513513664156315'
      },
      installments: {
        quantity: '',
        value: ''
      }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without creditCard holder document', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: 'leonardo@hotmail.com',
        document: '33290159000',
        mobileAreaCode: '21',
        mobile: '',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '1',
        description: 'curso',
        amount: '180.00',
        quantity: '1',
        reference: ''
      },
      creditCard: {
        holderName: 'leonardo costa',
        holderCpf: '',
        street: 'rua exemplo',
        number: '12',
        complement: '',
        district: 'varginha',
        postalCode: '81710-140',
        city: 'nova hamburgo',
        state: 'RJ',
        token: '116513513664156315'
      },
      installments: {
        quantity: '',
        value: ''
      }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without the street address of the credit card', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: 'leonardo@hotmail.com',
        document: '33290159000',
        mobileAreaCode: '21',
        mobile: '',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '1',
        description: 'curso',
        amount: '180.00',
        quantity: '1',
        reference: ''
      },
      creditCard: {
        holderName: 'leonardo',
        holderCpf: '33290159000',
        street: '',
        number: '12',
        complement: '',
        district: 'varginha',
        postalCode: '81710-140',
        city: 'nova hamburgo',
        state: 'RJ',
        token: '116513513664156315'
      },
      installments: {
        quantity: '',
        value: ''
      }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without the number address of the credit card', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: 'leonardo@hotmail.com',
        document: '33290159000',
        mobileAreaCode: '21',
        mobile: '',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '1',
        description: 'curso',
        amount: '180.00',
        quantity: '1',
        reference: ''
      },
      creditCard: {
        holderName: 'leonardo costa',
        holderCpf: '33290159000',
        street: 'rua exemplo',
        number: '',
        complement: '',
        district: 'varginha',
        postalCode: '81710-140',
        city: 'nova hamburgo',
        state: 'RJ',
        token: '116513513664156315'
      },
      installments: {
        quantity: '',
        value: ''
      }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without the district address of the credit card', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: 'leonardo@hotmail.com',
        document: '33290159000',
        mobileAreaCode: '21',
        mobile: '',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '1',
        description: 'curso',
        amount: '180.00',
        quantity: '1',
        reference: ''
      },
      creditCard: {
        holderName: 'leonardo costa',
        holderCpf: '33290159000',
        street: 'rua exemplo',
        number: '12',
        complement: '',
        district: '',
        postalCode: '81710-140',
        city: 'nova hamburgo',
        state: 'RJ',
        token: '116513513664156315'
      },
      installments: {
        quantity: '',
        value: ''
      }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without the postal code address of the credit card', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: 'leonardo@hotmail.com',
        document: '33290159000',
        mobileAreaCode: '21',
        mobile: '',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '1',
        description: 'curso',
        amount: '180.00',
        quantity: '1',
        reference: ''
      },
      creditCard: {
        holderName: 'leonardo costa',
        holderCpf: '33290159000',
        street: 'rua exemplo',
        number: '12',
        complement: '',
        district: 'varginha',
        postalCode: '',
        city: 'nova hamburgo',
        state: 'RJ',
        token: '116513513664156315'
      },
      installments: {
        quantity: '',
        value: ''
      }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without the city address of the credit card', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: 'leonardo@hotmail.com',
        document: '33290159000',
        mobileAreaCode: '21',
        mobile: '',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '1',
        description: 'curso',
        amount: '180.00',
        quantity: '1',
        reference: ''
      },
      creditCard: {
        holderName: 'leonardo costa',
        holderCpf: '33290159000',
        street: 'rua exemplo',
        number: '12',
        complement: '',
        district: 'varginha',
        postalCode: '81710-140',
        city: '',
        state: 'RJ',
        token: '116513513664156315'
      },
      installments: {
        quantity: '',
        value: ''
      }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without the state address of the credit card', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: 'leonardo@hotmail.com',
        document: '33290159000',
        mobileAreaCode: '21',
        mobile: '',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '1',
        description: 'curso',
        amount: '180.00',
        quantity: '1',
        reference: ''
      },
      creditCard: {
        holderName: 'leonardo costa',
        holderCpf: '33290159000',
        street: 'rua exemplo',
        number: '12',
        complement: '',
        district: 'varginha',
        postalCode: '81710-140',
        city: 'nova hamburgo',
        state: '',
        token: '116513513664156315'
      },
      installments: {
        quantity: '',
        value: ''
      }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without the state address of the credit card', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: 'leonardo@hotmail.com',
        document: '33290159000',
        mobileAreaCode: '21',
        mobile: '',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '1',
        description: 'curso',
        amount: '180.00',
        quantity: '1',
        reference: ''
      },
      creditCard: {
        holderName: 'leonardo costa',
        holderCpf: '33290159000',
        street: 'rua exemplo',
        number: '12',
        complement: '',
        district: 'varginha',
        postalCode: '81710-140',
        city: 'nova hamburgo',
        state: '',
        token: '116513513664156315'
      },
      installments: {
        quantity: '',
        value: ''
      }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without credit card installment quantity', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: 'leonardo@hotmail.com',
        document: '33290159000',
        mobileAreaCode: '21',
        mobile: '',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '1',
        description: 'curso',
        amount: '180.00',
        quantity: '1',
        reference: ''
      },
      creditCard: {
        holderName: 'leonardo costa',
        holderCpf: '33290159000',
        street: 'rua exemplo',
        number: '12',
        complement: '',
        district: 'varginha',
        postalCode: '81710-140',
        city: 'nova hamburgo',
        state: '',
        token: '116513513664156315'
      },
      installments: {
        quantity: '',
        value: '180.00'
      }
    })).rejects.toThrow()
  })

  it('should not be able to send transactions without credit card installment amount', async () => {
    expect(SendTransactions.execute({
      paymentType: 'boleto',
      customer: {
        name: 'leonardo costa',
        email: 'leonardo@hotmail.com',
        document: '33290159000',
        mobileAreaCode: '21',
        mobile: '',
        hash: 'dfkçlsdfmçkgsçdlgfsogjkfskgfsokgfs'
      },
      item: {
        id: '1',
        description: 'curso',
        amount: '180.00',
        quantity: '1',
        reference: ''
      },
      creditCard: {
        holderName: 'leonardo costa',
        holderCpf: '33290159000',
        street: 'rua exemplo',
        number: '12',
        complement: '',
        district: 'varginha',
        postalCode: '81710-140',
        city: 'nova hamburgo',
        state: '',
        token: '116513513664156315'
      },
      installments: {
        quantity: '1',
        value: ''
      }
    })).rejects.toThrow()
  })
})
