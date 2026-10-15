<template>
  <div class="home-view animate-fade">
    <!-- Clean, Simple Hero Section -->
    <section class="hero-card glass-panel">
      <div class="hero-top">
        <span class="badge badge-vue">Vue 3 + Vue Router</span>
        <span class="badge">SPA Educativa</span>
      </div>
      <h1 class="hero-title">Estructuras de Control en Vue 3</h1>
      <p class="hero-description">
        Esta aplicación de una sola página (SPA) presenta de manera clara y directa el funcionamiento interno, 
        la sintaxis y las implicaciones de rendimiento de cada estructura de control en Vue 3. 
        Utiliza el menú lateral o las tarjetas a continuación para acceder a cada laboratorio interactivo.
      </p>

      <div class="hero-summary-row">
        <div class="summary-item">
          <strong>6 Módulos</strong>
          <span>Directivas analizadas</span>
        </div>
        <div class="summary-item">
          <strong>Laboratorios</strong>
          <span>Pruebas interactivas</span>
        </div>
        <div class="summary-item">
          <strong>DOM Real</strong>
          <span>Inspección de nodos</span>
        </div>
      </div>
    </section>

    <!-- Cards Grid -->
    <section class="section-block">
      <div class="section-header">
        <h2 class="section-title">Directivas Disponibles</h2>
        <p class="section-subtitle">Selecciona una estructura para ver su explicación y playground</p>
      </div>

      <div class="cards-grid">
        <router-link 
          v-for="card in cards" 
          :key="card.path" 
          :to="card.path" 
          class="control-card glass-panel"
        >
          <div class="card-top">
            <h3 class="card-title">{{ card.title }}</h3>
            <span class="badge">{{ card.badgeText }}</span>
          </div>

          <p class="card-desc">{{ card.description }}</p>

          <div class="card-features">
            <div v-for="(feat, idx) in card.features" :key="idx" class="feature-item">
              <span class="feature-bullet">&bull;</span>
              <span>{{ feat }}</span>
            </div>
          </div>

          <div class="card-link">
            <span>Ver módulo</span>
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Comparative Table -->
    <section class="section-block">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <span>Resumen Comparativo en el DOM</span>
          </div>
        </div>

        <div class="panel-body table-responsive">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Estructura</th>
                <th>Mecanismo en el Navegador</th>
                <th>Coste Inicial</th>
                <th>Coste de Alternancia</th>
                <th>Preserva Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>v-if / v-else</strong></td>
                <td>Monta / destruye el elemento en el DOM</td>
                <td>Bajo (si es false)</td>
                <td>Alto (recrea VNodes)</td>
                <td>No</td>
              </tr>
              <tr>
                <td><strong>v-show</strong></td>
                <td>Aplica CSS <code>display: none</code></td>
                <td>Alto (siempre monta)</td>
                <td>Muy bajo (solo estilo)</td>
                <td>Sí</td>
              </tr>
              <tr>
                <td><strong>v-for (:key)</strong></td>
                <td>Reconciliación de colecciones</td>
                <td>Proporcional a elementos</td>
                <td>Óptimo con clave única</td>
                <td>Depende de :key</td>
              </tr>
              <tr>
                <td><strong>&lt;template&gt;</strong></td>
                <td>Contenedor invisible del compilador</td>
                <td>Cero (no crea tag HTML)</td>
                <td>Sin coste</td>
                <td>Heredado</td>
              </tr>
              <tr>
                <td><strong>&lt;component :is&gt;</strong></td>
                <td>Alternancia polimórfica de componentes</td>
                <td>Según componente</td>
                <td>Bajo con KeepAlive</td>
                <td>Configurable</td>
              </tr>
              <tr>
                <td><strong>v-memo / v-once</strong></td>
                <td>Omisión de parcheo en Virtual DOM</td>
                <td>Normal</td>
                <td>Cero (omite diff)</td>
                <td>Sí</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Simple Callout -->
    <CalloutCard type="info" title="Cómo funcionan las directivas de control">
      En Vue 3, las directivas de control se compilan a funciones de renderizado optimizadas. 
      Al modificar un valor reactivo, Vue ejecuta el algoritmo de diffing y parcheo únicamente en los nodos afectados.
    </CalloutCard>
  </div>
</template>

