import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import "reflect-metadata";

@Entity({ name: "User" })
export class User extends BaseEntity {
	@PrimaryGeneratedColumn({})
	id: string | number = "";

	@Column()
	name: string = "";
}
