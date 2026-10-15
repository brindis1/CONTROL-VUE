<template>
  <div class="view-container animate-fade">
    <!-- View Header -->
    <div class="view-header">
      <div class="view-badges">
        <span class="badge badge-amber">Contenedor Virtual</span>
        <span class="badge badge-vue">Semántica DOM Limpia</span>
      </div>
      <h1 class="view-title">Estructura &lt;template&gt; y el uso seguro de <code>v-for</code> con <code>v-if</code></h1>
      <p class="view-lead">
        La etiqueta <code>&lt;template&gt;</code> actúa como un contenedor transparente que permite agrupar directivas estructurales 
        sin contaminar el DOM con etiquetas HTML redundantes y resolviendo el problema de precedencia entre directivas.
      </p>
    </div>

    <!-- Technical Analysis Grid -->
    <div class="grid-2">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            <span>¿Qué es &lt;template&gt; en Vue?</span>
          </div>
        </div>
        <div class="panel-body">
          <ul class="concept-list">
            <li>
              <strong>Wrapper Invisible:</strong> El compilador de Vue procesa todas las directivas asignadas al <code>&lt;template&gt;</code> pero <em>no renderiza ninguna etiqueta HTML</em> en el navegador final.
            </li>
            <li>
              <strong>Preservación Semántica:</strong> Esencial en estructuras HTML que no permiten <code>&lt;div&gt;</code> intermedios (como <code>&lt;tr&gt;</code> dentro de <code>&lt;table&gt;</code>, o <code>&lt;dt&gt;/&lt;dd&gt;</code> dentro de <code>&lt;dl&gt;</code>).
            </li>
            <li>
              <strong>Agrupación Multielemento:</strong> Permite condicionar un bloque con 5 elementos hermanos utilizando un solo <code>v-if</code> sin alterar el layout Flexbox o Grid.
            </li>
          </ul>
        </div>
      </div>

      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span>Precedencia: v-if vs v-for en Vue 3</span>
          </div>
        </div>
        <div class="panel-body">
          <p class="text-secondary text-sm">
            En <strong>Vue 3</strong>, <code>v-if</code> tiene <em>mayor prioridad</em> que <code>v-for</code>. Si los colocas en la misma etiqueta:
          </p>
          <div class="bad-code-card mt-2">
            <code>&lt;li v-for="user in users" v-if="user.isActive"&gt; &lt;!-- ❌ ERROR --&gt;</code>
          </div>
          <p class="text-secondary text-sm mt-2">
            La condición <code>v-if</code> se ejecuta <strong>antes</strong> de que el bucle cree la variable <code>user</code>, lanzando un error <em>ReferenceError: user is not defined</em>.
          </p>
          <div class="solution-pills mt-3">
            <span class="badge badge-vue">Solución 1: Propiedad Computada (Recomendada)</span>
            <span class="badge badge-amber">Solución 2: &lt;template v-for&gt; con v-if interno</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Playground 1: Renderizado de Tabla con Filas Gemelas -->
    <section class="section-block mt-4">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
            <span>Laboratorio 1: Tabla Semántica con Filas Expansibles usando &lt;template v-for&gt;</span>
          </div>
          <span class="badge badge-amber">Semántica Perfecta</span>
        </div>

        <div class="panel-body">
          <p class="mb-3 text-secondary">
            En una tabla HTML, un elemento <code>&lt;div&gt;</code> dentro de un <code>&lt;tbody&gt;</code> es sintácticamente inválido. 
            Con <code>&lt;template v-for&gt;</code> podemos renderizar la fila principal y su fila de detalles condicional (<code>v-if</code>) sin romper el marcado:
          </p>

          <div class="table-responsive">
            <table class="semantic-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Colaborador</th>
                  <th>Cargo</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <!-- Template v-for iterating without any div wrapper -->
                <template v-for="emp in employees" :key="emp.id">
                  <!-- Main row -->
                  <tr class="main-row" :class="{ 'row-expanded': emp.expanded }">
                    <td class="font-mono">#{{ emp.id }}</td>
                    <td>
                      <div class="user-cell">
                        <span class="avatar-circle">{{ emp.name.charAt(0) }}</span>
                        <div>
                          <strong>{{ emp.name }}</strong>
                          <div class="user-email">{{ emp.email }}</div>
                        </div>
                      </div>
                    </td>
                    <td>{{ emp.role }}</td>
                    <td>
                      <span class="badge" :class="emp.active ? 'badge-vue' : 'badge-rose'">
                        {{ emp.active ? 'Activo' : 'Inactivo' }}
                      </span>
                    </td>
                    <td>
                      <button 
                        type="button" 
                        class="btn btn-sm btn-secondary"
                        @click="emp.expanded = !emp.expanded"
                      >
                        {{ emp.expanded ? '▲ Ocultar Ficha' : '▼ Ver Ficha' }}
                      </button>
                    </td>
                  </tr>

                  <!-- Conditional Expandable Details Row via <template> -->
                  <tr v-if="emp.expanded" class="details-row">
                    <td colspan="5">
                      <div class="details-box animate-fade">
                        <div class="details-grid">
                          <div>
                            <span class="detail-label">Departamento:</span>
                            <span class="detail-value">{{ emp.dept }}</span>
                          </div>
                          <div>
                            <span class="detail-label">Fecha de Ingreso:</span>
                            <span class="detail-value">{{ emp.joined }}</span>
                          </div>
                          <div>
                            <span class="detail-label">Proyectos Asignados:</span>
                            <span class="detail-value">{{ emp.projects.join(', ') }}</span>
                          </div>
                        </div>
                        <div class="details-note">
                          💡 Esta fila <code>&lt;tr&gt;</code> se monta con <code>v-if</code> dentro del <code>&lt;template v-for&gt;</code>. No existe ningún <code>&lt;div&gt;</code> envolvente en el <code>&lt;tbody&gt;</code>.
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>

          <CodeBlock 
            title="Sintaxis del Marcado con <template v-for>"
            :code="tableCodeSnippet"
          />
        </div>
      </div>
    </section>

    <!-- Playground 2: Solución de Filtrado Seguro -->
    <section class="section-block">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <span>Laboratorio 2: El Patrón Recomendado: Filtrado con Propiedad Computada</span>
          </div>
          <span class="badge badge-vue">Patrón Oficial</span>
        </div>

        <div class="panel-body">
          <div class="filter-controls-bar mb-3">
            <label class="toggle-switch">
              <input type="checkbox" v-model="onlyActiveFilter">
              <span class="switch-track">
                <span class="switch-thumb"></span>
              </span>
              <span>Mostrar únicamente colaboradores con estado <strong>Activo</strong></span>
            </label>
          </div>

          <!-- Cards using computed filtered list -->
          <div class="filtered-cards-grid">
            <div 
              v-for="person in activeEmployees" 
              :key="person.id" 
              class="person-mini-card animate-fade"
            >
              <div class="person-header">
                <strong>{{ person.name }}</strong>
                <span class="badge" :class="person.active ? 'badge-vue' : 'badge-rose'">
                  {{ person.active ? 'Activo' : 'Inactivo' }}
                </span>
              </div>
              <div class="person-meta">{{ person.role }} &bull; {{ person.dept }}</div>
            </div>
          </div>

          <CodeBlock 
            title="Implementación con computed() vs <template v-for>"
            :code="computedFilterSnippet"
          />
        </div>
      </div>
    </section>

    <!-- Style Guide Official Quote -->
    <CalloutCard type="rule" title="Prioridad A (Essential) de la Guía de Estilo Oficial de Vue">
      <strong>"Nunca uses v-if en el mismo elemento que v-for."</strong><br />
      Cuando Vue procesa directivas, <code>v-if</code> tiene una prioridad más alta que <code>v-for</code>. 
      Filtrar una lista con una propiedad computada no solo es seguro, sino que optimiza drásticamente el rendimiento, 
      ya que el filtrado se memoiza y solo se recalcula si la lista original sufre modificaciones.
    </CalloutCard>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'
