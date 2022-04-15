import axios from 'axios'
import { parse } from 'node-html-parser'
import currency from 'currency.js'
import pino from 'pino'
import { PrismaClient } from 'db'

async function main() {
  const logger = pino()
  const db = new PrismaClient()

  const books = await db.book.findMany()

  for (const book of books) {
    const bookLogger = logger.child({ book })

    bookLogger.info(`${book.name}: Fetching`)
    const url = book.url

    const res = await axios.get(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept-language': 'en-US,en;q=0.9,th;q=0.8',
      },
    })

    const html = parse(res.data)

    const priceElement = html.querySelector('.sale-price')

    if (priceElement) {
      const price = currency(priceElement.innerText).value
      bookLogger.info(`${book.name}: ${price}THB`)

      continue
    }

    bookLogger.warn(`${book.name}: Price Not Found`)
  }
}

main()
