// const price = getTotalPrice(cart); // '$44.20'
// you solution must be point-free

import cart from './cart.js'
import { pipe, pluck, sum } from 'ramda'
type items = typeof cart

const toUSD = (amount: number) => amount.toLocaleString('en-US', {
  style: "currency",
  currency: "USD"
})

const getTotalPrice1 = (items: items) => {
  const total = items
    .map(item => item.price)
    .reduce((pre, cur) => pre + cur)

  return toUSD(total)
}

const result1 = getTotalPrice1(cart)
console.log({ result1 })

const getTotalPrice2 = pipe(
  pluck('price'),
  sum,
  toUSD
)

const result2 = getTotalPrice2(cart)
console.log({ result2 })