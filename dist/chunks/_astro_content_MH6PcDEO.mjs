import { Traverse } from 'neotraverse/modern';
import { removeBase, prependForwardSlash } from '@astrojs/internal-helpers/path';
import { i as isCoreRemotePath, V as VALID_INPUT_FORMATS, A as AstroError, U as UnknownContentCollectionError } from './astro/assets-service_CsvZ0B8M.mjs';
import { c as createComponent, f as renderUniqueStylesheet, g as renderScriptElement, h as createHeadAndContent, r as renderComponent, a as renderTemplate, u as unescapeHTML } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import * as devalue from 'devalue';

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isCoreRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1);
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class DataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./_astro_data-layer-content_BcEe_9wP.mjs');
      if (data.default instanceof Map) {
        return DataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return DataStore.fromMap(map);
    } catch {
    }
    return new DataStore();
  }
  static async fromMap(data) {
    const store = new DataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = DataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetEntry({
  getEntryImport,
  getRenderEntryImport,
  collectionNames
}) {
  return async function getEntry(collectionOrLookupObject, _lookupId) {
    let collection, lookupId;
    if (typeof collectionOrLookupObject === "string") {
      collection = collectionOrLookupObject;
      if (!_lookupId)
        throw new AstroError({
          ...UnknownContentCollectionError,
          message: "`getEntry()` requires an entry identifier as the second argument."
        });
      lookupId = _lookupId;
    } else {
      collection = collectionOrLookupObject.collection;
      lookupId = "id" in collectionOrLookupObject ? collectionOrLookupObject.id : collectionOrLookupObject.slug;
    }
    const store = await globalDataStore.get();
    if (store.hasCollection(collection)) {
      const entry2 = store.get(collection, lookupId);
      if (!entry2) {
        console.warn(`Entry ${collection} → ${lookupId} was not found.`);
        return;
      }
      const { default: imageAssetMap } = await import('./_astro_asset-imports_D9aVaOQr.mjs');
      entry2.data = updateImageReferencesInData(entry2.data, entry2.filePath, imageAssetMap);
      return {
        ...entry2,
        collection
      };
    }
    if (!collectionNames.has(collection)) {
      console.warn(`The collection ${JSON.stringify(collection)} does not exist.`);
      return void 0;
    }
    const entryImport = await getEntryImport(collection, lookupId);
    if (typeof entryImport !== "function") return void 0;
    const entry = await entryImport();
    if (entry._internal.type === "content") {
      return {
        id: entry.id,
        slug: entry.slug,
        body: entry.body,
        collection: entry.collection,
        data: entry.data,
        async render() {
          return render({
            collection: entry.collection,
            id: entry.id,
            renderEntryImport: await getRenderEntryImport(collection, lookupId)
          });
        }
      };
    } else if (entry._internal.type === "data") {
      return {
        id: entry.id,
        collection: entry.collection,
        data: entry.data
      };
    }
    return void 0;
  };
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new Traverse(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/docs/01-fish-talks/advanced-concepts/agent.md": () => import('./agent_A1gm5uUS.mjs'),"/src/content/docs/01-fish-talks/advanced-concepts/index.md": () => import('./index_oUAG713u.mjs'),"/src/content/docs/01-fish-talks/advanced-concepts/vibe-coding.md": () => import('./vibe-coding_C-B3tLJ5.mjs'),"/src/content/docs/01-fish-talks/advanced-concepts/workflow.md": () => import('./workflow_CvZrcvp6.mjs'),"/src/content/docs/01-fish-talks/glossary/api.md": () => import('./api_9s8N80H3.mjs'),"/src/content/docs/01-fish-talks/glossary/env.md": () => import('./env_eThZhRYg.mjs'),"/src/content/docs/01-fish-talks/glossary/interface.md": () => import('./interface_C5yQrTSX.mjs'),"/src/content/docs/01-fish-talks/glossary/proxy.md": () => import('./proxy_tiXM_NN6.mjs'),"/src/content/docs/01-fish-talks/glossary/reverse-proxy.md": () => import('./reverse-proxy_NLLVNsDE.mjs'),"/src/content/docs/01-fish-talks/llm/brief.md": () => import('./brief_BLp8auyG.mjs'),"/src/content/docs/01-fish-talks/llm/index.md": () => import('./index_CI2PHxD5.mjs'),"/src/content/docs/01-fish-talks/llm/models.md": () => import('./models_CNNJ-OfS.mjs'),"/src/content/docs/01-fish-talks/llm/rankings.md": () => import('./rankings_Bgcfepi1.mjs'),"/src/content/docs/01-fish-talks/model-terms/context-steps.md": () => import('./context-steps_BcZ0dsYL.mjs'),"/src/content/docs/01-fish-talks/model-terms/streaming.md": () => import('./streaming_CFmkp7Qd.mjs'),"/src/content/docs/01-fish-talks/model-terms/temperature.md": () => import('./temperature_Bl-fy7WO.mjs'),"/src/content/docs/01-fish-talks/model-terms/thinking.md": () => import('./thinking_1fI2VLQe.mjs'),"/src/content/docs/01-fish-talks/model-terms/token.md": () => import('./token_gZ33igA6.mjs'),"/src/content/docs/01-fish-talks/preparations/github.md": () => import('./github_BZEuntvf.mjs'),"/src/content/docs/01-fish-talks/preparations/index.md": () => import('./index_BBXzmlh_.mjs'),"/src/content/docs/01-fish-talks/preparations/nodejs.md": () => import('./nodejs_BEQ0AO54.mjs'),"/src/content/docs/01-fish-talks/preparations/visual-studio-code.md": () => import('./visual-studio-code_q2toM36o.mjs'),"/src/content/docs/01-fish-talks/preparations/vpn.md": () => import('./vpn_uJvG1TEl.mjs'),"/src/content/docs/01-fish-talks/preparations/windows-terminal.md": () => import('./windows-terminal_BmmU4tAD.mjs'),"/src/content/docs/02-basic-usage/app-integration.md": () => import('./app-integration_BFFfJvk9.mjs'),"/src/content/docs/02-basic-usage/cli.md": () => import('./cli_Kc2ii6zc.mjs'),"/src/content/docs/02-basic-usage/editor-agent.md": () => import('./editor-agent_DZt8DKam.mjs'),"/src/content/docs/02-basic-usage/index.md": () => import('./index_Cnuq3tMH.mjs'),"/src/content/docs/02-basic-usage/webchat.md": () => import('./webchat_BftMDNaa.mjs'),"/src/content/docs/03-prompts/advanced-techniques.md": () => import('./advanced-techniques_fKqRmQEj.mjs'),"/src/content/docs/03-prompts/basics.md": () => import('./basics_UyDSkgRP.mjs'),"/src/content/docs/03-prompts/index.md": () => import('./index_Cl9eywEz.mjs'),"/src/content/docs/03-prompts/patterns.md": () => import('./patterns_lSnVkVMz.mjs'),"/src/content/docs/04-advanced-techniques/index.md": () => import('./index_DsBNTcLr.mjs'),"/src/content/docs/04-advanced-techniques/knowledge-bases/index.md": () => import('./index_Buzt4qGG.mjs'),"/src/content/docs/04-advanced-techniques/mcp/index.md": () => import('./index_CMuMr2YX.mjs'),"/src/content/docs/04-advanced-techniques/multi-agent/index.md": () => import('./index_YLbgjXlD.mjs'),"/src/content/docs/04-advanced-techniques/rag/index.md": () => import('./index_D94ksEyC.mjs'),"/src/content/docs/04-advanced-techniques/vector-databases/index.md": () => import('./index__ev7QBEQ.mjs'),"/src/content/docs/05-demos/index.md": () => import('./index_Ch9fBfNt.mjs'),"/src/content/docs/05-demos/rag-chatbot.md": () => import('./rag-chatbot_BubZuBlD.mjs'),"/src/content/docs/06-technical-deep-dive/how-rag-works.md": () => import('./how-rag-works_MTS0889P.mjs'),"/src/content/docs/06-technical-deep-dive/index.md": () => import('./index_DvXCcBOf.mjs'),"/src/content/docs/07-fun/ai-drawing.md": () => import('./ai-drawing_tG0LcgKs.mjs'),"/src/content/docs/07-fun/index.md": () => import('./index_BU6Go3Eu.mjs'),"/src/content/docs/07-fun/llm-unlocking.md": () => import('./llm-unlocking_C4aJmp4N.mjs'),"/src/content/docs/07-fun/silver-trivern.md": () => import('./silver-trivern_BrviNs2F.mjs'),"/src/content/docs/08-resources/index.md": () => import('./index_DtGYDSQa.mjs')});
createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
const collectionToEntryMap = createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"docs":{"type":"content","entries":{"04-advanced-techniques":"/src/content/docs/04-advanced-techniques/index.md","03-prompts/advanced-techniques":"/src/content/docs/03-prompts/advanced-techniques.md","03-prompts/basics":"/src/content/docs/03-prompts/basics.md","03-prompts":"/src/content/docs/03-prompts/index.md","02-basic-usage/app-integration":"/src/content/docs/02-basic-usage/app-integration.md","02-basic-usage/editor-agent":"/src/content/docs/02-basic-usage/editor-agent.md","02-basic-usage/cli":"/src/content/docs/02-basic-usage/cli.md","03-prompts/patterns":"/src/content/docs/03-prompts/patterns.md","02-basic-usage":"/src/content/docs/02-basic-usage/index.md","02-basic-usage/webchat":"/src/content/docs/02-basic-usage/webchat.md","05-demos":"/src/content/docs/05-demos/index.md","08-resources":"/src/content/docs/08-resources/index.md","06-technical-deep-dive/how-rag-works":"/src/content/docs/06-technical-deep-dive/how-rag-works.md","05-demos/rag-chatbot":"/src/content/docs/05-demos/rag-chatbot.md","07-fun/ai-drawing":"/src/content/docs/07-fun/ai-drawing.md","06-technical-deep-dive":"/src/content/docs/06-technical-deep-dive/index.md","07-fun/llm-unlocking":"/src/content/docs/07-fun/llm-unlocking.md","07-fun":"/src/content/docs/07-fun/index.md","07-fun/silver-trivern":"/src/content/docs/07-fun/silver-trivern.md","01-fish-talks/advanced-concepts/agent":"/src/content/docs/01-fish-talks/advanced-concepts/agent.md","01-fish-talks/advanced-concepts":"/src/content/docs/01-fish-talks/advanced-concepts/index.md","01-fish-talks/advanced-concepts/vibe-coding":"/src/content/docs/01-fish-talks/advanced-concepts/vibe-coding.md","01-fish-talks/advanced-concepts/workflow":"/src/content/docs/01-fish-talks/advanced-concepts/workflow.md","01-fish-talks/glossary/env":"/src/content/docs/01-fish-talks/glossary/env.md","01-fish-talks/glossary/api":"/src/content/docs/01-fish-talks/glossary/api.md","01-fish-talks/glossary/interface":"/src/content/docs/01-fish-talks/glossary/interface.md","01-fish-talks/glossary/proxy":"/src/content/docs/01-fish-talks/glossary/proxy.md","01-fish-talks/glossary/reverse-proxy":"/src/content/docs/01-fish-talks/glossary/reverse-proxy.md","01-fish-talks/llm/brief":"/src/content/docs/01-fish-talks/llm/brief.md","01-fish-talks/llm":"/src/content/docs/01-fish-talks/llm/index.md","01-fish-talks/llm/models":"/src/content/docs/01-fish-talks/llm/models.md","01-fish-talks/llm/rankings":"/src/content/docs/01-fish-talks/llm/rankings.md","01-fish-talks/model-terms/context-steps":"/src/content/docs/01-fish-talks/model-terms/context-steps.md","01-fish-talks/model-terms/streaming":"/src/content/docs/01-fish-talks/model-terms/streaming.md","01-fish-talks/model-terms/thinking":"/src/content/docs/01-fish-talks/model-terms/thinking.md","01-fish-talks/model-terms/token":"/src/content/docs/01-fish-talks/model-terms/token.md","01-fish-talks/preparations/github":"/src/content/docs/01-fish-talks/preparations/github.md","01-fish-talks/model-terms/temperature":"/src/content/docs/01-fish-talks/model-terms/temperature.md","01-fish-talks/preparations":"/src/content/docs/01-fish-talks/preparations/index.md","01-fish-talks/preparations/vpn":"/src/content/docs/01-fish-talks/preparations/vpn.md","01-fish-talks/preparations/visual-studio-code":"/src/content/docs/01-fish-talks/preparations/visual-studio-code.md","01-fish-talks/preparations/windows-terminal":"/src/content/docs/01-fish-talks/preparations/windows-terminal.md","04-advanced-techniques/mcp":"/src/content/docs/04-advanced-techniques/mcp/index.md","04-advanced-techniques/knowledge-bases":"/src/content/docs/04-advanced-techniques/knowledge-bases/index.md","04-advanced-techniques/multi-agent":"/src/content/docs/04-advanced-techniques/multi-agent/index.md","01-fish-talks/preparations/nodejs":"/src/content/docs/01-fish-talks/preparations/nodejs.md","04-advanced-techniques/rag":"/src/content/docs/04-advanced-techniques/rag/index.md","04-advanced-techniques/vector-databases":"/src/content/docs/04-advanced-techniques/vector-databases/index.md"}}};

const collectionNames = new Set(Object.keys(lookupMap));

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/docs/01-fish-talks/advanced-concepts/agent.md": () => import('./agent_DvlkWdxc.mjs'),"/src/content/docs/01-fish-talks/advanced-concepts/index.md": () => import('./index_D4OD22dv.mjs'),"/src/content/docs/01-fish-talks/advanced-concepts/vibe-coding.md": () => import('./vibe-coding_kHm2kXMf.mjs'),"/src/content/docs/01-fish-talks/advanced-concepts/workflow.md": () => import('./workflow_BOrd3Ph5.mjs'),"/src/content/docs/01-fish-talks/glossary/api.md": () => import('./api_EHKxaUoG.mjs'),"/src/content/docs/01-fish-talks/glossary/env.md": () => import('./env_Cep-14ol.mjs'),"/src/content/docs/01-fish-talks/glossary/interface.md": () => import('./interface_DtSVU6UN.mjs'),"/src/content/docs/01-fish-talks/glossary/proxy.md": () => import('./proxy_CciGZV_V.mjs'),"/src/content/docs/01-fish-talks/glossary/reverse-proxy.md": () => import('./reverse-proxy_u1tVVZ4r.mjs'),"/src/content/docs/01-fish-talks/llm/brief.md": () => import('./brief_Bl_Q7j43.mjs'),"/src/content/docs/01-fish-talks/llm/index.md": () => import('./index_I04q0HyQ.mjs'),"/src/content/docs/01-fish-talks/llm/models.md": () => import('./models_7fyrSNre.mjs'),"/src/content/docs/01-fish-talks/llm/rankings.md": () => import('./rankings_BzC8oFV3.mjs'),"/src/content/docs/01-fish-talks/model-terms/context-steps.md": () => import('./context-steps_Di61kgr5.mjs'),"/src/content/docs/01-fish-talks/model-terms/streaming.md": () => import('./streaming_BALvvEcp.mjs'),"/src/content/docs/01-fish-talks/model-terms/temperature.md": () => import('./temperature_CFYc1bZj.mjs'),"/src/content/docs/01-fish-talks/model-terms/thinking.md": () => import('./thinking_DQAF7lcX.mjs'),"/src/content/docs/01-fish-talks/model-terms/token.md": () => import('./token_DJXyVnBY.mjs'),"/src/content/docs/01-fish-talks/preparations/github.md": () => import('./github_D176rbIL.mjs'),"/src/content/docs/01-fish-talks/preparations/index.md": () => import('./index_Ca52dOoI.mjs'),"/src/content/docs/01-fish-talks/preparations/nodejs.md": () => import('./nodejs_D9vJFLQT.mjs'),"/src/content/docs/01-fish-talks/preparations/visual-studio-code.md": () => import('./visual-studio-code_D7l12MWT.mjs'),"/src/content/docs/01-fish-talks/preparations/vpn.md": () => import('./vpn_aHw8Tyon.mjs'),"/src/content/docs/01-fish-talks/preparations/windows-terminal.md": () => import('./windows-terminal_Bi0K1Bra.mjs'),"/src/content/docs/02-basic-usage/app-integration.md": () => import('./app-integration_BIp0gkUT.mjs'),"/src/content/docs/02-basic-usage/cli.md": () => import('./cli_DEWSqgxe.mjs'),"/src/content/docs/02-basic-usage/editor-agent.md": () => import('./editor-agent_C5nWiCzt.mjs'),"/src/content/docs/02-basic-usage/index.md": () => import('./index_CJHX91mf.mjs'),"/src/content/docs/02-basic-usage/webchat.md": () => import('./webchat_BVXJpQs_.mjs'),"/src/content/docs/03-prompts/advanced-techniques.md": () => import('./advanced-techniques_CEL37IFF.mjs'),"/src/content/docs/03-prompts/basics.md": () => import('./basics_LRhvi-QV.mjs'),"/src/content/docs/03-prompts/index.md": () => import('./index_BAsdSBW0.mjs'),"/src/content/docs/03-prompts/patterns.md": () => import('./patterns_BRjV4mFr.mjs'),"/src/content/docs/04-advanced-techniques/index.md": () => import('./index_HVbF290z.mjs'),"/src/content/docs/04-advanced-techniques/knowledge-bases/index.md": () => import('./index_jJLYTQCw.mjs'),"/src/content/docs/04-advanced-techniques/mcp/index.md": () => import('./index_CV8XF0q4.mjs'),"/src/content/docs/04-advanced-techniques/multi-agent/index.md": () => import('./index_DTryJ1zx.mjs'),"/src/content/docs/04-advanced-techniques/rag/index.md": () => import('./index_DCjyShTc.mjs'),"/src/content/docs/04-advanced-techniques/vector-databases/index.md": () => import('./index_C4B6oS8K.mjs'),"/src/content/docs/05-demos/index.md": () => import('./index_BZK-bTLg.mjs'),"/src/content/docs/05-demos/rag-chatbot.md": () => import('./rag-chatbot_Cya6ve5V.mjs'),"/src/content/docs/06-technical-deep-dive/how-rag-works.md": () => import('./how-rag-works_CyIfBS15.mjs'),"/src/content/docs/06-technical-deep-dive/index.md": () => import('./index_BY95xe4X.mjs'),"/src/content/docs/07-fun/ai-drawing.md": () => import('./ai-drawing_D-ijEe9i.mjs'),"/src/content/docs/07-fun/index.md": () => import('./index_BGJXMlo6.mjs'),"/src/content/docs/07-fun/llm-unlocking.md": () => import('./llm-unlocking_CFz8Dseo.mjs'),"/src/content/docs/07-fun/silver-trivern.md": () => import('./silver-trivern_C-XUnqQ7.mjs'),"/src/content/docs/08-resources/index.md": () => import('./index_DtiuI2Bs.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getEntry = createGetEntry({
	getEntryImport: createGlobLookup(collectionToEntryMap),
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	collectionNames,
});

export { getEntry as g };
