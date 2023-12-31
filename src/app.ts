import express from 'express'
import clientRouter from './routes/client.route'
import sellerRouter from './routes/seller.route'
import productRouter from './routes/product.route'
import invoiceRouter from './routes/invoice.route'
import cashierRouter from './routes/cashier.route'
import branchRouter from './routes/branch.route'
import levelRouter from './routes/level.router'
import expenseRouter from './routes/expense.route'
import lossRouter from './routes/loss.route'
import managerRouter from './routes/manager.route'
import receiptRouter from './routes/receipt.route'
import methodRouter from './routes/method.route'
import ErrorHandle from './middlewares/ErrorHandle'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.use(clientRouter)
app.use(sellerRouter)
app.use(productRouter)
app.use(invoiceRouter)
app.use(cashierRouter)
app.use(branchRouter)
app.use(levelRouter)
app.use(expenseRouter)
app.use(lossRouter)
app.use(managerRouter)
app.use(receiptRouter)
app.use(methodRouter)

app.use(ErrorHandle.handle)

export default app
