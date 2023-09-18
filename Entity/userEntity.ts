import {
	Entity as TOEntity,
	Column,
	Index,
	BeforeInsert,
	OneToMany,
} from "typeorm";

import Entity from "./Entity";

@TOEntity("users")
export default class User extends Entity {
	@Column({ unique: true })
	email: string;

	@Column({ unique: true })
	username: string;

	@Column()
	password: string;
}
