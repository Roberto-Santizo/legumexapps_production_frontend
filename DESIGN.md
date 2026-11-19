---
name: Legumexapps Producción
description: Tablero operativo de producción para planta empacadora — neutro cálido, tinta, cifras en mono.
colors:
  canvas: "#f4f3f0"
  surface: "#ffffff"
  line: "#e7e5e0"
  line-strong: "#dcd9d3"
  ink: "#1a1a19"
  ink-muted: "#6b6862"
  ink-subtle: "#9a968e"
  status-active: "#10b981"
  status-active-bg: "#ecfdf5"
  status-active-text: "#065f46"
  status-danger: "#ef4444"
  status-danger-text: "#b91c1c"
  status-warning: "#f59e0b"
typography:
  page-title:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    letterSpacing: "-0.025em"
  section-title:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    letterSpacing: "-0.025em"
  title:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
  body:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  nav:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
  label:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.05em"
  figure:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    fontFeature: "tnum"
  meta:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "11px"
    fontWeight: 400
rounded:
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  full: "9999px"
spacing:
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    typography: "{typography.title}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
  button-primary-disabled:
    backgroundColor: "#1a1a1966"
    textColor: "{colors.surface}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "8px 12px"
  input-filter:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "8px 16px 8px 40px"
    width: "320px"
  nav-link:
    textColor: "{colors.ink-muted}"
    typography: "{typography.nav}"
    rounded: "{rounded.lg}"
    padding: "8px 12px"
  nav-link-active:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
  status-tag-active:
    backgroundColor: "{colors.status-active-bg}"
    textColor: "{colors.status-active-text}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  status-tag-inactive:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  table-wrapper:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
  table-head-cell:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.label}"
    padding: "16px 24px"
  form-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.2xl}"
    padding: "24px"
---

# Design System: Legumexapps Producción

## Overview

**Creative North Star: "El Tablero de Turno"**

La interfaz es el tablero que un supervisor consulta durante el turno: denso, legible de un vistazo, con el estado de cada cosa claro antes que cualquier adorno. Un lienzo neutro cálido envuelve una hoja blanca enmarcada donde vive el trabajo; la tinta casi negra carga la jerarquía y las cifras van en monoespaciada tabular para que cuadren en columna.

El sistema es plano y lineal: bordes finos en lugar de sombras, esquinas suaves, tipografía del sistema. El color no decora; hoy aparece solo para comunicar estado (activo, error, sobrecupo, advertencia). Queda abierta la puerta a un acento de marca futuro, sin definir todavía.

Funciona igual con mouse en oficina que con el dedo en tablet en planta: lo táctil (arrastrar o tocar para seleccionar y luego tocar un lugar) es ciudadano de primera clase.

**Key Characteristics:**
- Lienzo cálido + hoja blanca enmarcada (shell con `rounded-2xl` y borde fino).
- Tinta neutra, sin acento de marca (pendiente, no prohibido).
- Cifras, códigos y unidades en mono tabular.
- Plano: profundidad por borde y tono, no por sombra.
- Color reservado para estado.

## Colors

Paleta neutra cálida de tinta sobre papel; el color saturado solo aparece para señalar estado.

### Primary
- **Tinta de Turno** (ink): texto principal, botón primario, foco de campos, barra de carga. Es la "voz" del sistema mientras no exista acento de marca.

### Neutral
- **Lienzo Cálido** (canvas): fondo de la app, encabezados de tabla, hover de filas, fondo del filtro de búsqueda.
- **Hoja** (surface): superficie de trabajo, tarjetas, formularios, campos.
- **Línea** (line): bordes por defecto de tablas, formularios, tarjetas y divisores.
- **Línea Marcada** (line-strong): hover de campos y anillo de estados inactivos.
- **Tinta Media** (ink-muted): texto secundario, navegación inactiva, íconos de encabezado.
- **Tinta Tenue** (ink-subtle): placeholders, encabezados de columna, etiquetas de sección del sidebar, metadatos.

