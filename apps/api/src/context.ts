import { PrismaTypes } from './db'

export interface AppContext {
  db: PrismaTypes.PrismaClient
}
