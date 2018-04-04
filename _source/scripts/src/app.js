import { dep1 } from './dep1.js';
import { dep2 } from './dep2.js';
import * as DOMUtils from './dom-utils';

export function start() {
    console.log('Is the JS bundle legacy -->', __BUNDLE_LEGACY);
    console.log('JS bundle type -->', __BUNDLE_TYPE);
    console.log('Test Dependency 1 value:', dep1);
    console.log('Test Dependency 2 value:', dep2);
}

export default {
    start
}
