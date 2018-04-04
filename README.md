# Gulp ESNext Boilerplate
| Boilerplate for ESNext modules using Rollup, Babel and Gulp

## What does this do

This is a light boilerplate setup for using compiling ESNext bundles. The build process produces two bundles

* `main.js` - this bundle isn't transpiled though uses Rollup for bundle creation
* `main-legacy.js` - this bundle is transpiled down to ES5 code whilst using Rollup for bundle creation

Running the local server presents you with a page showing which of the two generated bundles are used. The browser decides which bundle to load, a combination of `<script type="module">` and `<script nomodule>` an idea I first read and theory of which can be read in [Deploying ES2015+ Code in Production Today](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)

Build setup can be seen in `gulpfile.js` and the implementation in `index.html`

## Setup

* `npm i` to install all dependencies
* `gulp` to build the assets
* `npm run serve` to spool up a test server. This displays on screen which JS bundle is being used
