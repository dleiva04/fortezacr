# Forteza CR — Sitio Web

Sitio web de marketing para **Forteza CR**, empresa constructora con sede en Costa Rica especializada en casas, edificios, proyectos comerciales y remodelaciones.

## Tecnologías

| Tecnología | Razón |
|---|---|
| **Astro** | Genera HTML estático (SSG) — carga instantánea, excelente para SEO |
| **React** | Componentes interactivos: cotizador wizard, slider antes/después, filtros de portafolio |
| **Tailwind CSS** | Estilos utilitarios, paleta de marca personalizada |
| **Material Tailwind** | Componentes UI base compatibles con React |
| **pnpm** | Gestor de paquetes rápido y eficiente |

## Páginas

| Ruta | Descripción |
|---|---|
| `/` | Home con hero, servicios, proyectos destacados, antes/después y testimonios |
| `/proyectos` | Portafolio filtrable por categoría |
| `/proyectos/[slug]` | Detalle de proyecto con galería y slider antes/después |
| `/servicios` | Detalle de los 4 servicios |
| `/nosotros` | Historia, misión, equipo y estadísticas |
| `/carreras` | Cultura, valores, vacantes y formulario de aplicación |
| `/contacto` | Formulario de contacto, WhatsApp y mapa |
| `/cotizar` | Cotizador guiado multi-paso (4 flujos) con resultado en CRC/USD |

## Cotizador

Wizard interactivo en React que guía al usuario según el tipo de proyecto:
- **Casa / Residencia** — pisos, área, zona, habitaciones, extras
- **Remodelación** — tipo, área, estado actual, zona
- **Edificio / Condominio** — pisos, unidades, tipo de uso, zona
- **Proyecto Comercial** — tipo, área, zona, requisitos especiales

El resultado muestra un rango en **₡ Colones** (por defecto) con toggle a **USD**, tiempo estimado y recomendaciones personalizadas.

Para actualizar el tipo de cambio: editar `EXCHANGE_RATE` en `src/data/quoteConfig.ts`.

## Paleta de colores

| Variable | Hex | Uso |
|---|---|---|
| `forteza-green` | `#1B4332` | Primario (botones, navbar, footer) |
| `forteza-gold` | `#C8973A` | Acento (CTAs secundarios, íconos) |
| `forteza-cement` | `#4A5568` | Texto secundario |

## Cómo empezar

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo (localhost:4321)
pnpm dev

# Build de producción
pnpm build

# Preview del build
pnpm preview
```

## Contenido

Todo el contenido está hardcodeado en `src/data/`:
- `projects.ts` — portafolio de proyectos
- `services.ts` — descripción de servicios
- `careers.ts` — vacantes y valores de la empresa
- `quoteConfig.ts` — rangos de precios, tipo de cambio y recomendaciones

Las imágenes placeholder provienen de Unsplash y están en `public/images/`. Reemplazar con fotos reales cuando estén disponibles.

## Accesibilidad y SEO

- WCAG 2.1 AA: HTML semántico, ARIA labels, navegación por teclado, contraste de colores
- Schema.org JSON-LD: `LocalBusiness`, `Service`, `ContactPoint`, `BreadcrumbList`
- `sitemap.xml` generado automáticamente por `@astrojs/sitemap`
- `llms.txt` para agentes de IA
- Open Graph tags en todas las páginas
