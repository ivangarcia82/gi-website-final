import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CthBBHrl.mjs';
import { manifest } from './manifest_BBXMtN0T.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/contact.astro.mjs');
const _page2 = () => import('./pages/blog/_slug_.astro.mjs');
const _page3 = () => import('./pages/blog.astro.mjs');
const _page4 = () => import('./pages/bolsa-de-trabajo/_id_.astro.mjs');
const _page5 = () => import('./pages/bolsa-de-trabajo.astro.mjs');
const _page6 = () => import('./pages/catalogo.astro.mjs');
const _page7 = () => import('./pages/conocenos.astro.mjs');
const _page8 = () => import('./pages/contacto.astro.mjs');
const _page9 = () => import('./pages/servicios/_id_.astro.mjs');
const _page10 = () => import('./pages/servicios.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/contact.ts", _page1],
    ["src/pages/blog/[slug].astro", _page2],
    ["src/pages/blog/index.astro", _page3],
    ["src/pages/bolsa-de-trabajo/[id].astro", _page4],
    ["src/pages/bolsa-de-trabajo/index.astro", _page5],
    ["src/pages/catalogo.astro", _page6],
    ["src/pages/conocenos.astro", _page7],
    ["src/pages/contacto.astro", _page8],
    ["src/pages/servicios/[id].astro", _page9],
    ["src/pages/servicios/index.astro", _page10],
    ["src/pages/index.astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "a3edfc45-94e2-4751-ad07-aaa7d139f095",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
