<img src="docs/images/pushin-logo.svg" width="100">

# pushIn.js

[![made-with-javascript](https://img.shields.io/badge/Made%20with-TypeScript-1f425f.svg)](https://www.typescriptlang.org/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/nateplusplus/pushin/graphs/commit-activity)
![Maintainer](https://img.shields.io/badge/maintainer-nateplusplus-blue)
[![GitHub license](https://img.shields.io/github/license/nateplusplus/pushin.svg)](https://github.com/nateplusplus/pushin/blob/main/LICENSE)
[![Node.js CI](https://github.com/nateplusplus/pushin/actions/workflows/node.js.yml/badge.svg)](https://github.com/nateplusplus/pushin/actions/workflows/node.js.yml)

PushIn.js is a lightweight parallax effect, built with JavaScript, that simulates an interactive dolly-in or push-in animation on a webpage.

Check out the [live demo](http://nateplusplus.github.io/pushin/) for a working example.

## Compatibility

PushIn.js supports all browsers that are [ES5-compliant](http://kangax.github.io/compat-table/es5/) (IE8 and below are not supported).

## Getting started

### 1. Install pushin with NPM or a CDN

If you're using npm, you can install the package by running:

```
npm install --save pushin
```

Import assets into your javascript (if using Webpack) or directly into your CSS files.

```js
// webpack
import 'pushin/dist/pushin.css';
```

~ _or_ ~

```css
/* css */
@import 'node_modules/pushin/dist/pushin.css';
```

**Alternatively, you can use the CDN:**

```html
<link rel="stylesheet" href="https://unpkg.com/pushin/dist/pushin.min.css" />
<script
  type="text/javascript"
  src="https://unpkg.com/pushin/dist/umd/pushin.min.js"
></script>
```

### 2. Required HTML structure

At the most basic level, there are a few things you need to set up on your page in order for this to work properly.

Use the following example snippet to create a "scene" for the pushin effect.

**Example:**

```html
<div class="pushin">
  <div class="pushin-scene">
    <div class="pushin-layer">This is the first layer you'll see.</div>
    <div class="pushin-layer">
      This is a second layer, which will be positioned behind the first one.
    </div>
  </div>
</div>
```

Each div with the class `pushin-layer` can hold the content that you want to grow or shrink when scrolling.

### 3. Initialize the effect

Once you have your HTML set up, there are two ways to initialize the effect:

- call `new PushIn().start()`:

```js
import { PushIn } from 'pushin';

const container = document.querySelector('.pushin');
new PushIn(container).start();
```

- call `pushInStart()` function (which is exported onto the global scope):

```js
import 'pushin';

pushInStart();
```

To assist in setting up your effect, you can use the debug tool to easily deterimine where you want effects to begin and end when scrolling down your page. To enable this feature, simply pass a config object with `debug: true` into the helper function.

See a working demo of this tool here: [Responsive design](http://nateplusplus.github.io/pushin/examples/responsive/)

```js
import 'pushin';

// initialize push-in effect
pushInStart({ debug: true });
```

### 4. Destroying the effect

The `PushIn` has a `destroy()` method that may be called to do all cleanups once the view is destroyed. For instance, this is how you would want to do this in React:

```jsx
import React, { useLayoutEffect, useRef } from 'react';
import { PushIn } from 'pushin';

export default function PushInComponent() {
  const pushInContainer = useRef();

  useLayoutEffect(() => {
    const pushIn = new PushIn(pushInContainer.current);
    pushIn.start();

    return () => pushIn.destroy();
  });

  return (
    <div className="pushin" ref={pushInContainer}>
      <div className="pushin-scene">
        <div className="pushin-layer">This is the first layer you'll see.</div>
        <div className="pushin-layer">
          This is a second layer, which will be positioned behind the first one.
        </div>
      </div>
    </div>
  );
}
```

### 5. Configuration

There are several plugin configurations you can use to customize for your unique project.

**Refer to [https://nateplusplus.github.io/pushin/api](https://nateplusplus.github.io/pushin/api) for a detailed breakdown of all available configurations.**

## SSR

This effect is heavily reliant on window events, which will not be available in a server-side rendered environment. You will need to bind the window events once the DOM has loaded on the client side. To do this, run the `bindEvents()` method.

```js
// Start up the effect server-side
const pushIn = new PushIn();
pushIn.start();

//...

// Bind events client-side
pushin.bindEvents();
```

## Contributing

We've setup separate documentation for contributors: [CONTRIBUTING.md](CONTRIBUTING.md)

## Development Setup

We've setup separate documentation for developers: [DEVELOPERS.md](DEVELOPERS.md)