### Status
- **Verde Activo** (status-active / -bg / -text): pastilla "Activo", con punto pulsante (respeta `motion-safe`).
- **Rojo Alerta** (status-danger / -text): errores de formulario, sobrecupo de actividad, acciones destructivas.
- **Ámbar Aviso** (status-warning): advertencias.

### Named Rules
**The Color Is Meaning Rule.** Todo color saturado en pantalla significa un estado. Un acento de marca puede llegar después, pero debe definirse como token en `@theme`, no como clase ad-hoc.

**The Token First Rule.** Usar `canvas` / `surface` / `line` / `ink*` antes que `gray-*` o `slate-*`. Ambas paletas conviven en código legado (Modal, InfoCard) y se aceptan, pero lo nuevo nace en tokens.

## Typography

**Display/Body Font:** pila sans del sistema (ui-sans-serif, system-ui)
**Label/Mono Font:** pila mono del sistema (ui-monospace) con cifras tabulares

**Character:** Sans del sistema, sobria y rápida de leer; la mono hace el trabajo de "instrumento" en cantidades, códigos y unidades.

### Hierarchy
- **Page title** (600, 1.875rem, tracking -0.025em): título de pantalla. Existe una variante 700 (`main_title`).
- **Section title** (700, 1.5rem, tracking -0.025em): bloques dentro de una pantalla.
- **Title** (600, 0.875rem): nombres en tarjetas, estaciones, botones.
- **Body** (400, 0.875rem): celdas de tabla, contenido.
- **Nav** (500, 13px): enlaces del sidebar; etiquetas de sección en 11px/500.
- **Label** (600, 0.75rem, tracking 0.05em, MAYÚSCULAS): encabezados de columna.
- **Figure** (mono, 0.875rem, tnum): conteos `usado/cupo`, cifras de producción.
- **Meta** (mono, 11px): unidades, claves, "+N lugares libres".

### Named Rules
**The Figures Align Rule.** Toda cantidad comparable va en mono con `tabular-nums`; el denominador o unidad baja a tinta tenue.

## Layout

Shell de app: sidebar de 256px (colapsable a 0) sobre el lienzo, y a su derecha una hoja blanca enmarcada (margen 8px, `rounded-2xl`, borde `line`) con encabezado de 48px (toggle de sidebar, breadcrumb, usuario) y contenido con scroll propio (padding 32px horizontal, 24px vertical). Las barras de scroll están ocultas globalmente.

Ritmo de espaciado en múltiplos de 4px; los más usados: 6, 8, 12, 16, 24, 32. Celdas de tabla 24px × 16px. Formularios en tarjeta con 24px de padding y 24px entre campos. Paneles de sub-recursos se abren en `Modal` (máx. 2xl, cuerpo hasta 70vh) o `Drawer`, nunca en ruta propia.

## Elevation & Depth

Plano por defecto. La profundidad se da con tono (lienzo vs. hoja) y bordes finos de 1px. Las sombras son mínimas y de estado: `shadow-sm` en campos y botón primario, `shadow-md` al hover del botón, una sombra de 1px casi invisible en el enlace de navegación activo. Los overlays (Modal) usan `shadow-2xl` con fondo `black/50` y `backdrop-blur-sm`; se acepta como excepción.

### Shadow Vocabulary
- **Hairline lift** (`box-shadow: 0 1px 2px rgba(0,0,0,0.04)`): enlace de navegación activo.
- **Rest** (`shadow-sm`): campos y botón primario en reposo.
- **Hover lift** (`shadow-md`): botón primario en hover.
- **Overlay** (`shadow-2xl`): paneles de diálogo.

### Named Rules
**The Border Before Shadow Rule.** Si algo necesita separarse, primero borde `line` y cambio de tono; sombra solo para responder a estado u overlays.

## Shapes

Esquinas suaves y escalonadas por tamaño de contenedor: 6px en controles pequeños (botones de ícono), 8px en botones, campos y enlaces, 12px en tablas, tarjetas y filtros, 16px en formularios, modales y la hoja de la app; pastillas y avatares totalmente redondos. Bordes de 1px siempre; los anillos (`ring-1 ring-inset`) se usan en pastillas de estado.

