import express, {Request, Response} from "express";
import {Database} from "../database/client";
import crypto from 'node:crypto'
export const usersRouter = express.Router();

usersRouter.get('/', async (req: Request, res: Response) => {
    try {
        const query = {
            text: 'SELECT * FROM users'
        };
        const db = await Database.getConnection()
        const response = await db.query(query);
        await db.end()
        res.json(response.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Unexpected erro"
        })
    }
});

usersRouter.post('/', async(req: Request, res: Response) => {
    const db = await Database.getConnection()
    const id = crypto.randomUUID()
    const query = {
        text: 'INSERT INTO users(id,name, email, password) VALUES($1, $2, $3, $4)',
        values: [id, req.body.name, req.body.email, req.body.password]
    }
    const response = await db.query(query)
    await db.end()
    res.json(response.rows)
})