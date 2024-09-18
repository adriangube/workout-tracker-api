import './env'
import express, {json, Express, Request, Response} from 'express';
import morgan from 'morgan'
import { workoutsRouter } from './routes/workouts'
import { usersRouter } from './routes/users'
import { exercisesRouter } from './routes/exercises'

const app: Express = express();

app.use(json())
app.use(morgan('tiny'))
app.disable('x-powered-by')


app.use('/api/workouts', workoutsRouter)
app.use('/api/users', usersRouter)
app.use('/api/exercises', exercisesRouter)

app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})      