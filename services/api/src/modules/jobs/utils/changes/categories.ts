import { appInstance } from '@utils/types'
import { DbChangeCallbacks } from 'equipped'
import { CategoryFromModel } from '../../data/models/categories'
import { CategoryEntity } from '../../domain/entities/categories'

export const CategoryDbChangeCallbacks: DbChangeCallbacks<CategoryFromModel, CategoryEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created(['jobs/categories', `jobs/categories/${after.id}`], after)
	},
	updated: async ({ after }) => {
		await appInstance.listener.updated(['jobs/categories', `jobs/categories/${after.id}`], after)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted(['jobs/categories', `jobs/categories/${before.id}`], before)
	}
}