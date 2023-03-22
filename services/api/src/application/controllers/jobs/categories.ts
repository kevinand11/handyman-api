import { CategoriesUseCases } from '@modules/jobs'
import { NotAuthorizedError, QueryParams, Request, Schema, validate } from 'equipped'

export class CategoryController {
	private static schema = () => ({
		title: Schema.string().min(1)
	})

	static async find (req: Request) {
		return await CategoriesUseCases.find(req.params.id)
	}

	static async get (req: Request) {
		const query = req.query as QueryParams
		return await CategoriesUseCases.get(query)
	}

	static async update (req: Request) {
		const data = validate(this.schema(), req.body)

		const updatedCategory = await CategoriesUseCases.update({ id: req.params.id, data })
		if (updatedCategory) return updatedCategory
		throw new NotAuthorizedError()
	}

	static async create (req: Request) {
		const data = validate(this.schema(), req.body)

		return await CategoriesUseCases.add(data)
	}

	static async delete (req: Request) {
		const isDeleted = await CategoriesUseCases.delete({ id: req.params.id })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}