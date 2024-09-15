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
})