export interface NewLetterRegister {
  emailRegister: string
}

export interface NewLetterMailAdapter {
  send: (data:NewLetterRegister) => Promise<void>
}

