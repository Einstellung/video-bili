// Given a cart, return the cheapest item’s name.
// const cheapestItem = getCheapestItem(cart); // 'apple'
import cart from "./cart.js";
import { pipe, prop, sort, head, sortBy, descend } from "ramda";
type items = typeof cart
type item = typeof cart[0]

const getItemFirst = (items: number[]) => items[0]

const getCheapestItem1 = (items: items) => {
  const byPriceAsc = items
    .sort((a, b) => a.price - b.price)
  
  const cheapest = byPriceAsc[0]
  return cheapest.name
}

const result1 = getCheapestItem1(cart)
console.log({ result1 })

const getCheapestItem2 = pipe(
  sort((a: item, b: item) => a.price - b.price),
  (list: item) => list[0],
  prop('name')
)

const getCheapestItem3 = pipe(
  sortBy(prop('name')),
  head,
  prop('name')
)
