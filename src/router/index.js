import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import VIfView from '../views/VIfView.vue'
import VShowView from '../views/VShowView.vue'
import VForView from '../views/VForView.vue'
import TemplateControlView from '../views/TemplateControlView.vue'
import DynamicComponentsView from '../views/DynamicComponentsView.vue'
import OptimizationView from '../views/OptimizationView.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Inicio | Guía de Estructuras de Control',
      description: 'Explora y comprende las estructuras de control en Vue 3 con ejemplos interactivos y visuales.',
      badge: 'Overview',
      badgeColor: 'badge-vue'
    }
  },
  {
    path: '/v-if',
    name: 'v-if',
    component: VIfView,
    meta: {
      title: 'v-if, v-else-if y v-else | Renderizado Condicional',
      description: 'Inserción y destrucción real de elementos en el árbol DOM.',
      badge: 'Condicional',
      badgeColor: 'badge-vue',
      icon: 'split'
    }
  },
  {
    path: '/v-show',
    name: 'v-show',
    component: VShowView,
    meta: {
      title: 'v-show | Visibilidad por CSS',
      description: 'Alternancia de visibilidad mediante display: none manteniendo el nodo montado.',
      badge: 'Visibilidad',
      badgeColor: 'badge-cyan',
      icon: 'eye'
    }
  },
  {
    path: '/v-for',
    name: 'v-for',
    component: VForView,
    meta: {
      title: 'v-for | Renderizado de Listas',
      description: 'Iteración reactiva sobre arrays, objetos y rangos con el atributo clave :key.',
      badge: 'Iteración',
      badgeColor: 'badge-purple',
      icon: 'repeat'
    }
  },
  {
    path: '/template-control',
    name: 'template-control',
    component: TemplateControlView,
    meta: {
      title: '<template> & v-for con v-if | Agrupamiento Limpio',
      description: 'Uso del tag invisible <template> para agrupar directivas sin generar etiquetas extra.',
      badge: 'Estructura',
      badgeColor: 'badge-amber',
      icon: 'layers'
    }
  },
  {
    path: '/componentes-dinamicos',
    name: 'componentes-dinamicos',
    component: DynamicComponentsView,
    meta: {
      title: '<component :is="..."> | Componentes Dinámicos',
      description: 'Alternancia polimórfica de componentes combinada con <KeepAlive>.',
      badge: 'Dinámico',
      badgeColor: 'badge-rose',
      icon: 'cpu'
    }
  },
  {
    path: '/optimizacion',
    name: 'optimizacion',
    component: OptimizationView,
    meta: {
      title: 'v-memo, v-once & v-pre | Control de Reactividad',
      description: 'Optimización fina y omisión de re-renderizados en el Virtual DOM.',
      badge: 'Rendimiento',
      badgeColor: 'badge-cyan',
      icon: 'zap'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} — Vue 3 SPA`
  }
})

export default router
