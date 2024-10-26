import '@/app/config/env'
import express, { json, Express } from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { router } from '@/app/infrastructure/routes'
import swaggerOutput from '@/app/infrastructure/swagger/swagger_output.json'
import { config } from '@/app/config/index'
import { errorMiddleware } from '@/app/infrastructure/middlewares/errorMiddleware'
import { initializeAdminUser } from '@/muscleGroup/application/initializeAdminUser'
import helmet from 'helmet'

const app: Express = express()

app.use(json())
app.use(morgan('tiny'))
app.disable('x-powered-by')
app.use(helmet({
  crossOriginEmbedderPolicy: false
}))

app.use('/', router)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput))

app.use(errorMiddleware)
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})
const port = config.PORT
app.listen(port, () => {
  console.info(`App listening on port ${ port }`)
})
initializeAdminUser()