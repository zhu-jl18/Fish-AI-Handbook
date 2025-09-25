declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"docs": {
"01-fish-talks/advanced-concepts/agent.md": {
	id: "01-fish-talks/advanced-concepts/agent.md";
  slug: "01-fish-talks/advanced-concepts/agent";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/advanced-concepts/index.md": {
	id: "01-fish-talks/advanced-concepts/index.md";
  slug: "01-fish-talks/advanced-concepts";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/advanced-concepts/vibe-coding.md": {
	id: "01-fish-talks/advanced-concepts/vibe-coding.md";
  slug: "01-fish-talks/advanced-concepts/vibe-coding";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/advanced-concepts/workflow.md": {
	id: "01-fish-talks/advanced-concepts/workflow.md";
  slug: "01-fish-talks/advanced-concepts/workflow";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/glossary/api.md": {
	id: "01-fish-talks/glossary/api.md";
  slug: "01-fish-talks/glossary/api";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/glossary/env.md": {
	id: "01-fish-talks/glossary/env.md";
  slug: "01-fish-talks/glossary/env";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/glossary/interface.md": {
	id: "01-fish-talks/glossary/interface.md";
  slug: "01-fish-talks/glossary/interface";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/glossary/proxy.md": {
	id: "01-fish-talks/glossary/proxy.md";
  slug: "01-fish-talks/glossary/proxy";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/glossary/reverse-proxy.md": {
	id: "01-fish-talks/glossary/reverse-proxy.md";
  slug: "01-fish-talks/glossary/reverse-proxy";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/llm/brief.md": {
	id: "01-fish-talks/llm/brief.md";
  slug: "01-fish-talks/llm/brief";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/llm/index.md": {
	id: "01-fish-talks/llm/index.md";
  slug: "01-fish-talks/llm";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/llm/models.md": {
	id: "01-fish-talks/llm/models.md";
  slug: "01-fish-talks/llm/models";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/llm/rankings.md": {
	id: "01-fish-talks/llm/rankings.md";
  slug: "01-fish-talks/llm/rankings";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/model-terms/context-steps.md": {
	id: "01-fish-talks/model-terms/context-steps.md";
  slug: "01-fish-talks/model-terms/context-steps";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/model-terms/streaming.md": {
	id: "01-fish-talks/model-terms/streaming.md";
  slug: "01-fish-talks/model-terms/streaming";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/model-terms/temperature.md": {
	id: "01-fish-talks/model-terms/temperature.md";
  slug: "01-fish-talks/model-terms/temperature";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/model-terms/thinking.md": {
	id: "01-fish-talks/model-terms/thinking.md";
  slug: "01-fish-talks/model-terms/thinking";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/model-terms/token.md": {
	id: "01-fish-talks/model-terms/token.md";
  slug: "01-fish-talks/model-terms/token";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/overview.md": {
	id: "01-fish-talks/overview.md";
  slug: "01-fish-talks/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/preparations/github.md": {
	id: "01-fish-talks/preparations/github.md";
  slug: "01-fish-talks/preparations/github";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/preparations/index.md": {
	id: "01-fish-talks/preparations/index.md";
  slug: "01-fish-talks/preparations";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/preparations/nodejs.md": {
	id: "01-fish-talks/preparations/nodejs.md";
  slug: "01-fish-talks/preparations/nodejs";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/preparations/visual-studio-code.md": {
	id: "01-fish-talks/preparations/visual-studio-code.md";
  slug: "01-fish-talks/preparations/visual-studio-code";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/preparations/vpn.md": {
	id: "01-fish-talks/preparations/vpn.md";
  slug: "01-fish-talks/preparations/vpn";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"01-fish-talks/preparations/windows-terminal.md": {
	id: "01-fish-talks/preparations/windows-terminal.md";
  slug: "01-fish-talks/preparations/windows-terminal";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"02-basic-usage/app-integration.md": {
	id: "02-basic-usage/app-integration.md";
  slug: "02-basic-usage/app-integration";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"02-basic-usage/cli.md": {
	id: "02-basic-usage/cli.md";
  slug: "02-basic-usage/cli";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"02-basic-usage/editor-agent.md": {
	id: "02-basic-usage/editor-agent.md";
  slug: "02-basic-usage/editor-agent";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"02-basic-usage/index.md": {
	id: "02-basic-usage/index.md";
  slug: "02-basic-usage";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"02-basic-usage/mobile-apps.md": {
	id: "02-basic-usage/mobile-apps.md";
  slug: "02-basic-usage/mobile-apps";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"02-basic-usage/webchat.md": {
	id: "02-basic-usage/webchat.md";
  slug: "02-basic-usage/webchat";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"03-prompts/advanced-techniques.md": {
	id: "03-prompts/advanced-techniques.md";
  slug: "03-prompts/advanced-techniques";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"03-prompts/basics.md": {
	id: "03-prompts/basics.md";
  slug: "03-prompts/basics";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"03-prompts/index.md": {
	id: "03-prompts/index.md";
  slug: "03-prompts";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"03-prompts/patterns.md": {
	id: "03-prompts/patterns.md";
  slug: "03-prompts/patterns";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"04-advanced-techniques/index.md": {
	id: "04-advanced-techniques/index.md";
  slug: "04-advanced-techniques";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"04-advanced-techniques/knowledge-bases/index.md": {
	id: "04-advanced-techniques/knowledge-bases/index.md";
  slug: "04-advanced-techniques/knowledge-bases";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"04-advanced-techniques/mcp/index.md": {
	id: "04-advanced-techniques/mcp/index.md";
  slug: "04-advanced-techniques/mcp";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"04-advanced-techniques/multi-agent/index.md": {
	id: "04-advanced-techniques/multi-agent/index.md";
  slug: "04-advanced-techniques/multi-agent";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"04-advanced-techniques/rag/index.md": {
	id: "04-advanced-techniques/rag/index.md";
  slug: "04-advanced-techniques/rag";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"04-advanced-techniques/vector-databases/index.md": {
	id: "04-advanced-techniques/vector-databases/index.md";
  slug: "04-advanced-techniques/vector-databases";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"05-demos/complete-rag-chatbot.md": {
	id: "05-demos/complete-rag-chatbot.md";
  slug: "05-demos/complete-rag-chatbot";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"05-demos/index.md": {
	id: "05-demos/index.md";
  slug: "05-demos";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"05-demos/rag-chatbot.md": {
	id: "05-demos/rag-chatbot.md";
  slug: "05-demos/rag-chatbot";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"05-demos/smart-code-reviewer.md": {
	id: "05-demos/smart-code-reviewer.md";
  slug: "05-demos/smart-code-reviewer";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"06-technical-deep-dive/how-rag-works.md": {
	id: "06-technical-deep-dive/how-rag-works.md";
  slug: "06-technical-deep-dive/how-rag-works";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"06-technical-deep-dive/index.md": {
	id: "06-technical-deep-dive/index.md";
  slug: "06-technical-deep-dive";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"06-technical-deep-dive/transformer-architecture.md": {
	id: "06-technical-deep-dive/transformer-architecture.md";
  slug: "06-technical-deep-dive/transformer-architecture";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"07-fun/ai-drawing.md": {
	id: "07-fun/ai-drawing.md";
  slug: "07-fun/ai-drawing";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"07-fun/index.md": {
	id: "07-fun/index.md";
  slug: "07-fun";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"07-fun/llm-unlocking.md": {
	id: "07-fun/llm-unlocking.md";
  slug: "07-fun/llm-unlocking";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"07-fun/silver-trivern.md": {
	id: "07-fun/silver-trivern.md";
  slug: "07-fun/silver-trivern";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"08-resources/index.md": {
	id: "08-resources/index.md";
  slug: "08-resources";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
};
"posts": {
"README.md": {
	id: "README.md";
  slug: "readme";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"tools/windows-terminal-workflow.md": {
	id: "tools/windows-terminal-workflow.md";
  slug: "tools/windows-terminal-workflow";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
