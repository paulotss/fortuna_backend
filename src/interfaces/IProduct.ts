import { type Decimal } from '@prisma/client/runtime/library'

interface IProduct {
  id?: number
  title: string
  price: Decimal
  amount: number
  barCode: string
}

export default IProduct