<script setup>
import CalloutCard from '../components/CalloutCard.vue'

const cards = [
  {
    path: '/v-if',
    title: 'v-if, v-else-if y v-else',
    description: 'Renderizado condicional real. Agrega o elimina elementos del árbol DOM según una expresión.',
    badgeText: 'Condicional',
    features: [
      'Montaje y desmontaje físico',
      'Ejecuta onMounted / onUnmounted',
      'No procesa nada si es falso al inicio'
    ]
  },
  {
    path: '/v-show',
    title: 'v-show',
    description: 'Visibilidad mediante CSS (display: none). El elemento permanece montado en el DOM.',
    badgeText: 'Visibilidad CSS',
    features: [
      'Conserva valores de inputs y estado',
      'Alternancia rápida sin re-crear nodos',
      'Siempre se monta en la carga inicial'
    ]
  },
  {
    path: '/v-for',
    title: 'v-for y el atributo :key',
    description: 'Renderizado de colecciones: arrays, propiedades de objetos y rangos numéricos.',
    badgeText: 'Iteración',
    features: [
      'Requiere un :key único e inmutable',
      'Evita errores de estado con :key=index',
      'Soporta arrays, objetos y números'
    ]
  },
  {
    path: '/template-control',
    title: '<template> & v-for con v-if',
    description: 'Agrupamiento limpio sin etiquetas HTML adicionales y solución a la precedencia de directivas.',
    badgeText: 'Estructura',
    features: [
      'No genera etiquetas extra en el DOM',
      'Evita mezclar v-for y v-if juntos',
      'Filtrado limpio con computed()'
    ]
  },
  {
    path: '/componentes-dinamicos',
    title: '<component :is="...">',
    description: 'Renderizado dinámico de componentes con soporte para caché mediante <KeepAlive>.',
    badgeText: 'Dinámico',
    features: [
      'Alternancia por variable reactiva',
      'Persistencia de estado con KeepAlive',
      'Transiciones de entrada y salida'
    ]
  },
  {
    path: '/optimizacion',
    title: 'v-memo, v-once & v-pre',
    description: 'Control de reactividad y optimización fina de ciclos de renderizado en el Virtual DOM.',
    badgeText: 'Optimización',
    features: [
      'v-once: Contenido estático sin updates',
      'v-memo: Salta el diffing si deps no cambian',
      'v-pre: Omite la compilación'
    ]
  }
]
</script>

<style scoped>
.hero-card {
  padding: 1.75rem;
  margin-bottom: 2rem;
}

.hero-top {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.hero-title {
  font-size: 1.85rem;
  margin-bottom: 0.5rem;
}

.hero-description {
  font-size: 0.95rem;
  max-width: 780px;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.hero-summary-row {
  display: flex;
  gap: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.summary-item {
  display: flex;
  flex-direction: column;
}

.summary-item strong {
  font-size: 1.05rem;
  color: var(--text-primary);
}

.summary-item span {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* Sections */
.section-block {
  margin-bottom: 2rem;
}

.section-header {
  margin-bottom: 1rem;
}

.section-title {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.section-subtitle {
  font-size: 0.88rem;
  color: var(--text-muted);
}

/* Cards Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.1rem;
}

@media (max-width: 950px) {
  .cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}

.control-card {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  border-radius: var(--radius-md);
}

.control-card:hover {
  text-decoration: none;
  border-color: var(--border-color-hover);
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}

.card-title {
  font-size: 1.02rem;
  font-weight: 600;
  color: var(--text-primary);
}

.card-desc {
  font-size: 0.86rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 1rem;
  flex: 1;
}

.card-features {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-color);
}

.feature-item {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.feature-bullet {
  color: var(--vue-green);
}

.card-link {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--vue-green);
  font-size: 0.82rem;
  font-weight: 500;
}

/* Table */
.table-responsive {
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.88rem;
}

.comparison-table th {
  padding: 0.75rem 0.9rem;
  background: var(--bg-surface-elevated);
  color: var(--text-primary);
  font-weight: 600;
  border-bottom: 1px solid var(--border-color);
}

.comparison-table td {
  padding: 0.75rem 0.9rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-secondary);
}

.comparison-table code {
  background: var(--bg-app);
  padding: 0.15rem 0.35rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.8rem;
}
</style>
