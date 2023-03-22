import { QueryParams, QueryResults } from 'equipped'
import { UserEntity } from '../entities/users'
import { UserBio, UserLocation, UserMeta, UserRoles } from '../types'

export interface IUserRepository {
	getUsers (query: QueryParams): Promise<QueryResults<UserEntity>>

	createOrUpdateUser (userId: string, data: UserBio, timestamp: number): Promise<void>

	updateUserWithRoles (userId: string, data: UserRoles, timestamp: number): Promise<void>

	markUserAsDeleted (userId: string, timestamp: number): Promise<void>

	findUser (userId: string): Promise<UserEntity | null>

	incrementUserMetaProperty (userId: string, propertyName: UserMeta, value: 1 | -1): Promise<void>

	updateUserStatus (userId: string, socketId: string, add: boolean): Promise<boolean>

	updateLocation (userId: string, location: UserLocation): Promise<UserEntity | null>

	resetAllUsersStatus (): Promise<boolean>

	updateRatings (userId: string, ratings: number, add: boolean): Promise<boolean>
}