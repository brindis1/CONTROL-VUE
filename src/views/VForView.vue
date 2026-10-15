<template>
  <div class="view-container animate-fade">
    <!-- View Header -->
    <div class="view-header">
      <div class="view-badges">
        <span class="badge badge-purple">Renderizado de Listas</span>
        <span class="badge badge-vue">Reconciliación Virtual DOM</span>
      </div>
      <h1 class="view-title">Estructura de Iteración: <code>v-for</code> y el atributo <code>:key</code></h1>
      <p class="view-lead">
        La directiva <code>v-for</code> mapea y renderiza colecciones de datos reactivos (arrays, objetos clave-valor y rangos enteros) 
        apoyándose en el algoritmo de parcheo con el atributo fundamental <code>:key</code>.
      </p>
    </div>

    <!-- Technical Analysis Grid -->
    <div class="grid-2">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
              <path d="m17 2 4 4-4 4"></path>
              <path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
              <path d="m7 22-4-4 4-4"></path>
              <path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
            </svg>
            <span>Variantes de Sintaxis en v-for</span>
          </div>
        </div>
        <div class="panel-body">
          <ul class="concept-list">
            <li>
              <strong>Arrays:</strong> <code>v-for="(item, index) in lista"</code>. Admite tanto la palabra clave <code>in</code> como <code>of</code> como delimitador.
            </li>
            <li>
              <strong>Objetos clave-valor:</strong> <code>v-for="(valor, clave, index) in objeto"</code>. El orden está basado en <code>Object.keys()</code> del motor JavaScript.
            </li>
            <li>
              <strong>Rangos numéricos:</strong> <code>v-for="n in 10"</code>. Comienza en <code>1</code> y termina en <code>10</code> inclusive.
            </li>
          </ul>
        </div>
      </div>

      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>El Rol Crucial de :key</span>
          </div>
        </div>
        <div class="panel-body">
          <p>
            El atributo especial <code>:key</code> proporciona una pista de identidad única al motor de diffing de Vue:
          </p>
          <ul class="concept-list mt-2">
            <li>
              <strong>Sin key:</strong> Vue utiliza una estrategia "in-place patch" mutando nodos existentes, lo cual es rápido pero rompe el estado interno de inputs e hijos.
            </li>
            <li>
              <strong>Con key única (ID):</strong> Vue puede rastrear el movimiento de cada nodo, reordenarlo, insertarlo o destruirlo de manera exacta y predecible.
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Playground 1: Gestor de Colección Reactiva -->
    <section class="section-block mt-4">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
            <span>Laboratorio 1: Manipulación de Colección y Reconciliación Reactiva</span>
          </div>
          <span class="badge badge-purple">Laboratorio Activo</span>
        </div>

        <div class="panel-body">
          <!-- Operations toolbar -->
          <div class="list-toolbar">
            <div class="search-input-box">
              <input 
                v-model="searchQuery" 
                type="text" 
                class="form-input" 
                placeholder="Buscar tecnología..."
              />
            </div>

            <div class="category-filters">
              <button 
                v-for="cat in categories" 
                :key="cat"
                type="button" 
                class="btn btn-sm"
                :class="selectedCat === cat ? 'btn-primary' : 'btn-secondary'"
                @click="selectedCat = cat"
              >
                {{ cat }}
              </button>
            </div>

            <div class="actions-group">
              <button type="button" class="btn btn-sm btn-secondary" @click="reverseList">
                Invertir Orden
              </button>
              <button type="button" class="btn btn-sm btn-primary" @click="addNewItem">
                Añadir Ítem
              </button>
            </div>
          </div>

          <!-- The Rendered List -->
          <div class="rendered-items-grid mt-3">
            <div 
              v-for="(tech, index) in filteredItems" 
              :key="tech.id"
              class="tech-card animate-fade"
            >
              <div class="tech-card-header">
                <span class="tech-index">#{{ index + 1 }}</span>
                <span class="badge" :class="tech.badgeClass">{{ tech.category }}</span>
                <button 
                  type="button" 
                  class="delete-item-btn" 
                  @click="removeItem(tech.id)" 
                  title="Eliminar elemento"
                >
                  ✕
                </button>
              </div>

              <div class="tech-card-body">
                <div class="tech-name">{{ tech.name }}</div>
                <div class="tech-desc">{{ tech.desc }}</div>
              </div>

              <div class="tech-card-footer">
                <span class="key-tag">:key="tech.id: {{ tech.id }}"</span>
                <span class="stars-tag">⭐ {{ tech.stars }}k</span>
              </div>
            </div>
          </div>

          <div v-if="filteredItems.length === 0" class="empty-list-notice">
            No se encontraron elementos con el filtro "{{ searchQuery }}".
          </div>

          <!-- Live Code -->
          <CodeBlock 
            title="Sintaxis del Bucle con :key"
            :code="listSnippet"
          />
        </div>
      </div>
    </section>

    <!-- Playground 2: El Peligro de :key="index" vs :key="item.id" -->
    <section class="section-block">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
              <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>Laboratorio 2: Demostración Visual del "Bug del :key=index"</span>
          </div>
          <span class="badge badge-rose">Concepto Avanzado</span>
        </div>

        <div class="panel-body">
          <p class="mb-3">
            ¿Por qué los linters y la documentación oficial de Vue insisten en <strong>NO usar el índice</strong> como clave?
            Observa este experimento: cada fila tiene un campo de entrada local que el usuario rellenó libremente.
          </p>

          <div class="bug-controls-box mb-3">
            <button type="button" class="btn btn-danger btn-sm" @click="deleteFirstElements">
              Eliminar Primer Elemento
            </button>
            <button type="button" class="btn btn-secondary btn-sm" @click="resetBugDemo">
              Restaurar Listas
            </button>
          </div>

          <div class="grid-2">
            <!-- Incorrect list: :key="index" -->
            <div class="bug-column bug-wrong">
              <div class="bug-col-header">
                <span class="badge badge-rose">:key="index"</span>
                <small class="text-rose">El estado del input se desincroniza</small>
              </div>

              <div class="bug-items-stack">
                <div 
                  v-for="(item, index) in badList" 
                  :key="index" 
                  class="bug-item-card"
                >
                  <div class="bug-item-title">
                    <strong>{{ item.name }}</strong>
                    <span class="key-mini">index: {{ index }}</span>
                  </div>
                  <div class="bug-input-wrap">
                    <label class="bug-input-label">Nota temporal (escribe aquí):</label>
                    <input 
                      type="text" 
                      class="form-input form-input-sm" 
                      :defaultValue="item.note"
                      placeholder="Escribe algo aquí..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Correct list: :key="item.id" -->
            <div class="bug-column bug-correct">
              <div class="bug-col-header">
                <span class="badge badge-vue">:key="item.id"</span>
                <small class="text-vue">El estado viaja fielmente con su ítem</small>
              </div>

              <div class="bug-items-stack">
                <div 
                  v-for="item in goodList" 
                  :key="item.id" 
                  class="bug-item-card"
                >
                  <div class="bug-item-title">
                    <strong>{{ item.name }}</strong>
                    <span class="key-mini">id: {{ item.id }}</span>
                  </div>
                  <div class="bug-input-wrap">
                    <label class="bug-input-label">Nota temporal (escribe aquí):</label>
                    <input 
                      type="text" 
                      class="form-input form-input-sm" 
                      :defaultValue="item.note"
                      placeholder="Escribe algo aquí..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Playground 3: Iteración de Objetos y Rangos Numéricos -->
    <section class="section-block">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span>Laboratorio 3: Iteración sobre Objetos y Rangos Numéricos (Paginación)</span>
          </div>
          <span class="badge badge-cyan">Sintaxis Polivalente</span>
        </div>

        <div class="panel-body">
          <div class="grid-2">
            <!-- Object iteration -->
            <div class="sub-card">
              <h4>1. Iterando Propiedades de un Objeto</h4>
              <p class="text-sm text-secondary mb-3">
                Sintaxis: <code>(valor, clave, índice) in objetoConfig</code>
              </p>

              <div class="object-grid">
                <div 
                  v-for="(val, key, idx) in appConfig" 
                  :key="key" 
                  class="obj-entry"
                >
                  <span class="obj-idx">#{{ idx }}</span>
                  <span class="obj-key">{{ key }}:</span>
                  <span class="obj-val">"{{ val }}"</span>
                </div>
              </div>
            </div>

            <!-- Numeric range iteration -->
            <div class="sub-card">
              <h4>2. Iterando un Rango Numérico (Paginación)</h4>
              <p class="text-sm text-secondary mb-3">
                Sintaxis: <code>v-for="page in totalPages"</code> (Genera botones 1 a 6)
              </p>

              <div class="pagination-demo">
                <div class="pagination-buttons">
                  <button 
                    v-for="page in 6" 
                    :key="page"
                    type="button" 
                    class="page-btn" 
                    :class="{ 'page-active': currentPage === page }"
                    @click="currentPage = page"
                  >
                    {{ page }}
                  </button>
                </div>
                <div class="page-status mt-3">
                  Página seleccionada actualmente: <strong>Página {{ currentPage }} de 6</strong>
                </div>
              </div>
            </div>
          </div>

          <CodeBlock 
            title="Sintaxis de Objeto y Rango"
            :code="objectRangeSnippet"
          />
        </div>
      </div>
    </section>

    <!-- Style Guide Callout -->
    <CalloutCard type="rule" title="Regla de la Guía de Estilos de Vue: :key siempre obligatoria">
      En Vue 3, es mandatorio asignar siempre un <code>:key</code> único con tipos primitivos (número o cadena) 
      a cada elemento generado por un <code>v-for</code>. Evita pasar objetos enteros como key.
    </CalloutCard>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'
