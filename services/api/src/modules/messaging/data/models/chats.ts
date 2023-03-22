import { Media } from '../../domain/types'

export interface ChatFromModel extends ChatToModel {
	_id: string
	readAt: Record<string, number>
	createdAt: number
	updatedAt: number
}

export interface ChatToModel {
	from: string
	to: string
	media: Media | null
	body: string
}