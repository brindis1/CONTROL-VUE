<template>
  <header class="navbar">
    <div class="navbar-left">
      <button 
        type="button" 
        class="mobile-toggle-btn" 
        @click="$emit('toggle-sidebar')"
        aria-label="Abrir menú"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <div class="breadcrumb">
        <router-link to="/" class="breadcrumb-item">Estructuras</router-link>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{ currentRouteName }}</span>
      </div>
    </div>

    <div class="navbar-right">
      <!-- Direct Route Jump -->
      <div class="jump-selector-wrapper">
        <label for="route-jump" class="sr-only">Ir a estructura</label>
        <select id="route-jump" class="jump-select" :value="$route.path" @change="onSelectRoute($event.target.value)">
          <option value="/">Inicio (Resumen)</option>
          <option value="/v-if">v-if / v-else-if / v-else</option>
          <option value="/v-show">v-show (CSS display)</option>
          <option value="/v-for">v-for (Listas y :key)</option>
          <option value="/template-control">&lt;template&gt; & v-for</option>
          <option value="/componentes-dinamicos">&lt;component :is&gt;</option>
          <option value="/optimizacion">v-memo & v-once</option>
        </select>
      </div>

      <!-- Vue 3 Doc link -->
      <a 
        href="https://vuejs.org/guide/essentials/conditional.html" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="vue-doc-link"
        title="Documentación Oficial de Vue 3"
      >
        Docs Vue
      </a>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineEmits(['toggle-sidebar'])

const route = useRoute()
const router = useRouter()

const currentRouteName = computed(() => {
  if (route.path === '/') return 'Resumen'
  return route.meta?.title?.split('|')[0]?.trim() || route.name
})

const onSelectRoute = (path) => {
  if (path) router.push(path)
}
</script>

<style scoped>
.navbar {
  height: var(--header-height);
  padding: 0 1.75rem;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 40;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mobile-toggle-btn {
  display: none;
  background: transparent;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: var(--radius-sm);
}

.mobile-toggle-btn:hover {
  background: var(--bg-surface-elevated);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.86rem;
}

.breadcrumb-item {
  color: var(--text-muted);
}

.breadcrumb-item:hover {
  color: var(--text-primary);
  text-decoration: none;
}

.breadcrumb-separator {
  color: var(--text-muted);
}

.breadcrumb-current {
  color: var(--text-primary);
  font-weight: 500;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.jump-select {
  padding: 0.35rem 0.65rem;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-family: var(--font-main);
  font-size: 0.82rem;
  cursor: pointer;
  outline: none;
}

.vue-doc-link {
  font-size: 0.8rem;
  color: var(--text-secondary);
  padding: 0.3rem 0.6rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background: var(--bg-surface-elevated);
}

.vue-doc-link:hover {
  color: var(--text-primary);
  text-decoration: none;
  border-color: var(--border-color-hover);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (max-width: 900px) {
  .navbar {
    padding: 0 1rem;
  }
  .mobile-toggle-btn {
    display: inline-flex;
  }
  .jump-selector-wrapper {
    display: none;
  }
}
</style>
