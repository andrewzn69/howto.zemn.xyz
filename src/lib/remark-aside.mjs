import { visit } from 'unist-util-visit';
import { h } from 'hastscript';

/**
 * usage:
 *
 * ```mdx
 * :::note[Note Example]
 * example note
 * :::
 * ```
 *
 */

export default function remarkAside() {
	return (tree) => {
		visit(tree, (node) => {
			if (node.type === 'containerDirective') {
				if (!callouts[node.name]) {
					return;
				}

				const callout = callouts[node.name];
				const data = node.data || (node.data = {});
				const { ...attributes } = node.attributes;

				// logic to support :::tip{title="title"} syntax and default to tip for :::tip
				let title = node.attributes.title || callout.title;

				node.attributes = {
					...attributes,
					class:
						'class' in attributes
							? `callout callout-${node.name} ${attributes.class}`
							: `callout callout-${node.name}`,
				};

				// logic to support :::tip[title] syntax
				// remark-directive converts a container’s “label” to a paragraph at children[0] with the `directiveLabel` property set to true
				if (node.children[0].data?.directiveLabel) {
					title = node.children[0].children[0].value;
					node.children.shift();
				}

				node.children = generate(title, node.children, callout.icon);

				// TODO: get rid of h just make it set the classes in hProperties without needing hast
				const hast = h('aside', node.attributes);
				data.hName = hast.tagName;
				data.hProperties = hast.properties;
			}
		});
	};
}

const callouts = {
	note: {
		title: 'Note',
		icon: '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M220 220h32v116"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M208 340h88"/><path d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z" fill="currentColor"/></svg>',
	},
	tip: {
		title: 'Tip',
		icon: '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" width="24" height="24" viewBox="0 0 512 512"><path d="M304 384v-24c0-29 31.54-56.43 52-76 28.84-27.57 44-64.61 44-108 0-80-63.73-144-144-144a143.6 143.6 0 00-144 144c0 41.84 15.81 81.39 44 108 20.35 19.21 52 46.7 52 76v24M224 480h64M208 432h96M256 384V256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M294 240s-21.51 16-38 16-38-16-38-16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>',
	},
	important: {
		title: 'Important',
		icon: '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M250.26 166.05L256 288l5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 6z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M256 367.91a20 20 0 1120-20 20 20 0 01-20 20z" fill="currentColor"/></svg>',
	},
	warning: {
		title: 'Warning',
		icon: '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" width="24" height="24" viewBox="0 0 512 512"><path d="M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z" fill="currentColor"/></svg>',
	},
	caution: {
		title: 'Caution',
		icon: '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" width="24" height="24" viewBox="0 0 512 512"><path d="M112 320c0-93 124-165 96-272 66 0 192 96 192 272a144 144 0 01-288 0z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M320 368c0 57.71-32 80-64 80s-64-22.29-64-80 40-86 32-128c42 0 96 70.29 96 128z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>',
	},
};

function generate(title, children, icon) {
	const iconNode = {
		type: 'html',
		value: icon,
	};

	const titleNode = {
		type: 'paragraph',
		children: [
			{
				type: 'text',
				value: title,
			},
		],
		data: {
			hName: 'span',
			hProperties: { className: ['callout-title'] },
		},
	};

	return [
		{
			type: 'paragraph',
			data: {
				hName: 'div',
				hProperties: { className: ['callout-indicator'] },
			},
			children: [iconNode, titleNode],
		},
		{
			type: 'paragraph',
			data: {
				hName: 'div',
				hProperties: { className: ['callout-content'] },
			},
			children,
		},
	];
}
