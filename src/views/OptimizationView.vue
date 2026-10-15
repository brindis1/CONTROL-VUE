<template>
  <div class="view-container animate-fade">
    <!-- View Header -->
    <div class="view-header">
      <div class="view-badges">
        <span class="badge badge-cyan">Optimización Virtual DOM</span>
        <span class="badge badge-vue">Control de Reactividad</span>
      </div>
      <h1 class="view-title">Control Avanzado: <code>v-memo</code>, <code>v-once</code> y <code>v-pre</code></h1>
      <p class="view-lead">
        Vue 3 introduce directivas de control de bajo nivel que permiten omitir quirúrgicamente la compilación 
        o la reconciliación del Virtual DOM, maximizando los fotogramas por segundo (FPS) en aplicaciones con alta carga.
      </p>
    </div>

    <!-- Technical Analysis Grid -->
    <div class="grid-3">
      <!-- v-once -->
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <span class="badge badge-vue">v-once</span>
          </div>
        </div>
        <div class="panel-body">
          <p class="text-sm text-secondary">
            Evalúa y renderiza el elemento y todos sus hijos <strong>una única vez</strong>. En actualizaciones posteriores, 
            Vue lo trata como un subárbol estático e ignora cualquier cambio reactivo.
          </p>
          <div class="ideal-for mt-3">
            <strong>Ideal para:</strong> Textos estáticos pesados, iconos SVG embebidos y bloques informativos inmutables.
          </div>
        </div>
      </div>

      <!-- v-memo -->
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <span class="badge badge-cyan">v-memo="[deps]"</span>
          </div>
        </div>
        <div class="panel-body">
          <p class="text-sm text-secondary">
            Memoiza un subárbol basado en un array de dependencias. Si los valores dentro del array no cambian, 
            Vue <strong>omite completamente</strong> la generación de nuevos VNodes y el diffing.
          </p>
          <div class="ideal-for mt-3">
            <strong>Ideal para:</strong> Listas con <code>v-for</code> de más de 1,000 elementos con selección única.
          </div>
        </div>
      </div>

      <!-- v-pre -->
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <span class="badge badge-purple">v-pre</span>
          </div>
        </div>
        <div class="panel-body">
          <p class="text-sm text-secondary">
            Indica al compilador de plantillas que ignore por completo el nodo y sus hijos. 
            Permite renderizar texto crudo como <code>{{ variable }}</code> sin procesarlo.
          </p>
          <div class="ideal-for mt-3">
            <strong>Ideal para:</strong> Documentación técnica y visualizadores de plantillas crudas.
          </div>
        </div>
      </div>
    </div>

    <!-- Playground 1: Demostración de v-once -->
    <section class="section-block mt-4">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Laboratorio 1: Comportamiento Inmutable de v-once</span>
          </div>
          <span class="badge badge-vue">Snapshot Único</span>
        </div>

        <div class="panel-body">
          <div class="counter-controller mb-3">
            <button type="button" class="btn btn-primary" @click="mainCounter++">
              Incrementar Contador Reactivo (+1)
            </button>
            <span class="counter-display">
              Valor en memoria: <strong class="text-vue">{{ mainCounter }}</strong>
            </span>
          </div>

          <div class="grid-2">
            <!-- Normal Reactive Node -->
            <div class="test-node-card">
              <div class="node-badge">Nodo Reactivo Normal</div>
              <div class="node-val">{{ mainCounter }}</div>
              <small class="text-muted">Se re-renderiza con cada actualización del estado.</small>
            </div>

            <!-- v-once Node -->
            <div class="test-node-card node-frozen">
              <div class="node-badge badge-vue">Nodo con directiva v-once</div>
              <div v-once class="node-val">{{ mainCounter }}</div>
              <small class="text-muted">Congelado en el valor del primer montaje (1). No volverá a cambiar.</small>
            </div>
          </div>

          <CodeBlock 
            title="Sintaxis de v-once"
            :code="onceSnippet"
          />
        </div>
      </div>
    </section>

    <!-- Playground 2: v-memo en Listas Masivas -->
    <section class="section-block">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            <span>Laboratorio 2: Rendimiento Quirúrgico con v-memo="[item.id === selectedId]"</span>
          </div>
          <span class="badge badge-cyan">Vue 3.2+</span>
        </div>

        <div class="panel-body">
          <p class="text-secondary mb-3">
            Haz clic en cualquiera de las tarjetas de usuario. Observa cómo 
            <code>v-memo="[user.id === selectedUserId]"</code> garantiza que solo el elemento deseleccionado 
            y el nuevo seleccionado se vuelvan a evaluar en el Virtual DOM, omitiendo todas las demás tarjetas:
          </p>

          <div class="selected-user-bar mb-3">
            <span>Usuario actualmente seleccionado:</span>
            <strong class="text-cyan font-mono">
              {{ selectedUser ? selectedUser.name + ' (ID: ' + selectedUser.id + ')' : 'Ninguno' }}
            </strong>
          </div>

          <!-- Memoized List Grid -->
          <div class="memo-cards-grid">
            <div 
              v-for="user in memoUsers" 
              :key="user.id"
              v-memo="[user.id === selectedUserId]"
              class="memo-card"
              :class="{ 'memo-card-selected': user.id === selectedUserId }"
              @click="selectedUserId = user.id"
            >
              <div class="memo-avatar">{{ user.avatar }}</div>
              <div class="memo-info">
                <strong>{{ user.name }}</strong>
                <span class="memo-role">{{ user.role }}</span>
              </div>
              <div class="memo-status-tag font-mono">
                {{ user.id === selectedUserId ? 'ACTIVO' : 'MEMO' }}
              </div>
            </div>
          </div>

          <CodeBlock 
            title="Patrón Óptimo de v-memo con v-for"
            :code="memoSnippet"
          />
        </div>
      </div>
    </section>

    <!-- Playground 3: v-pre -->
    <section class="section-block">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <span>Laboratorio 3: Omisión de Compilación con v-pre</span>
          </div>
          <span class="badge badge-purple">Raw Text</span>
        </div>

        <div class="panel-body">
          <p class="text-secondary mb-3">
            La directiva <code>v-pre</code> instruye a Vue a no compilar ni buscar interpolaciones 
            dentro de ese elemento:
          </p>

          <div class="raw-box-demo" v-pre>
            <div class="raw-title">Contenedor con v-pre activo:</div>
            <code>{{ esteTextoNoEsCompiladoPorVue && noCausaError }}</code>
            <p>Las dobles llaves se muestran textualmente en el navegador.</p>
          </div>
        </div>
      </div>
    </section>

    <CalloutCard type="warning" title="Precaución al usar v-memo">
      <code>v-memo</code> solo debe usarse en escenarios de rendimiento comprobados con colecciones grandes. 
      Si olvidas incluir una propiedad dentro del array de dependencias (por ejemplo, si usas <code>[item.id === selected]</code> 
      pero también cambias el <code>item.title</code>), Vue <strong>no</strong> actualizará el título en pantalla porque considerará 
      que el subárbol no ha cambiado.
    </CalloutCard>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'
