import { PrismaClient } from 'db'
import type * as PrismaTypes from 'db'

let client: PrismaTypes.PrismaClient | null = null

export function getClient() {
  if (client) {
    return client
  }

  client = new PrismaClient()

  return client
}

export { PrismaTypes }
