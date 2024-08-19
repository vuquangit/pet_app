import { IAuthMe } from './auth'

export interface IDinosaur {
  id: string
  userId: string
  user: IAuthMe
  score: number
}

export interface IDinosaurCreate {
  userId: string
  score: number
}
