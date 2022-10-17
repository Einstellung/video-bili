// Given a maximum price and menu, return the 3 top-rated meals for that price or less.
/**
    const best3Meals = getTop3MealsFor(12, menu);

    [{
      name: 'Lamb Gyro',
      price: 11.86,
      rating: 4.9
    }, {
      name: 'House Salad',
      price: 9.00,
      rating: 4.65
    }, {
      name: 'Gigantus Fries',
      price: 11.86,
      rating: 4.5
    }]
*/
import menu from './menu.js'
import { pipe, sort, slice, descend, prop } from 'ramda'
type items = typeof menu

const getTop3MelasFor1 = (price: number ,items: items) => items
  .filter(item => item.price <= price)
  .sort((a, b) => b.rating - a.rating)
  .slice(0,3)

const result1 = getTop3MelasFor1(20, menu)
console.log({ result1 })

const getTop3MelasFor2 = pipe(
  (price: number ,items: items) => items
  .filter(item => item.price <= price),
  sort((a, b) => b.rating - a.rating),
  slice(0, 3)
) 


const byPrice = descend(prop('rating'))
const getTop3MelasFor3 = pipe(
  (price: number ,items: items) => items
  .filter(item => item.price <= price),
  sort(byPrice),
  slice(0, 3)
) 