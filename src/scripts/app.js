import { dep1 } from './dep1.js';
import { dep2 } from './dep2.js';

export function run() {
	console.log('Dependency 1 value:', dep1);
	console.log('Dependency 2 value:', dep2);
}

export function run2() {
	console.log('Dependency 1 value:', dep1);
	console.log('Dependency 2 value:', dep2);
}

export default {
	run,
	run2
}
