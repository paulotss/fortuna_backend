import express from 'express'
import userRouter from './routes/user.route'
import clientRouter from './routes/client.route'
import productRouter from './routes/product.route'
import invoiceRouter from './routes/invoice.route'
import cashierRouter from './routes/cashier.route'
import branchRouter from './routes/branch.route'
import levelRouter from './routes/level.router'
import expenseRouter from './routes/expense.route'
import lossRouter from './routes/loss.route'
import receiptRouter from './routes/receipt.route'
import methodRouter from './routes/method.route'
import roleRouter from './routes/role.route'
import supplierRouter from './routes/supplier.route'
import ErrorHandle from './middlewares/ErrorHandle'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.use(userRouter)
app.use(clientRouter)
app.use(productRouter)
app.use(invoiceRouter)
app.use(cashierRouter)
app.use(branchRouter)
app.use(levelRouter)
app.use(expenseRouter)
app.use(lossRouter)
app.use(receiptRouter)
app.use(methodRouter)
app.use(roleRouter)
app.use(supplierRouter)

app.use(ErrorHandle.handle)

export default app
