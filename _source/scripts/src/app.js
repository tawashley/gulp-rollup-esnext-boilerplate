import { dep1 } from './dep1.js';
import { dep2 } from './dep2.js';
import * as DOMUtils from './dom-utils';

function getBundleDetailsHTML() {
    var html = [];

    html.push(`<p>JS bundle being used: <strong>${__BUNDLE_TYPE}</strong></p>`);
    html.push(`<p>Is the JS bundle legacy: <strong>${__BUNDLE_LEGACY}</strong></p>`)

    return html.join('');
}

export function start() {
    console.log('JS bundle -->', __BUNDLE_TYPE);
    console.log('Is the JS bundle legacy -->', __BUNDLE_LEGACY);
    console.log('Test Dependency 1 value:', dep1);
    console.log('Test Dependency 2 value:', dep2);

    var elemBundleDetails = document.querySelector('[data-bundle-details]');

    elemBundleDetails.innerHTML = getBundleDetailsHTML();
}

export default {
    start
}
