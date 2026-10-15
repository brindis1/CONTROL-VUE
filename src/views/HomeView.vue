<template>
  <div class="home-view animate-fade">
    <!-- Hero Section -->
    <section class="hero-card glass-panel">
      <div class="hero-badge-wrap">
        <span class="badge badge-vue">Arquitectura Vue 3 + Vue Router</span>
        <span class="badge badge-cyan">Composition API</span>
      </div>
      <h1 class="hero-title">
        Estructuras de Control en <span class="text-gradient">Vue.js 3</span>
      </h1>
      <p class="hero-description">
        Bienvenido a la guía visual e interactiva de estructuras de control y directivas fundamentales en Vue 3. 
        Cada ruta de esta Single Page Application (SPA) analiza en profundidad una estructura, desglosando su funcionamiento interno, 
        su impacto en el Virtual DOM, sus implicaciones de rendimiento y ejemplos prácticos en vivo.
      </p>

      <div class="hero-metrics">
        <div class="metric-pill">
          <div class="metric-number">6</div>
          <div class="metric-label">Módulos Especializados</div>
        </div>
        <div class="metric-pill">
          <div class="metric-number">12+</div>
          <div class="metric-label">Playgrounds Interactivos</div>
        </div>
        <div class="metric-pill">
          <div class="metric-number">DOM</div>
          <div class="metric-label">Inspección en Tiempo Real</div>
        </div>
        <div class="metric-pill">
          <div class="metric-number">100%</div>
          <div class="metric-label">Vue 3 Script Setup</div>
        </div>
      </div>
    </section>

    <!-- Visual Map of Control Directives -->
    <section class="section-block">
      <div class="section-header">
        <h2 class="section-title">Directivas y Estructuras Disponibles</h2>
        <p class="section-subtitle">Selecciona cualquiera de las rutas para explorar su documentación y laboratorio interactivo</p>
      </div>

      <div class="cards-grid">
        <router-link 
          v-for="card in cards" 
          :key="card.path" 
          :to="card.path" 
          class="control-card glass-panel"
        >
          <div class="card-top">
            <div class="card-icon" :class="card.colorClass">
              <!-- Icon Dynamic -->
              <span v-html="card.iconSvg"></span>
            </div>
            <span class="badge" :class="card.badgeClass">{{ card.badgeText }}</span>
          </div>

          <h3 class="card-title">{{ card.title }}</h3>
          <p class="card-desc">{{ card.description }}</p>

          <div class="card-features">
            <div v-for="(feat, idx) in card.features" :key="idx" class="feature-item">
              <span class="feature-check">✓</span>
              <span>{{ feat }}</span>
            </div>
          </div>

          <div class="card-action">
            <span>Explorar estructura</span>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Comparative Matrix Table -->
    <section class="section-block">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
            <span>Matriz Comparativa de Comportamiento en el DOM</span>
          </div>
          <span class="badge badge-vue">Referencia Rápida</span>
        </div>

        <div class="panel-body table-responsive">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Estructura / Directiva</th>
                <th>Mecanismo Interno</th>
                <th>Coste Inicial</th>
                <th>Coste Alternancia</th>
                <th>¿Destruye el Estado?</th>
                <th>Caso Ideal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong class="text-vue">v-if / v-else</strong></td>
                <td>Monta o desmonta físicamente el nodo del DOM</td>
                <td><span class="pill pill-low">Bajo</span> (si es false)</td>
                <td><span class="pill pill-high">Alto</span> (destruye/recrea)</td>
                <td><strong class="text-rose">Sí</strong> (resetea inputs/hooks)</td>
                <td>Condiciones que rara vez cambian en ejecución</td>
              </tr>
              <tr>
                <td><strong class="text-cyan">v-show</strong></td>
                <td>Aplica CSS <code>display: none</code></td>
                <td><span class="pill pill-high">Alto</span> (siempre monta)</td>
                <td><span class="pill pill-low">Muy Bajo</span> (solo estilo CSS)</td>
                <td><strong class="text-vue">No</strong> (preserva estado/inputs)</td>
                <td>Toggles frecuentes (modales, pestañas, acordeones)</td>
              </tr>
              <tr>
                <td><strong class="text-purple">v-for con :key</strong></td>
                <td>Reconciliación de Virtual DOM en colecciones</td>
                <td>Proporcional a elementos</td>
                <td>Óptimo con clave única</td>
                <td>Depende de <code>:key</code></td>
                <td>Renderizado de arrays, objetos y rangos</td>
              </tr>
              <tr>
                <td><strong class="text-amber">&lt;template&gt;</strong></td>
                <td>Contenedor invisible del compilador</td>
                <td><span class="pill pill-zero">Cero</span> (no genera HTML)</td>
                <td>Transparente</td>
                <td>Hereda de directiva</td>
                <td>Agrupación de nodos sin divs basura</td>
              </tr>
              <tr>
                <td><strong class="text-rose">&lt;component :is&gt;</strong></td>
                <td>Instanciación polimórfica de componentes</td>
                <td>Depende del componente</td>
                <td>Cachable con KeepAlive</td>
                <td>Configurable (KeepAlive)</td>
                <td>Vistas dinámicas, tabs y wizards</td>
              </tr>
              <tr>
                <td><strong class="text-cyan">v-memo / v-once</strong></td>
                <td>Memoización y omisión de diff en VDOM</td>
                <td>Normal</td>
                <td><span class="pill pill-zero">Cero</span> (omite re-render)</td>
                <td>No</td>
                <td>Listas masivas y optimizaciones críticas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Architecture Callout -->
    <CalloutCard type="tip" title="¿Cómo interactúan las Estructuras de Control con el Virtual DOM?">
      En Vue 3, las directivas de control son transformadas por el compilador de plantillas en funciones de renderizado optimizadas
      (con <em>Block Trees</em> y <em>Patch Flags</em>). Cuando una estructura como <code>v-if</code> cambia de valor, Vue ejecuta un 
      algoritmo de parcheo para sincronizar el DOM real con la menor cantidad posible de operaciones en el navegador.
    </CalloutCard>
  </div>
