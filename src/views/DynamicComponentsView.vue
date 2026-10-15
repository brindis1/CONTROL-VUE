<template>
  <div class="view-container animate-fade">
    <!-- View Header -->
    <div class="view-header">
      <div class="view-badges">
        <span class="badge badge-rose">Control Polimórfico</span>
        <span class="badge badge-vue">KeepAlive & Transiciones</span>
      </div>
      <h1 class="view-title">Estructura Dinámica: <code>&lt;component :is="..."&gt;</code></h1>
      <p class="view-lead">
        La etiqueta <code>&lt;component&gt;</code> permite alternar dinámicamente entre distintos componentes en tiempo de ejecución 
        mediante el atributo <code>:is</code>, ofreciendo una alternativa limpia y escalable a largas cadenas de <code>v-if / v-else-if</code>.
      </p>
    </div>

    <!-- Technical Analysis Grid -->
    <div class="grid-2">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
              <rect x="4" y="4" width="16" height="16" rx="2"></rect>
              <rect x="9" y="9" width="6" height="6"></rect>
              <line x1="9" y1="1" x2="9" y2="4"></line>
              <line x1="15" y1="1" x2="15" y2="4"></line>
            </svg>
            <span>Mecánica de &lt;component :is&gt;</span>
          </div>
        </div>
        <div class="panel-body">
          <ul class="concept-list">
            <li>
              <strong>Valores Aceptados:</strong> El atributo <code>:is</code> puede recibir tanto una cadena con el nombre de un componente registrado globalmente como una <em>definición de componente importada</em> (objeto SFC).
            </li>
            <li>
              <strong>Comportamiento por Defecto:</strong> Cada vez que el valor de <code>:is</code> cambia, el componente anterior se desmonta por completo (destruyendo su estado interno) y el nuevo se monta desde cero.
            </li>
            <li>
              <strong>Transiciones Suaves:</strong> Puede envolverse en <code>&lt;Transition mode="out-in"&gt;</code> para crear animaciones de cambio de vista sin parpadeos.
            </li>
          </ul>
        </div>
      </div>

      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span>El Superpoder de &lt;KeepAlive&gt;</span>
          </div>
        </div>
        <div class="panel-body">
          <p class="text-secondary text-sm">
            Al envolver el componente dinámico con <code>&lt;KeepAlive&gt;</code>, Vue guarda en memoria RAM la instancia del componente inactivo:
          </p>
          <div class="keepalive-flow mt-2">
            <span class="step-pill">onActivated()</span>
            <span class="step-arrow">⇄</span>
            <span class="step-pill">onDeactivated()</span>
          </div>
          <p class="text-secondary text-sm mt-3">
            Los formularios, scroll y variables reactivas de cada pestaña permanecen inalterados al volver a seleccionarla, evitando consultas redundantes a servidores.
          </p>
        </div>
      </div>
    </div>

    <!-- Playground: Sistema de Pestañas Multitarea -->
    <section class="section-block mt-4">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
            <span>Laboratorio Interactivo: Pestañas Dinámicas con Toggle de &lt;KeepAlive&gt;</span>
          </div>
          <span class="badge badge-rose">Control Avanzado</span>
        </div>

        <div class="panel-body">
          <!-- Master Controls -->
          <div class="tab-controls-bar">
            <!-- KeepAlive Switch -->
            <label class="toggle-switch">
              <input type="checkbox" v-model="useKeepAlive">
              <span class="switch-track">
                <span class="switch-thumb"></span>
              </span>
              <span>
                Envolver en <strong>&lt;KeepAlive&gt;</strong>: 
                <span :class="useKeepAlive ? 'text-vue' : 'text-rose'">{{ useKeepAlive ? 'Activado (Conserva Estado)' : 'Desactivado (Destruye al Cambiar)' }}</span>
              </span>
            </label>

            <!-- Transition Style Selector -->
            <div class="transition-selector">
              <label class="field-label-inline">Animación:</label>
              <select v-model="transitionName" class="form-select form-select-sm">
                <option value="fade">Fade Suave</option>
                <option value="slide">Deslizamiento</option>
                <option value="scale">Escalado / Zoom</option>
              </select>
            </div>
          </div>

          <!-- Tabs Navigation Bar -->
          <div class="tabs-nav-bar mt-3">
            <button 
              v-for="tab in availableTabs" 
              :key="tab.id"
              type="button" 
              class="tab-btn"
              :class="{ 'tab-btn-active': currentTab === tab.id }"
              @click="currentTab = tab.id"
            >
              {{ tab.name }}
            </button>
          </div>

          <!-- Dynamic Component View Area -->
          <div class="dynamic-stage mt-3">
            <div class="stage-header">
              <span class="badge" :class="useKeepAlive ? 'badge-vue' : 'badge-rose'">
                {{ useKeepAlive ? '<KeepAlive> Activo' : 'Instancia Efímera' }}
              </span>
              <span class="stage-tag font-mono">&lt;component :is="{{ currentTabComponent.name }}" /&gt;</span>
            </div>

            <!-- The Core Dynamic Structure -->
            <div class="stage-content">
              <!-- When KeepAlive is ON -->
              <template v-if="useKeepAlive">
                <KeepAlive>
                  <transition :name="transitionName" mode="out-in">
                    <component 
                      :is="currentTabComponent" 
                      :key="currentTab" 
                      class="tab-view-instance"
                    />
                  </transition>
                </KeepAlive>
              </template>

              <!-- When KeepAlive is OFF -->
              <template v-else>
                <transition :name="transitionName" mode="out-in">
                  <component 
                    :is="currentTabComponent" 
                    :key="currentTab" 
                    class="tab-view-instance"
                  />
                </transition>
              </template>
            </div>
          </div>

          <!-- Code for Dynamic Component -->
          <CodeBlock 
            title="Implementación de <component :is> con <KeepAlive>"
            :code="dynamicCodeSnippet"
          />
        </div>
      </div>
    </section>

    <!-- Callout on Lifecycle with KeepAlive -->
    <CalloutCard type="tip" title="Hooks del Ciclo de Vida con <KeepAlive>">
      Cuando un componente está bajo <code>&lt;KeepAlive&gt;</code>, los hooks habituales <code>onMounted</code> y <code>onUnmounted</code> 
      <strong>no</strong> se disparan cada vez que el usuario entra o sale de la pestaña. 
      En su lugar, Vue proporciona dos hooks específicos: <code>onActivated()</code> (cuando vuelve a ser visible) 
      y <code>onDeactivated()</code> (cuando se oculta en la memoria caché).
    </CalloutCard>
  </div>
