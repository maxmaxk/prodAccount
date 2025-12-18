export interface IErrorAnswer {
  message: string
  response: {
    data: {
      Error: string
      code: string
      message: string
      details: string
    }
    status: number
  }
}

export interface IMessageMap {
  incl: string
  title: string
}
