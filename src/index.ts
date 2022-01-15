import axios from 'axios'
import { parse } from 'node-html-parser'

let root
;(async () => {
  const url =
    'https://www.bookdepository.com/Building-Microservices-Sam-Newman/9781492034025'
  const res = await axios.post(
    url,
    {
      selectCurrency: 'USD',
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )

  const html = parse(res.data)

  const price = html.querySelector('.sale-price')

  console.log(price?.innerText)
})()
