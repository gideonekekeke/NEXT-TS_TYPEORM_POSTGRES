import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../Entity/userEntity";
import ensureConnection from "../../ormconfig";

ensureConnection();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		if (req.method === "GET") {
			const users = await User.find();
			if (!users || users.length === 0) {
				return res.status(404).json({
					message: "No users found",
				});
			}
			return res.status(200).json({
				message: "success",
				data: users,
			});
		} else {
			return res.status(404).json({
				message: "wrong method",
			});
		}
	} catch (error) {
		console.error("Error fetching users:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}