import CalloutCard from '../components/CalloutCard.vue'

// Playground 1 data
const categories = ['Todos', 'Frontend', 'Build Tools', 'State']
const selectedCat = ref('Todos')
const searchQuery = ref('')

const items = ref([
  { id: 101, name: 'Vue.js 3', category: 'Frontend', stars: 210, badgeClass: 'badge-vue', desc: 'Framework progresivo con Composition API reactiva y sistema SFC.' },
  { id: 102, name: 'Vite', category: 'Build Tools', stars: 68, badgeClass: 'badge-purple', desc: 'Servidor de desarrollo ultrarrápido basado en ESM nativo y Rollup.' },
  { id: 103, name: 'Pinia', category: 'State', stars: 15, badgeClass: 'badge-amber', desc: 'Store ligero y type-safe oficial para Vue con soporte de devtools.' },
  { id: 104, name: 'Vue Router', category: 'Frontend', stars: 30, badgeClass: 'badge-cyan', desc: 'Enrutador oficial con navegación SPA, rutas anidadas y guardas.' },
  { id: 105, name: 'Vitest', category: 'Build Tools', stars: 12, badgeClass: 'badge-vue', desc: 'Framework de pruebas unitarias nativo para Vite, ultra veloz.' }
])

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchesCat = selectedCat.value === 'Todos' || item.category === selectedCat.value
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCat && matchesQuery
  })
})

