import db from './db'
import express from "express";
const app = express();

app.get("/users/:username", async (req, res) => {
    const {username } = req.params;
    const user = await db.getUserByUsername(username);
	res.json(user);
});
export { app };
