import axios from 'axios'
import { parse } from 'node-html-parser'
;(async () => {
  const url =
    'https://www.bookdepository.com/Building-Microservices-Sam-Newman/9781492034025'

  const res = await axios.post(
    url,
    {
      selectCurrency: 'THB',
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept-language': 'en-US,en;q=0.9,th;q=0.8',
      },
    }
  )

  const html = parse(res.data)

  const price = html.querySelector('.sale-price')

  console.log(price?.innerText)
})()
