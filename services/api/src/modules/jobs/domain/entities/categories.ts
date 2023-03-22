import { BaseEntity } from 'equipped'

export class CategoryEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		id, title, createdAt, updatedAt
	}: CategoryConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type CategoryConstructorArgs = {
	id: string
	title: string
	createdAt: number
	updatedAt: number
}