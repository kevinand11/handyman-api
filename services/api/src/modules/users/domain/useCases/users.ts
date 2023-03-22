import { QueryParams } from 'equipped'
import { IUserRepository } from '../irepositories/users'
import { UserBio, UserMeta, UserRoles } from '../types'

export class UsersUseCase {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async createOrUpdateUser (params: { id: string, data: UserBio, timestamp: number }) {
		return await this.repository.createOrUpdateUser(params.id, params.data, params.timestamp)
	}

	async updateRoles (params: { id: string, data: UserRoles, timestamp: number }) {
		return await this.repository.updateUserWithRoles(params.id, params.data, params.timestamp)
	}

	async markDeleted (params: { id: string, timestamp: number }) {
		return await this.repository.markUserAsDeleted(params.id, params.timestamp)
	}

	async find (id: string) {
		return await this.repository.findUser(id)
	}

	async get (query: QueryParams) {
		return await this.repository.getUsers(query)
	}

	async incrementMeta (params: { id: string, value: 1 | -1, property: UserMeta }) {
		return await this.repository.incrementUserMetaProperty(params.id, params.property, params.value)
	}

	async updateStatus (input: { userId: string, socketId: string, add: boolean }) {
		return await this.repository.updateUserStatus(input.userId, input.socketId, input.add)
	}

	async resetAllUsersStatus () {
		return await this.repository.resetAllUsersStatus()
	}
}