</template>

<script setup>
import { ref, computed, defineComponent, h } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'
import CalloutCard from '../components/CalloutCard.vue'

const useKeepAlive = ref(true)
const transitionName = ref('fade')
const currentTab = ref('editor')

// Mini Component 1: Note Editor with Internal Reactive State
const TabEditor = defineComponent({
  name: 'TabEditor',
  setup() {
    const text = ref('Redactando notas importantes en el editor dinámico...\n\nSi cambias de pestaña con KeepAlive activado, este texto no se perderá.')
    const wordCount = computed(() => text.value.trim() ? text.value.trim().split(/\s+/).length : 0)
    return { text, wordCount }
  },
  template: `
    <div class="tab-inner">
      <div class="tab-inner-header">
        <h4>Editor de Notas</h4>
        <span class="badge">Estado local: {{ wordCount }} palabras</span>
      </div>
      <p class="tab-instruction">Escribe cualquier texto aquí abajo. Luego cambia a otra pestaña y vuelve para comprobar la persistencia de datos:</p>
      <textarea v-model="text" class="form-input editor-textarea" rows="4"></textarea>
    </div>
  `
})

// Mini Component 2: Analytics with Interactive Sliders
const TabAnalytics = defineComponent({
  name: 'TabAnalytics',
  setup() {
    const visitors = ref(840)
    const bounceRate = ref(24)
    return { visitors, bounceRate }
  },
  template: `
    <div class="tab-inner">
      <div class="tab-inner-header">
        <h4>Métricas y Analítica</h4>
        <span class="badge">Dashboard KPI</span>
      </div>
      <div class="analytics-metrics-grid">
        <div class="metric-card">
          <span class="metric-title">Visitantes Únicos</span>
          <span class="metric-val text-vue">{{ visitors }}</span>
          <input type="range" min="100" max="2000" v-model.number="visitors" class="metric-slider">
        </div>
        <div class="metric-card">
          <span class="metric-title">Tasa de Rebote</span>
          <span class="metric-val text-rose">{{ bounceRate }}%</span>
          <input type="range" min="5" max="80" v-model.number="bounceRate" class="metric-slider">
        </div>
      </div>
    </div>
  `
})

