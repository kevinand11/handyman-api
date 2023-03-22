import { QueryParams } from 'equipped'
import { CategoryToModel } from '../../data/models/categories'
import { ICategoryRepository } from '../irepositories/categories'

export class CategorysUseCase {
	private repository: ICategoryRepository

	constructor (repository: ICategoryRepository) {
		this.repository = repository
	}

	async add (data: CategoryToModel) {
		return await this.repository.add(data)
	}

	async delete (input: { id: string }) {
		return await this.repository.delete(input.id)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async update (input: { id: string, data: Partial<CategoryToModel> }) {
		return await this.repository.update(input.id, input.data)
	}
}