import CalloutCard from '../components/CalloutCard.vue'

const employees = ref([
  { id: 1, name: 'Elena Morales', email: 'elena@empresa.com', role: 'Tech Lead', dept: 'Arquitectura', joined: '15/03/2021', active: true, expanded: false, projects: ['Gateway API', 'Vue SPA'] },
  { id: 2, name: 'Carlos Mendoza', email: 'carlos@empresa.com', role: 'Senior Frontend', dept: 'UI/UX', joined: '02/08/2022', active: true, expanded: false, projects: ['Design System', 'Microfrontends'] },
  { id: 3, name: 'Laura Vega', email: 'laura@empresa.com', role: 'DevOps Engineer', dept: 'Infraestructura', joined: '19/11/2020', active: false, expanded: false, projects: ['Kubernetes CI/CD'] },
  { id: 4, name: 'Martín Romero', email: 'martin@empresa.com', role: 'QA Automation', dept: 'Calidad', joined: '10/01/2023', active: true, expanded: false, projects: ['Cypress E2E', 'Vitest Suite'] }
])

const onlyActiveFilter = ref(false)

const activeEmployees = computed(() => {
  if (onlyActiveFilter.value) {
    return employees.value.filter(e => e.active)
  }
  return employees.value
})

const tableCodeSnippet = `<template>
  <table>
    <tbody>
      <!-- El <template> itera sin inyectar ningún nodo HTML en el DOM -->
      <template v-for="emp in employees" :key="emp.id">
        <!-- Fila principal -->
        <tr>
          <td>{{ emp.name }}</td>
          <td><button @click="emp.expanded = !emp.expanded">Ver</button></td>
        </tr>

        <!-- Fila secundaria condicional independiente -->
        <tr v-if="emp.expanded" class="details-row">
          <td colspan="5">Detalles del empleado: {{ emp.dept }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>`

