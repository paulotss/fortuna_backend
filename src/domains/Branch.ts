import type IBranch from '../interfaces/IBranch'

class Branch {
  private id: number | undefined
  private title: string

  constructor (branch: IBranch) {
    this.id = branch.id
    this.title = branch.title
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

export default Branch
