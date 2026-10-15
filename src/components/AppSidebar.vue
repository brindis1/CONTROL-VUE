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
            <svg class="vue-logo" viewBox="0 0 256 221" width="22" height="20">
              <path fill="#42b883" d="M204.8 0H256L128 220.8L0 0h97.92L128 51.2L157.44 0h47.36Z"/>
              <path fill="#35495e" d="M0 0l128 220.8L256 0h-51.2L128 132.48L50.56 0H0Z"/>
              <path fill="#42b883" d="M50.56 0L128 133.12L204.8 0h-47.36L128 51.2L97.92 0H50.56Z"/>
            </svg>
          </div>
          <div class="brand-info">
            <div class="brand-title">Vue Control SPA</div>
            <div class="brand-subtitle">Guía de Estructuras</div>
          </div>
        </router-link>
      </div>

      <!-- Navigation Links -->
      <div class="sidebar-section-title">Estructuras</div>
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
            <svg v-if="item.icon === 'home'" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>

            <svg v-else-if="item.icon === 'split'" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2">
              <circle cx="6" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <line x1="6" y1="9" x2="6" y2="15"></line>
              <path d="M18 9a9 9 0 0 1-9 9"></path>
              <polyline points="14 5 18 9 14 13"></polyline>
            </svg>

            <svg v-else-if="item.icon === 'eye'" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>

            <svg v-else-if="item.icon === 'repeat'" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2">
              <path d="m17 2 4 4-4 4"></path>
              <path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
              <path d="m7 22-4-4 4-4"></path>
              <path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
            </svg>

            <svg v-else-if="item.icon === 'layers'" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>

            <svg v-else-if="item.icon === 'cpu'" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2">
              <rect x="4" y="4" width="16" height="16" rx="2"></rect>
              <rect x="9" y="9" width="6" height="6"></rect>
              <line x1="9" y1="1" x2="9" y2="4"></line>
              <line x1="15" y1="1" x2="15" y2="4"></line>
              <line x1="9" y1="20" x2="9" y2="23"></line>
              <line x1="15" y1="20" x2="15" y2="23"></line>
            </svg>

            <svg v-else-if="item.icon === 'zap'" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>

          <div class="nav-label-box">
            <span class="nav-name">{{ item.name }}</span>
            <span class="nav-desc">{{ item.desc }}</span>
          </div>
        </router-link>
      </nav>

      <!-- Sidebar Footer -->
      <div class="sidebar-footer">
        <div class="footer-note">Vue 3.5 &bull; Vue Router 4</div>
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
    name: 'Inicio',
    desc: 'Visión General',
    icon: 'home'
  },
  {
    path: '/v-if',
    name: 'v-if / v-else',
    desc: 'Renderizado Condicional',
    icon: 'split'
  },
  {
    path: '/v-show',
    name: 'v-show',
    desc: 'Visibilidad CSS',
    icon: 'eye'
  },
  {
    path: '/v-for',
    name: 'v-for & :key',
    desc: 'Renderizado de Listas',
    icon: 'repeat'
  },
  {
    path: '/template-control',
    name: '<template>',
    desc: 'Agrupación sin Divs',
    icon: 'layers'
  },
  {
    path: '/componentes-dinamicos',
    name: '<component :is>',
    desc: 'Componentes Dinámicos',
    icon: 'cpu'
  },
  {
    path: '/optimizacion',
    name: 'v-memo & v-once',
    desc: 'Control de Reactividad',
    icon: 'zap'
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
  padding: 0 1.25rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  width: 100%;
}

.logo-box {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-info {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 0.72rem;
  color: var(--text-muted);
}

.sidebar-section-title {
  padding: 1.2rem 1.25rem 0.4rem 1.25rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sidebar-nav {
  flex: 1;
  padding: 0.4rem 0.65rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--text-secondary);
  border: 1px solid transparent;
  transition: all var(--transition-fast);
}

.nav-item:hover {
  background: var(--bg-surface-elevated);
  color: var(--text-primary);
  text-decoration: none;
}

.nav-item-active {
  background: var(--bg-surface-elevated);
  border-color: var(--border-color);
  color: var(--vue-green);
  font-weight: 500;
}

.nav-item-active .nav-icon-box {
  color: var(--vue-green);
}

.nav-icon-box {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  flex-shrink: 0;
}

.nav-label-box {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.nav-name {
  font-size: 0.88rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-desc {
  font-size: 0.72rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-footer {
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--border-color);
}

.footer-note {
  font-size: 0.75rem;
  color: var(--text-muted);
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
    background: rgba(0, 0, 0, 0.5);
    z-index: 45;
  }
}
</style>
