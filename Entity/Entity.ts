import {
	PrimaryGeneratedColumn,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

export default abstract class Entity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number | string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
