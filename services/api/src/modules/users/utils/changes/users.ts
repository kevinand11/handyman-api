import { ReviewsUseCases } from '@modules/jobs'
import { appInstance } from '@utils/types'
import { DbChangeCallbacks } from 'equipped'
import { UserFromModel } from '../../data/models/users'
import { UserEntity } from '../../domain/entities/users'

export const UserDbChangeCallbacks: DbChangeCallbacks<UserFromModel, UserEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created(['users/users', `users/users/${after.id}`], after)
	},
	updated: async ({ after, changes }) => {
		await appInstance.listener.created(['users/users', `users/users/${after.id}`], after)
		const updatedBioOrRoles = !!changes.bio || !!changes.roles
		if (updatedBioOrRoles) await Promise.all(([
			ReviewsUseCases
		]).map(async (useCase) => await useCase.updateUserBio(after.getEmbedded())))
	},
	deleted: async ({ before }) => {
		await appInstance.listener.created(['users/users', `users/users/${before.id}`], before)
	}
}