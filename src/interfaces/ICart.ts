import ICashier from "./ICashier"
import IClient from "./IClient"
import IProduct from "./IProduct"

interface ICart {
  id?: number
  createdAt: Date
  status: boolean
  clientId: number
  cashierId: number
  cashier?: ICashier
  client?: IClient
  products?: IProduct[]
}

export default ICart