import CalloutCard from '../components/CalloutCard.vue'

// Lab 1
const mainCounter = ref(1)

// Lab 2
const selectedUserId = ref(2)

const memoUsers = ref([
  { id: 1, name: 'Adriana Silva', role: 'Frontend Architect', avatar: '👩‍💻' },
  { id: 2, name: 'Benjamín Cruz', role: 'UI Engineer', avatar: '👨‍🎨' },
  { id: 3, name: 'Clara Domínguez', role: 'Product Designer', avatar: '🎨' },
  { id: 4, name: 'David Navarro', role: 'Backend Dev', avatar: '⚙️' },
  { id: 5, name: 'Esther Ortiz', role: 'Full Stack', avatar: '🚀' },
  { id: 6, name: 'Fernando Ruiz', role: 'DevSecOps', avatar: '🛡️' }
])

const selectedUser = computed(() => {
  return memoUsers.value.find(u => u.id === selectedUserId.value)
})

// Snippets
const onceSnippet = `<template>
  <!-- Este elemento y sus hijos se renderizan una sola vez -->
  <div v-once class="static-summary">
    <h2>{{ initialTitle }}</h2>
    <p>Fecha de creación: {{ creationDate }}</p>
    <!-- Futuras mutaciones de reactive state NO afectarán este bloque -->
  </div>
</template>`

const memoSnippet = `<template>
  <!-- v-memo condiciona la reconciliación a que cambie la condición especificada -->
  <div 
    v-for="item in hugeList" 
    :key="item.id"
    v-memo="[item.id === selectedId]"
    :class="{ selected: item.id === selectedId }"
    @click="selectedId = item.id"
  >
    <span>{{ item.name }}</span>
  </div>
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

.text-sm { font-size: 0.85rem; }
.text-secondary { color: var(--text-secondary); }
.mt-3 { margin-top: 0.75rem; }
.mt-4 { margin-top: 1.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.font-mono { font-family: var(--font-mono); }

.ideal-for {
  font-size: 0.8rem;
  color: var(--text-muted);
  border-top: 1px solid var(--border-color);
  padding-top: 0.6rem;
}

.ideal-for strong {
  color: var(--text-primary);
}

/* Lab 1 Once */
.counter-controller {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1rem;
  background: var(--bg-app);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.counter-display {
  font-size: 1rem;
  color: var(--text-secondary);
}

.counter-display strong {
  font-size: 1.4rem;
  font-family: var(--font-mono);
}

.test-node-card {
  padding: 1.6rem;
  border-radius: var(--radius-md);
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  text-align: center;
}

.node-frozen {
  border-color: rgba(66, 184, 131, 0.4);
  background: rgba(66, 184, 131, 0.03);
}

.node-badge {
  font-size: 0.82rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
}

.node-val {
  font-size: 2.8rem;
  font-weight: 800;
  font-family: var(--font-mono);
  color: var(--vue-green-light);
  line-height: 1.1;
  margin-bottom: 0.4rem;
}

/* Lab 2 Memo */
.selected-user-bar {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1rem;
  background: var(--bg-app);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
}

.memo-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.memo-card {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 1rem;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.memo-card:hover {
  border-color: var(--accent-cyan);
  background: var(--bg-surface-elevated);
}

.memo-card-selected {
  border-color: var(--accent-cyan);
  background: rgba(6, 182, 212, 0.1);
  box-shadow: 0 0 14px var(--accent-cyan-glow);
}

.memo-avatar {
  font-size: 1.8rem;
}

.memo-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.memo-role {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.memo-status-tag {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-color);
  color: var(--text-muted);
}

.memo-card-selected .memo-status-tag {
  background: var(--accent-cyan);
  color: #061c14;
  border-color: var(--accent-cyan);
}

/* Lab 3 Pre */
.raw-box-demo {
  padding: 1.4rem;
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  border-radius: var(--radius-md);
  font-family: var(--font-mono);
}

.raw-title {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.raw-box-demo code {
  color: var(--accent-amber);
  font-size: 1.05rem;
  display: block;
  margin-bottom: 0.5rem;
}

.raw-box-demo p {
  font-size: 0.82rem;
  color: var(--text-secondary);
}
</style>