const reverseList = () => {
  items.value.reverse()
}

let nextId = 106
const addNewItem = () => {
  items.value.unshift({
    id: nextId++,
    name: `Nueva Lib #${nextId}`,
    category: 'Frontend',
    stars: Math.floor(Math.random() * 50) + 1,
    badgeClass: 'badge-cyan',
    desc: 'Librería agregada dinámicamente al inicio del array.'
  })
}

const removeItem = (id) => {
  items.value = items.value.filter(item => item.id !== id)
}

// Playground 2 data (:key=index vs :key=id)
const originalList = [
  { id: 1, name: 'Tarea A: Revisar servidor', note: 'Nota escrita para la Tarea A' },
  { id: 2, name: 'Tarea B: Actualizar dependencias', note: 'Nota escrita para la Tarea B' },
  { id: 3, name: 'Tarea C: Diseñar landing page', note: 'Nota escrita para la Tarea C' }
]

const badList = ref(JSON.parse(JSON.stringify(originalList)))
const goodList = ref(JSON.parse(JSON.stringify(originalList)))

const deleteFirstElements = () => {
  if (badList.value.length > 0) badList.value.shift()
  if (goodList.value.length > 0) goodList.value.shift()
}

const resetBugDemo = () => {
  badList.value = JSON.parse(JSON.stringify(originalList))
  goodList.value = JSON.parse(JSON.stringify(originalList))
}

