import { NextApiRequest, NextApiResponse } from "next";
import ensureConnection from "../../ormconfig";
import User from "../../Entity/userEntity";

ensureConnection();

const myHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		try {
			const { email, username, password } = req.body;
			const user = new User();
			user.email = email;
			user.password = password;
			user.username = username;

			await user.save();

			res.status(201).json({ message: "User created successfully" });
		} catch (error) {
			console.error("Error creating user:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
};
4;
export default myHandler;
