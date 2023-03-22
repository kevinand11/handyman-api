import { BaseEntity } from 'equipped'
import { Media } from '../types'

export class ChatEntity extends BaseEntity {
	public readonly id: string
	public readonly from: string
	public readonly to: string
	public readonly body: string
	public readonly media: Media | null
	public readonly createdAt: number
	public readonly updatedAt: number
	public readonly readAt: Record<string, number>

	constructor ({ id, from, to, body, media, createdAt, updatedAt, readAt }: ChatConstructorArgs) {
		super()
		this.id = id
		this.from = from
		this.to = to
		this.body = body
		this.media = media
		this.createdAt = createdAt
		this.updatedAt = updatedAt
		this.readAt = readAt
	}

	get members () {
		return [this.from, this.to]
	}
}

type ChatConstructorArgs = {
	id: string
	from: string
	to: string
	body: string
	media: Media | null
	createdAt: number
	updatedAt: number
	readAt: Record<string, number>
}
