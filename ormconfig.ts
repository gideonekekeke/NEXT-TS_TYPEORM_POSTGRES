import "reflect-metadata";
import { Connection, getConnectionManager } from "typeorm";
import User from "./Entity/userEntity";

const options = {
	default: {
		type: "postgres",
		host: "localhost",
		port: 1378,
		username: process.env.POSTGRES_USERNAME,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DATABASE,
		synchronize: false,
		entities: [User],
	},
};

const entitiesChanged = (prevEntities: any[], newEntities: any[]): boolean => {
	if (prevEntities.length !== newEntities.length) return true;

	for (let i = 0; i < prevEntities.length; i++) {
		if (prevEntities[i] !== newEntities[i]) return true;
	}

	return false;
};

const updateConnectionEntities = async (
	connection: Connection,
	entities: any[],
) => {
	// @ts-ignore
	if (!entitiesChanged(connection.options.entities, entities)) return;

	// @ts-ignore
	connection.options.entities = entities;

	// @ts-ignore
	connection.buildMetadatas();

	if (connection.options.synchronize) {
		await connection.synchronize();
	}
};

export const ensureConnection = async (
	name: string = "default",
): Promise<Connection> => {
	const connectionManager = getConnectionManager();

	if (connectionManager.has(name)) {
		const connection = connectionManager.get(name);

		if (!connection.isConnected) {
			await connection.connect();
		}

		if (process.env.NODE_ENV !== "production") {
			// @ts-ignore
			await updateConnectionEntities(connection, options[name].entities);
		}

		return connection;
	}

	return await connectionManager.create({ name, ...options[name] }).connect();
};

export default ensureConnection;
