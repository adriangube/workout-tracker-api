import express, {Request, Response} from "express";
import {Database} from "../database/client";
export const usersRouter = express.Router();

usersRouter.get('/', async (req: Request, res: Response) => {
    try {
        let query = 'SELECT id, name, email FROM users'
        if(req.query['include'] === 'workouts') {
            query = `
                SELECT users.id as id, users.name as name, users.email as email,
                    CASE
                        WHEN COUNT(workouts.id) = 0 THEN NULL
                        ELSE json_agg(
                                json_build_object(
                                    'id', workouts.id,
                                    'name', workouts.name
                                )
                            )
                    END as workouts
                FROM users
                LEFT JOIN workouts ON users.id = workouts.user_id
                GROUP BY users.id
            `
        } else if(req.query['include'] === 'workouts.exercises') {
            query = `
                SELECT users.id as id, users.name as name, users.email as email,
                    CASE
                        WHEN COUNT(workouts.id) = 0 THEN NULL
                        ELSE json_agg(
                                json_build_object(
                                    'id', workouts.id,
                                    'name', workouts.name,
                                    'exercises', (
                                        SELECT json_agg(
                                                json_build_object(
                                                    'id', exercises.id,
                                                    'name', exercises.name,
                                                    'image', exercises.image
                                                )
                                        )
                                        FROM exercises
                                        WHERE exercises.workout_id = workouts.id
                                    )
                                )
                            )
                    END as workouts
                FROM users
                LEFT JOIN workouts ON users.id = workouts.user_id
                LEFT JOIN exercises ON exercises.workout_id = workouts.id
                GROUP BY users.id
            `
        } else if (req.query['include'] === 'exercises') {
            res.status(400).json({
                 "error": "Invalid query parameter",
                "message": "The 'exercises' relation cannot be included without 'workouts'."
            })
        }

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
    const query = {
        text: `
            INSERT INTO users(name, email, password)
            VALUES($1, $2, $3)
            RETURNING id, name, email
        `,
        values: [req.body.name, req.body.email, req.body.password]
    }
    const response = await db.query(query)
    await db.end()
    res.json(response.rows)
})