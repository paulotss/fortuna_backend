import Product from '../domains/Product'

interface ISupplier {
  id?: number
  name: string
  products?: Product[]
}

export default ISupplier
