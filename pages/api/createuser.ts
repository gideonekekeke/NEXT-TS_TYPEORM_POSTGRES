import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { createConnection, getRepository } from "typeorm";
import { User } from "../../Entity/userEntity";
import ensureConnection from "../../ormconfig";

ensureConnection();

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		try {
			const { name } = req.body;

			// Create a new user entity
			const user = new User();
			user.name = name;

			// Save the user to the database
			await user.save();
		} catch (error) {
			res.status(500).json({ error: "User creation failed" });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
};
