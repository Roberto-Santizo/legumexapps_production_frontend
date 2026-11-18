# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Supervisores en planta:** en el piso de producción, con tablet. Confirman y reasignan personal por actividad de línea, inician/finalizan tareas, capturan producción (tarimas o lotes) y registran tiempos muertos y observaciones.
- **Planificadores / oficina:** en desktop. Arman planes semanales (draft → plan), mantienen catálogos (líneas, actividades, posiciones, campos de captura, SKUs, materia prima, material de empaque, clientes).
- **Bodega de material de empaque:** entregan material para las tareas y firman transacciones.
- **Gerencia:** consulta dashboard, rendimientos y el asistente IA de tareas.

## Product Purpose

Sistema de producción de Legumex (planta empacadora, Guatemala). Lleva cada tarea del plan semanal por su ciclo: entrega de material de empaque → confirmación de personal → ejecución → finalización con producción registrada. Éxito = captura rápida y sin errores en planta, trazabilidad completa y visibilidad de rendimiento real vs. estimado.

## Positioning

Herramienta interna hecha a la medida del flujo real de la planta: personal ligado a los cupos de actividad de cada línea, captura según el `capture_type` de la línea (`pallet` / `lot` / `product`), reemplazos desde biométrico, firmas en transacciones de material.

## Operating Context

- Uso mixto: tablet táctil en planta (drag & drop y tap-to-select deben funcionar igual), desktop en oficina.
- Estados de tarea: 1 Pendiente entrega material empaque · 2 Lista para confirmación de asignaciones · 3 Lista para ejecución · 4 En progreso · 5 Finalizada (solo lectura).
- Carga masiva por Excel para catálogos y empleados; exportación a Excel y PDF (transacciones firmadas).
- Asistente IA de solo lectura sobre tareas y tomas de rendimiento, con historial por usuario.
- Especificaciones de integración en `feat-references/`.

## Capabilities and Constraints

- SPA React contra API Laravel con JWT; todo el copy de UI en español (es-GT), rutas en español.
- Estados históricos pueden traer datos nulos (actividad/posición en asignaciones antiguas); la UI debe tolerarlos.
- Cálculos de totales, porcentajes, fechas y tarimas los hace el backend; el frontend no los inventa.
- Sin roles/permisos documentados aquí más allá de `usePermissions` — por confirmar.

## Brand Commitments

- Nombre: "Legumexapps Producción".
- Voz: español directo, operativo, sin adornos.
- Sin logo ni assets de marca en el repo (solo `public/favicon.ico`).

## Evidence on Hand

- Datos reales vienen de la API; no hay datos de muestra, métricas ni testimonios en el repo. No fabricar cifras de producción.

## Product Principles

1. La captura en planta manda: pocos toques, objetivos táctiles amplios, cero ambigüedad antes de confirmar.
2. Prevenir errores antes que corregirlos: bloquear acciones inválidas (cupos sobrepasados, personal sin asignar) y confirmar acciones destructivas.
3. Todo deja rastro: quién, cuándo y qué, con firmas y fechas visibles.
4. Rendimiento a la vista: producción real vs. estimado legible de un vistazo.
5. Consistencia entre módulos: el mismo patrón de índice/formulario/panel en todo el sistema.

## Accessibility & Inclusion

Uso en tablet en ambiente de planta: objetivos táctiles amplios y contraste suficiente. Ningún estándar formal confirmado.