</template>

<script setup>
import CalloutCard from '../components/CalloutCard.vue'

const cards = [
  {
    path: '/v-if',
    title: 'v-if, v-else-if y v-else',
    description: 'Renderizado condicional estricto. Crea o destruye elementos físicamente en el árbol DOM del navegador.',
    badgeText: 'Condicional DOM',
    badgeClass: 'badge-vue',
    colorClass: 'icon-vue',
    features: [
      'Montaje y desmontaje real en el DOM',
      'Invocación de hooks onMounted / onUnmounted',
      'Perezoso: no compila si inicialmente es falso'
    ],
    iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" stroke-width="2"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="6" y1="9" x2="6" y2="15"></line><path d="M18 9a9 9 0 0 1-9 9"></path><polyline points="14 5 18 9 14 13"></polyline></svg>`
  },
  {
    path: '/v-show',
    title: 'v-show',
    description: 'Alternancia de visibilidad mediante estilos CSS inline (display: none). El elemento siempre reside en el DOM.',
    badgeText: 'Visibilidad CSS',
    badgeClass: 'badge-cyan',
    colorClass: 'icon-cyan',
    features: [
      'Conserva intacto el estado de formularios e inputs',
      'Coste de alternancia casi instantáneo',
      'El elemento se compila y monta siempre al inicio'
    ],
    iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`
  },
  {
    path: '/v-for',
    title: 'v-for y el atributo :key',
    description: 'Renderizado reactivo de colecciones. Itera sobre listas, arrays, propiedades de objetos y rangos numéricos.',
    badgeText: 'Iteración de Listas',
    badgeClass: 'badge-purple',
    colorClass: 'icon-purple',
    features: [
      'Importancia vital de una :key única e inmutable',
      'Peligros y bugs al usar :key="index"',
      'Iteración de objetos (valor, clave, índice)'
    ],
    iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" stroke-width="2"><path d="m17 2 4 4-4 4"></path><path d="M3 11v-1a4 4 0 0 1 4-4h14"></path><path d="m7 22-4-4 4-4"></path><path d="M21 13v1a4 4 0 0 1-4 4H3"></path></svg>`
  },
  {
    path: '/template-control',
    title: '<template> & v-for con v-if',
    description: 'Agrupación lógica sin etiquetas extra en el HTML final y resolución segura de directivas combinadas.',
    badgeText: 'Agrupamiento Limpio',
    badgeClass: 'badge-amber',
    colorClass: 'icon-amber',
    features: [
      'Contenedor transparente que no ensucia el DOM',
      'Evita el antipatrón de mezclar v-for y v-if juntos',
      'Filtrado óptimo con computed properties'
    ],
    iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`
  },
  {
    path: '/componentes-dinamicos',
    title: '<component :is="..."> & KeepAlive',
    description: 'Estructura polimórfica que renderiza componentes en caliente con control de persistencia de estado.',
    badgeText: 'Componentes Dinámicos',
    badgeClass: 'badge-rose',
    colorClass: 'icon-rose',
    features: [
      'Cambio fluido de componentes por nombre o referencia',
      'Caché de memoria con <KeepAlive>',
      'Animación de entrada y salida con <Transition>'
    ],
    iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line></svg>`
  },
  {
    path: '/optimizacion',
    title: 'v-memo, v-once & v-pre',
    description: 'Directivas de control avanzadas para optimizar el rendimiento y el ciclo de reactividad en Vue 3.',
    badgeText: 'Optimización Fina',
    badgeClass: 'badge-cyan',
    colorClass: 'icon-cyan',
    features: [
      'v-once: Contenido estático sin re-evaluación',
      'v-memo: Condiciona el re-render a dependencias clave',
      'v-pre: Omite el proceso de compilación'
    ],
    iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`
  }
]
</script>

<style scoped>
.hero-card {
  padding: 2.8rem 2.4rem;
  background: linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(26, 35, 51, 0.85));
  border: 1px solid rgba(66, 184, 131, 0.2);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
  margin-bottom: 2.5rem;
}

.hero-card::before {
  content: '';
  position: absolute;
  top: -60px;
  right: -60px;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, var(--vue-green-glow) 0%, transparent 70%);
  pointer-events: none;
}

.hero-badge-wrap {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
}

.hero-title {
  font-size: 2.6rem;
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 1rem;
}

.text-gradient {
  background: linear-gradient(135deg, var(--vue-green-light), #38bdf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 820px;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.hero-metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
  border-top: 1px solid var(--border-color);
  padding-top: 1.8rem;
}

.metric-pill {
  padding: 0.8rem 1rem;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.metric-number {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--vue-green-light);
  line-height: 1.1;
}

.metric-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-weight: 500;
  margin-top: 0.2rem;
}

/* Sections */
.section-block {
  margin-bottom: 3rem;
}

.section-header {
  margin-bottom: 1.4rem;
}

.section-title {
  font-size: 1.6rem;
  margin-bottom: 0.35rem;
}

.section-subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
}

/* Cards Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

@media (max-width: 1050px) {
  .cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
  .hero-metrics {
    grid-template-columns: repeat(2, 1fr);
  }
  .hero-title {
    font-size: 2rem;
  }
}

.control-card {
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  cursor: pointer;
  transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.control-card:hover {
  transform: translateY(-4px);
  border-color: rgba(66, 184, 131, 0.45);
  box-shadow: var(--shadow-md);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.1rem;
}

.card-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-vue { background: rgba(66, 184, 131, 0.15); color: var(--vue-green-light); border: 1px solid rgba(66, 184, 131, 0.3); }
.icon-cyan { background: rgba(6, 182, 212, 0.15); color: var(--accent-cyan); border: 1px solid rgba(6, 182, 212, 0.3); }
.icon-purple { background: rgba(168, 85, 247, 0.15); color: var(--accent-purple); border: 1px solid rgba(168, 85, 247, 0.3); }
.icon-amber { background: rgba(245, 158, 11, 0.15); color: var(--accent-amber); border: 1px solid rgba(245, 158, 11, 0.3); }
.icon-rose { background: rgba(244, 63, 94, 0.15); color: var(--accent-rose); border: 1px solid rgba(244, 63, 94, 0.3); }

.card-title {
  font-size: 1.22rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.card-desc {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.55;
  margin-bottom: 1.2rem;
  flex: 1;
}

.card-features {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin-bottom: 1.4rem;
  padding-top: 0.9rem;
  border-top: 1px solid var(--border-color);
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: var(--text-secondary);
}

.feature-check {
  color: var(--vue-green-light);
  font-weight: bold;
}

.card-action {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--vue-green-light);
  font-size: 0.88rem;
  font-weight: 600;
  transition: gap var(--transition-fast);
}

.control-card:hover .card-action {
  gap: 0.7rem;
}

/* Table */
.table-responsive {
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.9rem;
}

.comparison-table th {
  padding: 0.9rem 1.1rem;
  background: var(--bg-surface-elevated);
  color: var(--text-primary);
  font-weight: 600;
  border-bottom: 1px solid var(--border-color);
}

.comparison-table td {
  padding: 1rem 1.1rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-secondary);
  vertical-align: middle;
}

.comparison-table tr:hover td {
  background: rgba(255, 255, 255, 0.02);
}

.comparison-table code {
  background: var(--code-bg);
  padding: 0.2rem 0.4rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--accent-cyan);
}

.text-vue { color: var(--vue-green-light); }
.text-cyan { color: var(--accent-cyan); }
.text-purple { color: var(--accent-purple); }
.text-amber { color: var(--accent-amber); }
.text-rose { color: var(--accent-rose); }

.pill {
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.78rem;
  font-weight: 600;
}

.pill-low { background: rgba(66, 184, 131, 0.15); color: var(--vue-green-light); }
.pill-high { background: rgba(244, 63, 94, 0.15); color: var(--accent-rose); }
.pill-zero { background: rgba(6, 182, 212, 0.15); color: var(--accent-cyan); }
</style>
