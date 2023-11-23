import type IMethod from '../interfaces/IMethod'

class Method {
  private id: number | undefined
  private title: string

  constructor (method: IMethod) {
    this.id = method.id
    this.title = method.title
  }

  public getId (): number | undefined {
    return this.id
  }

  public setId (id: number): void {
    this.id = id
  }

  public getTitle (): string {
    return this.title
  }

  public setTitle (title: string): void {
    this.title = title
  }
}

export default Method
