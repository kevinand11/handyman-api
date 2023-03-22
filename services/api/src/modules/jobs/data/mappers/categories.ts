import { BaseMapper } from 'equipped'
import { CategoryEntity } from '../../domain/entities/categories'
import { CategoryFromModel, CategoryToModel } from '../models/categories'

export class CategoryMapper extends BaseMapper<CategoryFromModel, CategoryToModel, CategoryEntity> {
	mapFrom (model: CategoryFromModel | null) {
		if (!model) return null
		const { _id, title, createdAt, updatedAt } = model
		return new CategoryEntity({
			id: _id.toString(), title, createdAt, updatedAt
		})
	}

	mapTo (entity: CategoryEntity) {
		return {
			title: entity.title
		}
	}
}