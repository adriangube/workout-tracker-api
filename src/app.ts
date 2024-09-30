import '@config/env'
import express, { json, Express } from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { router } from '@adapters/routes'
import swaggerOutput from '@adapters/swagger/swagger_output.json'
import { config } from '@config/index'
import { errorMiddleware } from '@adapters/middlewares/errorMiddleware'

const app: Express = express()

app.use(json())
app.use(morgan('tiny'))
app.disable('x-powered-by')


app.use('/', router)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput))

app.use(errorMiddleware)
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})
const port = config.PORT
app.listen(port, () => {
  console.info(`App listening on port ${port}`)
})      