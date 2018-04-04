export function getBundleDetailsHTML() {
	var html = [];

    html.push(`<p>JS bundle being used: <strong>${__BUNDLE_TYPE}</strong></p>`);
    html.push(`<p>Is the JS bundle legacy: <strong>${__BUNDLE_LEGACY}</strong></p>`)

    return html.join('');
}