// Mini Component 3: System Settings with Checkbox Toggles
const TabSettings = defineComponent({
  name: 'TabSettings',
  setup() {
    const autoSave = ref(true)
    const notifications = ref(false)
    const highContrast = ref(true)
    return { autoSave, notifications, highContrast }
  },
  template: `
    <div class="tab-inner">
      <div class="tab-inner-header">
        <h4>Configuración del Sistema</h4>
        <span class="badge">Preferencias</span>
      </div>
      <div class="settings-stack">
        <label class="toggle-switch">
          <input type="checkbox" v-model="autoSave">
          <span class="switch-track"><span class="switch-thumb"></span></span>
          <span>Autoguardado en nube cada 30 segundos</span>
        </label>
        <label class="toggle-switch">
          <input type="checkbox" v-model="notifications">
          <span class="switch-track"><span class="switch-thumb"></span></span>
          <span>Notificaciones sonoras en tiempo real</span>
        </label>
        <label class="toggle-switch">
          <input type="checkbox" v-model="highContrast">
          <span class="switch-track"><span class="switch-thumb"></span></span>
          <span>Modo de alto contraste para accesibilidad</span>
        </label>
      </div>
    </div>
  `
})

// Mini Component 4: Server Console
const TabServer = defineComponent({
  name: 'TabServer',
  setup() {
    const logs = ref([
      '[12:45:01] INFO  - Handshake TLS 1.3 establecido con éxito.',
      '[12:45:04] INFO  - Caché de Redis invalidada para módulo auth.',
      '[12:45:12] WARN  - Latencia temporal de 85ms en nodo eu-west-1.'
    ])
    const addLog = () => {
      const now = new Date().toTimeString().split(' ')[0]
      logs.value.push('[' + now + '] INFO  - Ping periódico recibido. Servidor activo.')
    }
    return { logs, addLog }
  },
  template: `
    <div class="tab-inner">
      <div class="tab-inner-header">
        <h4>Registro del Servidor</h4>
        <button type="button" class="btn btn-sm btn-secondary" @click="addLog">Enviar Ping</button>
      </div>
      <div class="console-box">
        <div v-for="(log, idx) in logs" :key="idx" class="console-line">{{ log }}</div>
      </div>
    </div>
  `
})

const availableTabs = [
  { id: 'editor', name: 'Editor de Notas', component: TabEditor },
  { id: 'analytics', name: 'Analítica', component: TabAnalytics },
  { id: 'settings', name: 'Ajustes', component: TabSettings },
  { id: 'server', name: 'Consola', component: TabServer }
]

const currentTabComponent = computed(() => {
  const found = availableTabs.find(t => t.id === currentTab.value)
  return found ? found.component : TabEditor
})

