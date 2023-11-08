import type Product from '../domains/Product'

export default interface ILoss {
  id?: number
  amount: number
  description: string
  createAt: Date
  product?: Product
}
