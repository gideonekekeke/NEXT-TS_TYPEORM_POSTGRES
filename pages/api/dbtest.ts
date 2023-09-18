import { createConnection, Connection } from "typeorm";

export async function checkPostgresConnection(): Promise<void> {
	let connection: Connection;

	try {
		// Create a connection to your PostgreSQL database
		connection = await createConnection(); // Replace with your connection name

		// Check if the connection is established
		if (connection.isConnected) {
			console.log("PostgreSQL database is connected!");
		} else {
			console.error("PostgreSQL database connection failed.");
		}
	} catch (error) {
		console.error("Error connecting to PostgreSQL database:", error);
	} finally {
		// Close the connection (optional, but a good practice)
	}
}

// Call the function to check the PostgreSQL database connection
// checkPostgresConnection();
