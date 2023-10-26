import type ILevel from '../interfaces/ILevel'

class Level {
  private id: number | undefined
  private title: string
  private acronym: string

  constructor (level: ILevel) {
    this.id = level.id
    this.title = level.title
    this.acronym = level.acronym
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

  public getAcronym (): string {
    return this.acronym
  }

  public setAcronym (acronym: string): void {
    this.acronym = acronym
  }
}

export default Level
