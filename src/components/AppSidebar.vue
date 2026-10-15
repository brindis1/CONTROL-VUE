<template>
  <div>
    <!-- Mobile Backdrop -->
    <div 
      v-if="isOpen" 
      class="sidebar-backdrop" 
      @click="$emit('close-sidebar')"
    ></div>

    <!-- Main Sidebar -->
    <aside class="sidebar" :class="{ 'is-open': isOpen }">
      <!-- App Brand -->
      <div class="sidebar-header">
        <router-link to="/" class="brand-link" @click="$emit('close-sidebar')">
          <div class="logo-box">
            <svg class="vue-logo" viewBox="0 0 256 221" width="28" height="24">
              <path fill="#42b883" d="M204.8 0H256L128 220.8L0 0h97.92L128 51.2L157.44 0h47.36Z"/>
              <path fill="#35495e" d="M0 0l128 220.8L256 0h-51.2L128 132.48L50.56 0H0Z"/>
              <path fill="#42b883" d="M50.56 0L128 133.12L204.8 0h-47.36L128 51.2L97.92 0H50.56Z"/>
            </svg>
          </div>
          <div class="brand-info">
            <div class="brand-title">Vue Control SPA</div>
            <div class="brand-subtitle">Vue 3 + Vue Router</div>
          </div>
        </router-link>
      </div>

      <!-- Navigation Links -->
      <div class="sidebar-section-title">Estructuras de Control</div>
      <nav class="sidebar-nav">
        <router-link 
          v-for="item in navItems" 
          :key="item.path"
          :to="item.path" 
          class="nav-item"
          active-class="nav-item-active"
          @click="$emit('close-sidebar')"
        >
          <div class="nav-icon-box">
            <!-- Icons for each route -->
            <svg v-if="item.icon === 'home'" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>

            <svg v-else-if="item.icon === 'split'" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
              <circle cx="6" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <line x1="6" y1="9" x2="6" y2="15"></line>
              <path d="M18 9a9 9 0 0 1-9 9"></path>
              <polyline points="14 5 18 9 14 13"></polyline>
            </svg>

            <svg v-else-if="item.icon === 'eye'" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>

            <svg v-else-if="item.icon === 'repeat'" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
              <path d="m17 2 4 4-4 4"></path>
              <path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
              <path d="m7 22-4-4 4-4"></path>
              <path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
            </svg>

            <svg v-else-if="item.icon === 'layers'" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>

            <svg v-else-if="item.icon === 'cpu'" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
              <rect x="4" y="4" width="16" height="16" rx="2"></rect>
              <rect x="9" y="9" width="6" height="6"></rect>
              <line x1="9" y1="1" x2="9" y2="4"></line>
              <line x1="15" y1="1" x2="15" y2="4"></line>
              <line x1="9" y1="20" x2="9" y2="23"></line>
              <line x1="15" y1="20" x2="15" y2="23"></line>
              <line x1="20" y1="9" x2="23" y2="9"></line>
              <line x1="20" y1="14" x2="23" y2="14"></line>
              <line x1="1" y1="9" x2="4" y2="9"></line>
              <line x1="1" y1="14" x2="4" y2="14"></line>
            </svg>

            <svg v-else-if="item.icon === 'zap'" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>

          <div class="nav-label-box">
            <span class="nav-name">{{ item.name }}</span>
            <span class="nav-desc">{{ item.desc }}</span>
          </div>

          <span v-if="item.tag" class="nav-badge" :class="item.tagColor">
            {{ item.tag }}
          </span>
        </router-link>
      </nav>

      <!-- Sidebar Footer -->
      <div class="sidebar-footer">
        <div class="footer-card">
          <div class="footer-card-title">Arquitectura SPA</div>
          <div class="footer-card-text">Totalmente reactivo con Composition API & Vue Router 4</div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close-sidebar'])

