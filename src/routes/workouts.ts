import express, {Request, Response} from "express";
import { Database } from "../database/client";

export const workoutsRouter = express.Router();


workoutsRouter.get('/', async (req: Request, res: Response) => {
    const db = await Database.getConnection()
    const query = {
        text: 'SELECT * FROM workouts'
    }
    const response = await db.query(query)
    await db.end()
    res.send(response.rows)
});


workoutsRouter.post('/', async (req: Request, res: Response) => {
    const db = await Database.getConnection()
    const query = {
        text: `
            INSERT INTO workouts(name, user_id)
            VALUES($1,$2)
            RETURNING id, name, user_id
        `,
        values: [req.body.name, req.body.user_id]
    }
    const response = await db.query(query)
    await db.end()
    res.send(response.rows)
})