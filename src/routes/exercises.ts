import express, {Request, Response} from 'express';
import {Database} from "../database/client";

export const exercisesRouter = express.Router();

exercisesRouter.get('/', async (req: Request, res: Response) => {
    const db = await Database.getConnection()
    const query = {
        text: 'SELECT * FROM exercises'
    }
    const response = await db.query(query)
    await db.end()
    res.send(response.rows)
});


exercisesRouter.post('/', async (req: Request, res: Response) => {
    const db = await Database.getConnection()
    const query = {
        text: `
            INSERT INTO exercises(name, image, workout_id)
            VALUES($1, $2, $3)
            RETURNING id, image, workout_id
        `,
        values: [req.body.name, req.body.image, req.body.workout_id]
    }
    const response = await db.query(query)
    await db.end()
    res.send(response.rows)
})