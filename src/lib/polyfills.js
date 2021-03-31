
/* eslint no-extend-native: 0 */
// core-js comes with Next.js. So, you can import it like below
import entries from 'core-js/fn/object/entries';
import values from 'core-js/fn/object/values';
import arrayIncludes from 'core-js/fn/array/includes';
import includes from 'core-js/fn/string/includes';
import find from 'core-js/fn/array/find';
import assign from 'core-js/fn/object/assign';
console.log('Loading Polyfills')
if (!Array.find) {
	Array.find = find;
}
if (!Object.values) {
	Object.values = values;
}
if (!Object.entries) {
	Object.entries = entries;
}
if (!Object.assign) {
	Object.assign = assign;
}
if (!String.includes) {
	String.includes = includes;
}
if (!Array.includes) {
	Array.includes = arrayIncludes;
}
Number.isInteger = Number.isInteger || function(value) {
	return typeof value === 'number' && 
	  isFinite(value) && 
	  Math.floor(value) === value;
  };