# Vue 3 Control Structures — SPA Interactiva

Aplicación de Página Única (Single Page Application - SPA) construida con **Vue 3 (Composition API)** y **Vue Router 4**, diseñada para enseñar, demostrar e interactuar con cada una de las estructuras de control y directivas de Vue.

### 👥 Créditos / Desarrolladores:
- **Santiago Salazar Trinidad**
- **Sergio Luna Anton**
- **Axel Nuricumbo Jimenez**
- **Diego Brindis Guizar**

## 🚀 Tecnologías Utilizadas

- **Vue 3.5+**: Composition API (`<script setup>`), reactividad nativa y compilador de plantillas optimizado.
- **Vue Router 4**: Enrutamiento declarativo del lado del cliente, scroll suave y gestión dinámica del título (`router.afterEach`).
- **Vite 8**: Servidor de desarrollo ultrarrápido y empaquetador ESM.
- **Modern CSS (Vanilla CSS)**: Tokens CSS personalizados, soporte para modo oscuro / claro, tipografía de Google Fonts (*Outfit* y *Fira Code*), diseño glassmorphic y diseño 100% responsivo.

---

## 🗺️ Mapa de Rutas y Estructuras de Control

| Ruta | Estructura / Directiva | Descripción y Laboratorio |
| :--- | :--- | :--- |
| **`/`** | **Inicio (Overview)** | Visión general, matriz comparativa de comportamiento en el DOM, métricas y accesos rápidos. |
| **`/v-if`** | **`v-if` / `v-else-if` / `v-else`** | Renderizado condicional estricto (montaje y desmontaje físico en el DOM). Incluye simulador de roles de usuario, máquina de estados asíncronos (*idle, loading, success, error*) e inspector del DOM real. |
| **`/v-show`** | **`v-show`** | Visibilidad mediante CSS `display: none`. Experimento empírico de persistencia de estado en inputs vs `v-if`, costes de alternancia y acordeón de preguntas frecuentes. |
| **`/v-for`** | **`v-for` & `:key`** | Renderizado de colecciones (arrays, objetos y rangos). Laboratorio de manipulación de listas, iteración clave-valor, paginación numérica y demostración del peligro de usar `:key="index"`. |
| **`/template-control`** | **`<template>` & `v-for` con `v-if`** | Agrupación invisible de elementos sin generar etiquetas extra en el HTML. Tabla semántica con filas expansibles y la regla de oro para filtrar colecciones con `computed()`. |
| **`/componentes-dinamicos`** | **`<component :is>` & `<KeepAlive>`** | Polimorfismo de componentes. Panel interactivo multitarea (Editor de Notas, Métricas, Ajustes y Consola) con selector de transiciones y switch de persistencia de estado con `<KeepAlive>`. |
| **`/optimizacion`** | **`v-memo`, `v-once` & `v-pre`** | Control avanzado de reactividad. Demostración de snapshot inmutable con `v-once`, optimización quirúrgica de Virtual DOM con `v-memo` y omisión de compilación con `v-pre`. |

---

## 🛠️ Comandos de Ejecución

Para iniciar el servidor de desarrollo local:

```bash
yarn dev
```

El servidor estará disponible en [http://localhost:5173/](http://localhost:5173/).

Para compilar para producción:

```bash
yarn build
```

Para previsualizar la compilación de producción:

```bash
yarn preview
```

---

## 📁 Estructura del Proyecto

```text
proyecto3/
├── index.html                   # HTML principal con fuentes y SEO
├── package.json                 # Dependencias (vue, vue-router, vite)
├── vite.config.js               # Configuración de Vite con plugin Vue
├── public/
│   └── favicon.svg              # Favicon SVG de Vue 3
└── src/
    ├── main.js                  # Punto de entrada principal con router
    ├── style.css                # Sistema de diseño moderno y tokens
    ├── App.vue                  # Componente raíz con layout y transiciones
    ├── router/
    │   └── index.js             # Definición de rutas y metadatos
    ├── components/
    │   ├── AppNavbar.vue        # Barra superior con buscador y tema claro/oscuro
    │   ├── AppSidebar.vue       # Menú lateral responsivo con badges
    │   ├── CodeBlock.vue        # Bloque de código con syntax highlighting y botón copiar
    │   ├── DomVisualizer.vue    # Inspector del DOM real vs Virtual DOM
    │   └── CalloutCard.vue      # Alertas pedagógicas y reglas del Style Guide
    └── views/
        ├── HomeView.vue         # Visión general y tabla comparativa
        ├── VIfView.vue          # Laboratorio v-if / v-else-if / v-else
        ├── VShowView.vue        # Laboratorio v-show y persistencia de estado
        ├── VForView.vue         # Laboratorio v-for y el atributo :key
        ├── TemplateControlView.vue # Laboratorio <template> y combinación segura
        ├── DynamicComponentsView.vue # Laboratorio <component :is> con KeepAlive
        └── OptimizationView.vue # Laboratorio v-memo, v-once y v-pre
```
