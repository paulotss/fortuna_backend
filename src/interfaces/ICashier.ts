import IProduct from "./IProduct"

export default interface ICashier {
  id: number | undefined
  title: string
  productAmount?: number
  products?: IProduct[]
}
