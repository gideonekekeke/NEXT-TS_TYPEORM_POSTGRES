import { NextApiRequest, NextApiResponse } from "next";

import ensureConnection from "../../ormconfig";
import User from "../../Entity/userEntity";

ensureConnection();

const  handler = async(
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	try {
		const users = await User.find({});

		if (!users || users.length === 0) {
			return res.status(404).json({
				message: "No users found",
			});
		}

		return res.status(200).json({
			message: "success",
			data: users,
		});
	} catch (error) {
		console.error("Error fetching users:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export default handler
