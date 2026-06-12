# Imágenes placeholder del sitio (para reemplazar con fotos reales)

Todas las fotos del sitio son stock de Unsplash heredado del prototipo. Se definen
una sola vez en `src/data/site.ts` (mapa `IMAGES`, claves `img0`–`img41`); para
reemplazar una basta cambiar la URL en ese archivo (o apuntar a un archivo local
en `public/img/`). La excepción es la imagen OG por defecto, que vive en
`src/layouts/Layout.astro`.

> Tip: para ver cualquier foto en grande, abre la URL quitando `?w=...&q=80`.

## 1. Hero del home (la más importante)

| Clave | Foto | Dónde se ve | Foto sugerida |
|---|---|---|---|
| `img36` | https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1400&q=80 (escritorio con artículos) | Hero del home (`Hero.astro`), preload LCP, y también hero del servicio **Promocionales** | Foto editorial de producto GI: mesa con promocionales de clientes reales, alta resolución horizontal (~1600px) |

## 2. Imagen OG / redes sociales

| Dónde | Valor actual | Sugerencia |
|---|---|---|
| `src/layouts/Layout.astro` (prop `image` por defecto) | https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80 | Imagen 1200×630 con logo + eslogan sobre naranja/gris de marca |

## 3. Heros de páginas de servicio (`src/data/site.ts`, campo `hero`)

| Clave | Servicio | Foto actual |
|---|---|---|
| `img36` | Promocionales | photo-1553062407 (escritorio) |
| `img37` | Fulfillment | https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1400&q=80 (almacén/cajas) |
| `img38` | Proyectos Especiales | https://images.unsplash.com/photo-1558655146-d09347e92766?w=1400&q=80 (diseño abstracto) |
| `img39` | Talleres de Personalizado | https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1400&q=80 (taller/manos) |
| `img40` | Textil y Talabartería | https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=80 (textiles colgados) |

## 4. Tarjetas de servicios en el home (`ServicesShowcase.astro`, `stackedImgs`)

| Clave | Posición | Foto actual |
|---|---|---|
| `img25` | Servicio 1 | https://images.unsplash.com/photo-1568205612837-017257d2310a?w=800&q=80 (plumas) |
| `img26` | Servicio 2 | https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80 (escritorio, repetida) |
| `img27` | Servicio 3 | https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80 (oficina) |
| `img28` | Servicio 4 | https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80 (handshake/POS) |
| `img29` | Servicio 5 | https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80 (textil doblado) |

## 5. Catálogos (home + /catalogo, `CATALOGS` en site.ts)

| Clave | Catálogo | Foto actual |
|---|---|---|
| `img0` | Maxema | https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&q=80 |
| `img1` | Collection Brands | https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80 (repetida) |
| `img2` | Mundial 2026 | https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=600&q=80 (balón) |
| `img3` | Día del Niño | https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80 (repetida) |
| `img4` | Mamá | https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80 |
| `img5` | Gray | https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80 (tenis rojo ⚠️ muy off-brand) |
| `img6` | Blue | https://images.unsplash.com/photo-1608228088998-57828365d486?w=600&q=80 |
| `img7` | Green | https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80 |
| `img8` | Black | https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80 |
| `img9` | Agendas | https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600&q=80 |
| `img10` | Textiles | https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80 |

Sugerencia: usar las portadas reales de cada catálogo (como las del mailing del manual).

## 6. Productos del catálogo (/catalogo, `PRODUCTS` en site.ts)

| Clave | Producto | Foto actual |
|---|---|---|
| `img11` | Pluma Metálica | https://images.unsplash.com/photo-1568205612837-017257d2310a?w=500&q=80 |
| `img12` | Taza Cerámica | https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=500&q=80 |
| `img13` | Mochila Eco | https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80 (repetida ⚠️ no es mochila) |
| `img14` | Cuaderno Kraft | https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&q=80 |
| `img15` | Botella Térmica | https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80 |
| `img16` | Playera | https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80 |
| `img17` | Power Bank | https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=500&q=80 |
| `img18` | Gorra | https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80 |
| `img19` | Audífonos | https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80 |
| `img20` | Tote Bag **y** Libreta Piel | https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80 (⚠️ misma foto para dos productos) |
| `img21` | Termo Acero | https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80 (⚠️ es un reloj, no un termo) |

Ideal: fotos de producto propias sobre fondo blanco/gris claro, cuadradas (~800×800).

## 7. Blog (`BLOG_POSTS` en site.ts)

| Clave | Post | Foto actual |
|---|---|---|
| `img30` | 10 artículos que dominarán 2026 | https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80 |
| `img31` | Cómo escalamos fulfillment | https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80 (almacén) |
| `img32` | Textiles sustentables | https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80 (repetida con hero Textiles) |
| `img33` | Kits Mundial 2026 | https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800&q=80 (repetida con catálogo Mundial) |
| `img34` | Serigrafía vs sublimación vs DTF | https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80 (repetida con producto Playera) |
| `img35` | El ROI real de los promocionales | https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80 (laptop con gráficas) |

## 8. Conócenos

| Clave | Dónde | Foto actual |
|---|---|---|
| `img41` | Foto del equipo (`conocenos.astro`) | https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80 (oficina genérica ⚠️ debería ser el equipo real GI) |

## 9. Claves definidas pero sin uso (se pueden borrar)

`img22`, `img23`, `img24` — duplicados a otra resolución de img12/img16/img11; ninguna página los referencia.

## Resumen de prioridades

1. **Hero del home + OG image** (img36) — primera impresión y lo que se comparte en redes.
2. **Foto de equipo en Conócenos** (img41) — es la página de confianza; foto stock se nota.
3. **Portadas de catálogos** (img0–img10) — existen portadas reales (las del mailing).
4. **Productos** (img11–img21) — hay 3 fotos que no corresponden al producto.
5. Heros de servicios y blog.
