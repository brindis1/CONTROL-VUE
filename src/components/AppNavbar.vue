<template>
  <header class="navbar">
    <div class="navbar-left">
      <button 
        type="button" 
        class="mobile-toggle-btn" 
        @click="$emit('toggle-sidebar')"
        aria-label="Abrir menú"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" fill="none" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <div class="breadcrumb">
        <router-link to="/" class="breadcrumb-item">Estructuras de Control</router-link>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{ currentRouteName }}</span>
      </div>
    </div>

    <div class="navbar-right">
      <!-- Direct Route Jump -->
      <div class="jump-selector-wrapper">
        <label for="route-jump" class="sr-only">Ir a estructura</label>
        <select id="route-jump" class="jump-select" :value="$route.path" @change="onSelectRoute($event.target.value)">
          <option value="/">🏠 Inicio (Overview)</option>
          <option value="/v-if">🔀 v-if / v-else-if / v-else</option>
          <option value="/v-show">👁️ v-show (Visibilidad CSS)</option>
          <option value="/v-for">🔁 v-for (Listas y :key)</option>
          <option value="/template-control">🧱 &lt;template&gt; & v-for con v-if</option>
          <option value="/componentes-dinamicos">⚙️ &lt;component :is&gt;</option>
          <option value="/optimizacion">⚡ v-memo & v-once</option>
        </select>
      </div>

      <!-- Theme Switcher -->
      <button 
        type="button" 
        class="theme-btn" 
        @click="toggleTheme" 
        :title="isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
      >
        <!-- Sun for light mode switch -->
        <svg v-if="isDark" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <!-- Moon for dark mode switch -->
        <svg v-else viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>

      <!-- Vue 3 Doc Badge -->
      <a 
        href="https://vuejs.org/guide/essentials/conditional.html" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="vue-badge-link"
        title="Documentación Oficial de Vue 3"
      >
        <span class="dot-online"></span>
        <span>Vue 3.5+</span>
      </a>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineEmits(['toggle-sidebar'])

const route = useRoute()
const router = useRouter()

const isDark = ref(true)

const currentRouteName = computed(() => {
  if (route.path === '/') return 'Visión General'
  return route.meta?.title?.split('|')[0]?.trim() || route.name
})

const onSelectRoute = (path) => {
  if (path) router.push(path)
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('vue-control-theme', theme)
}

onMounted(() => {
  const saved = localStorage.getItem('vue-control-theme')
  if (saved) {
    isDark.value = saved === 'dark'
  } else {
    isDark.value = true
  }
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
})
</script>

<style scoped>
.navbar {
  height: var(--header-height);
  padding: 0 2rem;
  background: var(--bg-glass);
  backdrop-filter: blur(14px);
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
  gap: 1rem;
}

.mobile-toggle-btn {
  display: none;
  background: transparent;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.35rem;
  border-radius: var(--radius-sm);
}

.mobile-toggle-btn:hover {
  background: var(--bg-surface-elevated);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.breadcrumb-item {
  color: var(--text-secondary);
  font-weight: 500;
}

.breadcrumb-item:hover {
  color: var(--vue-green);
}

.breadcrumb-separator {
  color: var(--text-muted);
}

.breadcrumb-current {
  color: var(--text-primary);
  font-weight: 600;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.jump-select {
  padding: 0.4rem 0.8rem;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-family: var(--font-main);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  transition: border-color var(--transition-fast);
}

.jump-select:focus {
  border-color: var(--vue-green);
}

.theme-btn {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md);
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.theme-btn:hover {
  border-color: var(--vue-green);
  color: var(--vue-green);
  transform: translateY(-1px);
}

.vue-badge-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.75rem;
  background: rgba(66, 184, 131, 0.12);
  border: 1px solid rgba(66, 184, 131, 0.3);
  border-radius: var(--radius-full);
  color: var(--vue-green-light);
  font-size: 0.82rem;
  font-weight: 600;
  transition: all var(--transition-fast);
}

.vue-badge-link:hover {
  background: rgba(66, 184, 131, 0.22);
  border-color: var(--vue-green);
}

.dot-online {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--vue-green);
  box-shadow: 0 0 6px var(--vue-green);
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
    padding: 0 1.25rem;
  }
  .mobile-toggle-btn {
    display: inline-flex;
  }
  .jump-selector-wrapper {
    display: none;
  }
  .breadcrumb-item {
    display: none;
  }
  .breadcrumb-separator {
    display: none;
  }
}
</style>
