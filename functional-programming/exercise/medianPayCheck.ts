// Given a list of employee salaries, find the median monthly paycheck above $100,000.
import employees from './employees.js';
import { filter, map, median, pipe, prop } from 'ramda';
type items = typeof employees

const toUSD = (amount) => amount.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
});

const getMedianPaycheck = pipe(
  map(prop('salary')),
  filter((amount) => amount >= 100000),
  median,
  (amount) => amount / 12,
  toUSD
);

const result = getMedianPaycheck(employees);

console.log({ result });