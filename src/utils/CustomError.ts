class CustomError extends Error {
  private readonly code: number

  constructor (message: string, code: number) {
    super(message)
    this.code = code
  }

  public get status (): number {
    return this.code
  }
}

export default CustomError