const computedFilterSnippet = `<script setup>
import { ref, computed } from 'vue'

const employees = ref([...])
const onlyActive = ref(true)

// MEJOR PRÁCTICA: Filtrar en computed property, nunca con v-if en el v-for
const filteredEmployees = computed(() => {
  if (onlyActive.value) {
    return employees.value.filter(emp => emp.active)
  }
  return employees.value
})
<\/script>

<template>
  <!-- La plantilla es limpia, predecible y altamente eficiente -->
  <div v-for="emp in filteredEmployees" :key="emp.id">
    {{ emp.name }}
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

.bad-code-card {
  padding: 0.65rem 0.85rem;
  background: rgba(244, 63, 94, 0.1);
  border: 1px solid rgba(244, 63, 94, 0.3);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: #fca5a5;
}

.solution-pills {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.text-sm { font-size: 0.85rem; }
.text-secondary { color: var(--text-secondary); }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 0.75rem; }
.mt-4 { margin-top: 1.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.font-mono { font-family: var(--font-mono); }

/* Semantic Table */
.semantic-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.9rem;
}

.semantic-table th {
  padding: 0.85rem 1rem;
  background: var(--bg-surface-elevated);
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
  font-weight: 600;
}

.semantic-table td {
  padding: 0.9rem 1rem;
  border-bottom: 1px solid var(--border-color);
  vertical-align: middle;
}

.main-row:hover td {
  background: rgba(255, 255, 255, 0.02);
}

.row-expanded td {
  background: rgba(245, 158, 11, 0.03);
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar-circle {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-color);
  color: var(--vue-green-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.user-email {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.details-row td {
  padding: 0;
  background: var(--bg-app);
}

.details-box {
  padding: 1.25rem 1.6rem;
  background: rgba(0, 0, 0, 0.25);
  border-left: 3px solid var(--accent-amber);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;
  margin-bottom: 0.8rem;
}

@media (max-width: 768px) {
  .details-grid {
    grid-template-columns: 1fr;
  }
}

.detail-label {
  display: block;
  font-size: 0.76rem;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 0.2rem;
}

.detail-value {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text-primary);
}

.details-note {
  font-size: 0.82rem;
  color: var(--accent-amber);
  margin-top: 0.6rem;
}

/* Filter bar & Mini cards */
.filter-controls-bar {
  padding: 0.85rem 1.2rem;
  background: var(--bg-app);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.filtered-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  margin-bottom: 1.4rem;
}

.person-mini-card {
  padding: 1rem;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.person-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}

.person-meta {
  font-size: 0.82rem;
  color: var(--text-secondary);
}
</style>
