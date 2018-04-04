import { dep1 } from './dep1.js';
import { dep2 } from './dep2.js';
import * as DOMUtils from './dom-utils';

export function start() {
    console.log('Dependency 1 value:', dep1);
	console.log('Dependency 2 value:', dep2);
}

export default {
    start
}
