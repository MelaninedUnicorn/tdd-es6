import db from "./db";
import express from "express";
const app = express();

app.get("/users/:username", async (req, res) => {
    const { username } = req.params;
	try {
		
		const user = await db.getUserByUsername(username);
		if (user) {
			res.json(user);
		} else {
			res.status(404).send();
		}
	} catch (error) {
		res.status(500).json(error);
	}
});
export { app };
