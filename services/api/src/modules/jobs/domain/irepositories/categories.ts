import { QueryParams, QueryResults } from 'equipped'
import { CategoryToModel } from '../../data/models/categories'
import { CategoryEntity } from '../entities/categories'

export interface ICategoryRepository {
	add: (data: CategoryToModel) => Promise<CategoryEntity>
	get: (query: QueryParams) => Promise<QueryResults<CategoryEntity>>
	find: (id: string) => Promise<CategoryEntity | null>
	update: (id: string, data: Partial<CategoryToModel>) => Promise<CategoryEntity | null>
	delete: (id: string) => Promise<boolean>
}