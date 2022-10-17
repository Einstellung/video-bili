import { pathOr, identity } from 'ramda';

const getInputValue = pathOr('', ['target', 'value']);
console.log(identity(getInputValue))