const navItems = [
  {
    path: '/',
    name: 'Visión General',
    desc: 'Dashboard & Comparativa',
    icon: 'home',
    tag: 'Intro',
    tagColor: 'badge-vue'
  },
  {
    path: '/v-if',
    name: 'v-if / else-if / else',
    desc: 'Renderizado Condicional',
    icon: 'split',
    tag: 'DOM Real',
    tagColor: 'badge-vue'
  },
  {
    path: '/v-show',
    name: 'v-show',
    desc: 'Visibilidad CSS',
    icon: 'eye',
    tag: 'CSS display',
    tagColor: 'badge-cyan'
  },
  {
    path: '/v-for',
    name: 'v-for & :key',
    desc: 'Renderizado de Listas',
    icon: 'repeat',
    tag: 'Reconciliación',
    tagColor: 'badge-purple'
  },
  {
    path: '/template-control',
    name: '<template> Wrapper',
    desc: 'v-for con v-if seguro',
    icon: 'layers',
    tag: 'Estructura',
    tagColor: 'badge-amber'
  },
  {
    path: '/componentes-dinamicos',
    name: '<component :is>',
    desc: 'Polimorfismo & KeepAlive',
    icon: 'cpu',
    tag: 'Dinámico',
    tagColor: 'badge-rose'
  },
  {
    path: '/optimizacion',
    name: 'v-memo & v-once',
    desc: 'Optimización fina VDOM',
    icon: 'zap',
    tag: 'Avanzado',
    tagColor: 'badge-cyan'
  }
]
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  background: var(--bg-surface);
  border-right: 1px solid var(--border-color);
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  z-index: 50;
  transition: transform var(--transition-smooth);
}

.sidebar-header {
  height: var(--header-height);
  padding: 0 1.4rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  text-decoration: none;
  width: 100%;
}

.logo-box {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: rgba(66, 184, 131, 0.12);
  border: 1px solid rgba(66, 184, 131, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-info {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 0.76rem;
  color: var(--vue-green-light);
  font-weight: 500;
}

.sidebar-section-title {
  padding: 1.2rem 1.4rem 0.5rem 1.4rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.sidebar-nav {
  flex: 1;
  padding: 0.5rem 0.85rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 0.9rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--text-secondary);
  border: 1px solid transparent;
  transition: all var(--transition-fast);
}

.nav-item:hover {
  background: var(--bg-surface-elevated);
  color: var(--text-primary);
  border-color: var(--border-color);
  transform: translateX(3px);
}

.nav-item-active {
  background: linear-gradient(135deg, rgba(66, 184, 131, 0.15), rgba(66, 184, 131, 0.05));
  border-color: rgba(66, 184, 131, 0.4);
  color: var(--vue-green-light);
  font-weight: 600;
  box-shadow: inset 3px 0 0 var(--vue-green);
}

.nav-item-active .nav-icon-box {
  color: var(--vue-green-light);
  background: rgba(66, 184, 131, 0.2);
}

.nav-icon-box {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-surface-elevated);
  color: var(--text-secondary);
  flex-shrink: 0;
  transition: all var(--transition-fast);
}

.nav-label-box {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.nav-name {
  font-size: 0.92rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-desc {
  font-size: 0.74rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-badge {
  font-size: 0.68rem;
  padding: 0.15rem 0.45rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  text-transform: uppercase;
  flex-shrink: 0;
}

.sidebar-footer {
  padding: 1.2rem;
  border-top: 1px solid var(--border-color);
}

.footer-card {
  padding: 0.85rem;
  background: var(--bg-surface-elevated);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.footer-card-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.2rem;
}

.footer-card-text {
  font-size: 0.72rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.sidebar-backdrop {
  display: none;
}

@media (max-width: 900px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    transform: translateX(-100%);
    box-shadow: var(--shadow-lg);
  }

  .sidebar.is-open {
    transform: translateX(0);
  }

  .sidebar-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
    z-index: 45;
  }
}
</style>
