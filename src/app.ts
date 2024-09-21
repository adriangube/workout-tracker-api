import './env'
import express, {json, Express, Request, Response} from 'express';
import morgan from 'morgan'
import { router } from './adapters/routes';
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import { config } from '@config/index'

const app: Express = express();

app.use(json())
app.use(morgan('tiny'))
app.disable('x-powered-by')


app.use('/', router)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));


app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

const port = config.PORT;
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})      