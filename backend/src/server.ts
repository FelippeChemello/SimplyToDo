import express from 'express'
import cors from 'cors'

import routes from './routes'
import errorHandler from './errors/handler'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errorHandler)

app.listen(process.env.PORT || 3333, () => console.log(`Backend is running on ${process.env.PORT || 3333} with ${process.env.NODE_ENV} env!`))