const dynamicCodeSnippet = `<script setup>
import { ref, shallowRef } from 'vue'
import TabEditor from './TabEditor.vue'
import TabAnalytics from './TabAnalytics.vue'
import TabSettings from './TabSettings.vue'

const currentTab = shallowRef(TabEditor)
const useCache = ref(true)
<\/script>

<template>
  <!-- KeepAlive mantiene en memoria los componentes inactivos -->
  <KeepAlive v-if="useCache">
    <Transition name="fade" mode="out-in">
      <component :is="currentTab" />
    </Transition>
  </KeepAlive>

  <!-- Sin KeepAlive, el componente se destruye al cambiar -->
  <Transition v-else name="fade" mode="out-in">
    <component :is="currentTab" />
  </Transition>
</template>`
</script>

<style scoped>
.view-container {
  max-width: 1100px;
  margin: 0 auto;
}

.view-header {
  margin-bottom: 2rem;
}

.view-badges {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 0.8rem;
}

.view-title {
  font-size: 2.2rem;
  margin-bottom: 0.8rem;
}

.view-lead {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.65;
}

.concept-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.concept-list li {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.concept-list strong {
  color: var(--text-primary);
}

.keepalive-flow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.8rem 0;
}

.step-pill {
  padding: 0.25rem 0.6rem;
  background: var(--bg-app);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent-cyan);
}

.step-arrow {
  color: var(--text-muted);
  font-weight: bold;
}

.text-sm { font-size: 0.85rem; }
.text-secondary { color: var(--text-secondary); }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 0.75rem; }
.mt-4 { margin-top: 1.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.font-mono { font-family: var(--font-mono); }

/* Playground controls */
.tab-controls-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--bg-app);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.transition-selector {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.field-label-inline {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.form-select-sm {
  padding: 0.35rem 0.7rem;
  font-size: 0.85rem;
}

.tabs-nav-bar {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.3rem;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.1rem;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-family: var(--font-main);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.tab-btn:hover {
  background: var(--bg-surface-hover);
  color: var(--text-primary);
  border-color: var(--border-color-hover);
}

.tab-btn-active {
  background: rgba(244, 63, 94, 0.12);
  border-color: var(--accent-rose);
  color: var(--accent-rose);
  box-shadow: 0 0 12px var(--accent-rose-glow);
}

/* Dynamic Stage */
.dynamic-stage {
  background: var(--bg-app);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.stage-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 1.25rem;
  background: rgba(0, 0, 0, 0.25);
  border-bottom: 1px solid var(--border-color);
}

.stage-tag {
  font-size: 0.82rem;
  color: var(--text-muted);
}

.stage-content {
  padding: 1.6rem;
  min-height: 220px;
}

/* Transitions for dynamic components */
/* Fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.22s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Slide */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.24s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Scale */
.scale-enter-active, .scale-leave-active {
  transition: transform 0.22s ease, opacity 0.22s ease;
}
.scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.scale-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* Styles inside mini components */
:deep(.tab-inner-header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

:deep(.tab-instruction) {
  font-size: 0.88rem;
  color: var(--text-secondary);
  margin-bottom: 0.8rem;
}

:deep(.editor-textarea) {
  resize: vertical;
  min-height: 100px;
  line-height: 1.6;
}

:deep(.analytics-metrics-grid) {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.2rem;
}

:deep(.metric-card) {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

:deep(.metric-title) {
  font-size: 0.82rem;
  color: var(--text-muted);
}

:deep(.metric-val) {
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 1.1;
}

:deep(.metric-slider) {
  margin-top: 0.5rem;
  cursor: pointer;
  accent-color: var(--vue-green);
}

:deep(.settings-stack) {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

:deep(.console-box) {
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  border-radius: var(--radius-sm);
  padding: 0.9rem;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  max-height: 140px;
  overflow-y: auto;
}

:deep(.console-line) {
  color: #94a3b8;
  padding: 0.15rem 0;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.04);
}
</style>
