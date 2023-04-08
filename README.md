# svelte-scribe

This is a SvelteKit preprocessor that allows you to write and include markdown files in your SvelteKit project using Stripe's [Markdoc](https://markdoc.dev/) library.

## Installation

```bash
npm install --save-dev svelte-scribe
```

## Usage
---
### Configuration


In your `svelte.config.js` file, add the following:

```js
import scribe from 'svelte-scribe';

import path from 'path';

const __dirname = path.resolve();

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	extensions: ['.svelte', '.markdoc', '.md', '.ts'],
	preprocess: [
		scribe({
			schema: './src/markdoc/schema', // or any other path to your schema. This is optional.
			components: path.resolve(__dirname, 'src/markdoc/components'), // or any other path to your components. This is optional.
			extensions: ['.markdoc', '.md']
		}),
		vitePreprocess()
	]
};

export default config;
```

If your project is using typescript, you will need to add the following to your `vit.config.ts` file:

```javascript

import { tscPlugin } from 'svelte-scribe';

const __dirname = path.resolve();

export default defineConfig({
	plugins: [tscPlugin(path.resolve(__dirname, 'src/markdoc/schema')), sveltekit()]
});

```

This is necessary because we run before any vite/rollup magic hence we need to have all `.ts` schema files transpiled to `.js` before we can successfully import them.

## Demo

```md
+page.md

---
title: Svelte Scribe
description: This is a SvelteKit preprocessor that allows you to write and include markdown files in your SvelteKit project using Stripe's Markdoc library.
---

# {% $markdoc.frontmatter.title %}


# {% $markdoc.frontmatter.description %}
```

### Adding a custom tag

```javascript
schema/tags.ts


const tags = {
	card: {
		render: 'Card',
		description: 'A card component',
		children: ['paragraph', 'tag', 'list'],
		attributes: {
			text: {
				type: String,
				default: 'THis is a card'
			}
		}
	}
};

```

```javascript
components/Card.svelte

<script lang="ts">
	export let text: string;
</script>


<div class="card">
    <p>{text}</p>
</div>

<slot />
```

```md
+page.md

---
title: Svelte Scribe
description: This is a SvelteKit preprocessor that allows you to write and include markdown files in your SvelteKit project using Stripe's Markdoc library.
---

# {% $markdoc.frontmatter.title %}
# {% $markdoc.frontmatter.description %}

{% card text="This is a card" %}
    {% paragraph text="This is a paragraph" %}
{% endcard %}
```

## Next Steps

- [ ] Add an example project.
- [ ] Add support for sveltekit-like layouts using a similar +layout.md file.

## License

[MIT](LICENSE)

## Acknowledgements

- [Markdoc](https://markdoc.dev/)
- [Markdoc-svelte](https://github.com/CollierCZ/markdoc-svelte)
