import axios from 'axios'
import { parse } from 'node-html-parser'
import currency from 'currency.js'

async function main() {
  const url =
    'https://www.bookdepository.com/Building-Microservices-Sam-Newman/9781492034025'

  const res = await axios.get(url, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'accept-language': 'en-US,en;q=0.9,th;q=0.8',
    },
  })

  const html = parse(res.data)

  const price = html.querySelector('.sale-price')

  if (price) {
    console.log(currency(price.innerText).value)
  }
}

main()
