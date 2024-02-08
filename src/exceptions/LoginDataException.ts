// private message,
//     private field,
//     private status,
//     private error,

interface IErrorData {
  field: string
  status: number
  error: string
  message: string
}

export class LoginDataException {
  constructor(private data: IErrorData) {}

  Field() {
    return this.data.field
  }

  Status() {
    return this.data.status
  }

  Message() {
    return this.data.message
  }
}