// Playground 3 data
const appConfig = ref({
  appName: 'ControlStructuresSPA',
  ambiente: 'Producción',
  version: '3.5.0',
  modoDebug: 'false',
  servidor: 'Vite-Edge-Proxy'
})

const currentPage = ref(1)

// Code Snippets
const listSnippet = `<template>
  <!-- Uso óptimo con :key único e inmutable -->
  <div 
    v-for="(tech, index) in filteredItems" 
    :key="tech.id"
    class="tech-card"
  >
    <span>#{{ index + 1 }} - {{ tech.name }}</span>
    <button @click="removeItem(tech.id)">Eliminar</button>
  </div>
</template>`

const objectRangeSnippet = `<template>
  <!-- 1. Iterar sobre un objeto -->
  <div v-for="(valor, clave, index) in config" :key="clave">
    #{{ index }}: {{ clave }} => {{ valor }}
  </div>

  <!-- 2. Rango numérico (1 a 10) -->
  <button 
    v-for="page in 6" 
    :key="page" 
    :class="{ active: currentPage === page }"
    @click="currentPage = page"
  >
    Página {{ page }}
  </button>
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

.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 0.75rem; }
.mt-4 { margin-top: 1.5rem; }
.mb-3 { margin-bottom: 0.75rem; }

/* List Toolbar */
.list-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem;
  padding: 1.1rem;
  background: var(--bg-app);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.search-input-box {
  flex: 1;
  min-width: 200px;
}

.category-filters {
  display: flex;
  gap: 0.4rem;
}

.actions-group {
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
}

/* Tech Cards Grid */
.rendered-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.tech-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.1rem;
  display: flex;
  flex-direction: column;
  transition: transform var(--transition-fast), border-color var(--transition-fast);
}

.tech-card:hover {
  border-color: var(--vue-green);
  transform: translateY(-2px);
}

.tech-card-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.7rem;
}

.tech-index {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-muted);
}

.delete-item-btn {
  margin-left: auto;
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
}

.delete-item-btn:hover {
  background: rgba(244, 63, 94, 0.15);
  color: var(--accent-rose);
}

.tech-name {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.tech-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 1rem;
  flex: 1;
}

.tech-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.7rem;
  border-top: 1px solid var(--border-subtle);
  font-size: 0.78rem;
}

.key-tag {
  font-family: var(--font-mono);
  color: var(--accent-purple);
}

.stars-tag {
  color: var(--accent-amber);
  font-weight: 600;
}

.empty-list-notice {
  text-align: center;
  padding: 2.5rem;
  color: var(--text-muted);
  font-style: italic;
}

/* Bug Demo */
.bug-controls-box {
  display: flex;
  gap: 0.8rem;
}

.bug-column {
  background: var(--bg-app);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.2rem;
}

.bug-wrong { border-top: 4px solid var(--accent-rose); }
.bug-correct { border-top: 4px solid var(--vue-green); }

.bug-col-header {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 1rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--border-color);
}

.bug-items-stack {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.bug-item-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 0.8rem;
}

.bug-item-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.key-mini {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.bug-input-label {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 0.25rem;
}

.form-input-sm {
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
}

/* Sub cards for Object & Numeric */
.sub-card {
  background: var(--bg-app);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.25rem;
}

.object-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.obj-entry {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 0.6rem;
  background: var(--bg-surface);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.82rem;
}

.obj-idx { color: var(--text-muted); }
.obj-key { color: var(--accent-cyan); font-weight: 600; }
.obj-val { color: var(--vue-green-light); }

.pagination-buttons {
  display: flex;
  gap: 0.4rem;
}

.page-btn {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background: var(--bg-surface);
  color: var(--text-primary);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.page-btn:hover {
  border-color: var(--vue-green);
  color: var(--vue-green);
}

.page-btn.page-active {
  background: var(--vue-green);
  color: #061c14;
  border-color: var(--vue-green);
  box-shadow: 0 0 10px var(--vue-green-glow);
}

.page-status {
  font-size: 0.88rem;
  color: var(--text-secondary);
}

.page-status strong {
  color: var(--text-primary);
}
</style>