## Components

### Buttons
Firme y directo.
- **Shape:** esquinas suaves (8px).
- **Primary:** fondo tinta, texto blanco 600 de 0.875rem, padding 8×16px, con ícono opcional a la izquierda y spinner al cargar.
- **Hover / Focus:** fondo tinta al 90% + `shadow-md`; foco con anillo tinta/20 y offset 2px; activo escala 0.98.
- **Disabled:** tinta al 40%, sin sombra, cursor no permitido.
- **Icon/ghost:** 6px de radio, tinta media, hover a lienzo + tinta.

### Chips
- **Status tag:** pastilla redonda 0.75rem/500, punto de 6px a la izquierda, anillo interior. Activo en verde con punto pulsante; inactivo en lienzo + tinta media. Clicable cuando alterna el estado (hover del anillo, escala 0.97).

### Cards / Containers
- **Corner Style:** 12px (tablas, tarjetas, estaciones) / 16px (formularios, modal).
- **Background:** hoja blanca; encabezados internos y franjas de aviso en lienzo.
- **Shadow Strategy:** ninguna (ver Elevation).
- **Border:** 1px `line`.
- **Internal Padding:** 12–16px en tarjetas, 24px en formularios.

### Inputs / Fields
- **Style:** hoja blanca, borde `line`, radio 8px, padding 8×12px, `shadow-sm`, placeholder tinta tenue.
- **Focus:** borde tinta + anillo tinta/10 de 2px. Hover: borde `line-strong`.
- **Error:** borde rojo 300, foco rojo 500 con anillo rojo/20, placeholder rojo 300.
- **Filtro de búsqueda:** 320px, fondo lienzo, radio 12px, ícono a la izquierda; al foco pasa a hoja.

### Navigation
- **Sidebar:** logo + "Producción" (15px/600), secciones con etiqueta 11px tinta tenue. Enlaces 13px/500 con ícono de 16px: inactivo tinta media sin borde, hover `black/4%`; activo en hoja con borde `line` y hairline lift.
- **Header:** 48px, borde inferior, toggle del sidebar, breadcrumb derivado de `NAV_SECTIONS`.

### Tables
Encabezado en lienzo con etiquetas en mayúsculas tinta tenue; filas divididas por `line`, hover a lienzo; celdas 24×16px.

### Activity Station (signature)
Tarjeta por actividad de línea en el tablero de personal: encabezado con nombre (0.875rem/600) y unidad en mono 11px, conteo `usado/cupo` en mono a la derecha (rojo si hay sobrecupo); lista de tarjetas de empleado y "lugares vacíos" punteados donde se suelta o se toca para colocar; franja en lienzo "Faltan N lugares para la selección" cuando la selección no cabe.

### Loading sweep
Barra de tinta de 1/4 de ancho que barre en 1.5s (`cubic-bezier(0.65, 0, 0.35, 1)`); con reduced motion queda fija a tinta/25.

## Do's and Don'ts

### Do:
- **Do** usar los tokens `canvas` / `surface` / `line` / `line-strong` / `ink` / `ink-muted` / `ink-subtle` para todo neutral nuevo.
- **Do** poner cantidades, códigos y unidades en mono con `tabular-nums`.
- **Do** separar con borde de 1px `line` y cambio de tono antes que con sombra.
- **Do** reutilizar las clases `.text_form_field`, `.form`, `.table-*`, `.input-filter` y los componentes de `shared`.
- **Do** mantener objetivos táctiles amplios y que tocar-y-colocar funcione igual que arrastrar.
- **Do** respetar `prefers-reduced-motion` en toda animación (ver loading sweep y punto de estado).

### Don't:
- **Don't** usar color saturado sin significado de estado; un acento de marca futuro entra como token en `@theme`.
- **Don't** introducir hex ad-hoc cuando existe un token equivalente.
- **Don't** añadir sombras a tarjetas en reposo.
- **Don't** mostrar barras de scroll (ocultas globalmente).
