<template>
  <div class="view-container animate-fade">
    <!-- View Header -->
    <div class="view-header">
      <div class="view-badges">
        <span class="badge badge-cyan">Directiva de Visibilidad</span>
        <span class="badge badge-vue">CSS display</span>
      </div>
      <h1 class="view-title">Estructura de Visibilidad: <code>v-show</code></h1>
      <p class="view-lead">
        A diferencia de <code>v-if</code>, la directiva <code>v-show</code> no altera la estructura del árbol DOM: 
        mantiene el elemento siempre montado en el navegador y conmuta únicamente la propiedad CSS <code>display: none</code>.
      </p>
    </div>

    <!-- Technical Analysis Grid -->
    <div class="grid-2">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span>Mecánica Interna de v-show</span>
          </div>
        </div>
        <div class="panel-body">
          <ul class="concept-list">
            <li>
              <strong>Siempre Montado en el DOM:</strong> El nodo HTML se crea durante el primer montaje de la página, sin importar si la expresión inicial es <code>false</code>.
            </li>
            <li>
              <strong>Preservación de Estado Local:</strong> Dado que el elemento nunca se desmonta, los datos internos de formularios (valores de inputs, scroll de áreas, estado de animaciones y hooks) permanecen intactos.
            </li>
            <li>
              <strong>Restricciones de Sintaxis:</strong> No es compatible con la etiqueta abstracta <code>&lt;template&gt;</code> (ya que <code>&lt;template&gt;</code> no existe como nodo CSS) y no soporta <code>v-else</code>.
            </li>
          </ul>
        </div>
      </div>

      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            <span>Coste de Rendimiento: v-if vs v-show</span>
          </div>
        </div>
        <div class="panel-body">
          <div class="cost-comparison">
            <div class="cost-row">
              <span class="cost-type">Coste de Render Inicial:</span>
              <span class="cost-badge cost-low">v-if es menor</span>
              <span class="cost-desc">v-if no procesa nada si es false inicialmente.</span>
            </div>
            <div class="cost-row">
              <span class="cost-type">Coste de Alternancia (Toggle):</span>
              <span class="cost-badge cost-win">v-show es superior</span>
              <span class="cost-desc">v-show solo modifica una regla de estilo CSS en microsegundos.</span>
            </div>
          </div>
          <p class="text-sm mt-3 text-secondary">
            <strong>Regla práctica:</strong> Usa <code>v-show</code> para elementos que el usuario abrirá y cerrará con frecuencia (menús desplegables, modales, acordeones o pestañas). Usa <code>v-if</code> si la condición es poco propensa a cambiar durante la sesión.
          </p>
        </div>
      </div>
    </div>

    <!-- Playground 1: Experimento de Preservación de Estado -->
    <section class="section-block mt-4">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7.5" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            <span>Laboratorio: Prueba Empírica de Preservación de Estado (v-show vs v-if)</span>
          </div>
          <span class="badge badge-vue">Demostración Clave</span>
        </div>

        <div class="panel-body">
          <div class="test-instruction">
            <div class="instruction-box">
              <strong>Instrucciones del experimento:</strong>
              <ol>
                <li>Escribe un texto en ambos campos de texto y aumenta los contadores.</li>
                <li>Haz clic en <em>"Ocultar Ambos Elementos"</em>.</li>
                <li>Vuelve a hacer clic en <em>"Mostrar Ambos Elementos"</em> y observa la diferencia de comportamiento.</li>
              </ol>
            </div>

            <!-- Master Toggle Button -->
            <div class="toggle-control-box">
              <button 
                type="button" 
                class="btn btn-primary"
                @click="isVisible = !isVisible"
              >
                <span>{{ isVisible ? 'Ocultar Elementos' : 'Mostrar Elementos' }}</span>
              </button>

              <span class="status-indicator-text">
                Estado reactivo <code>isVisible</code>: 
                <strong>{{ isVisible }}</strong>
              </span>
            </div>
          </div>

          <!-- Side-by-side comparison boxes -->
          <div class="grid-2 comparison-boxes mt-3">
            <!-- Box A: v-show -->
            <div class="card-box test-show-card">
              <div class="card-box-header">
                <span class="badge">v-show="isVisible"</span>
                <span class="badge badge-vue">Persistente</span>
              </div>

              <!-- The actual v-show element -->
              <div v-show="isVisible" class="test-element show-element">
                <h4>Elemento con v-show</h4>
                <p>Este nodo <strong>permanece en el DOM</strong> aunque esté oculto.</p>

                <div class="form-group mt-3">
                  <label class="field-label">Texto en memoria (no se borra):</label>
                  <input 
                    v-model="showInputText" 
                    type="text" 
                    class="form-input" 
                    placeholder="Escribe algo aquí..."
                  />
                </div>

                <div class="counter-group mt-3">
                  <span>Contador reactivo: <strong>{{ showCounter }}</strong></span>
                  <button type="button" class="btn btn-sm btn-secondary" @click="showCounter++">+1</button>
                </div>
              </div>

              <div v-if="!isVisible" class="hidden-notice">
                <span>Elemento oculto en pantalla (CSS <code>display: none</code> activo)</span>
              </div>
            </div>

            <!-- Box B: v-if -->
            <div class="card-box test-if-card">
              <div class="card-box-header">
                <span class="badge">v-if="isVisible"</span>
                <span class="badge">Efímero</span>
              </div>

              <!-- The actual v-if element -->
              <div v-if="isVisible" class="test-element if-element">
                <h4>Elemento con v-if</h4>
                <p>Este nodo <strong>se destruye físicamente</strong> al ser false.</p>

                <div class="form-group mt-3">
                  <label class="field-label">Texto en memoria (se destruye al ocultar):</label>
                  <input 
                    v-model="ifInputText" 
                    type="text" 
                    class="form-input" 
                    placeholder="Escribe algo aquí..."
                  />
                </div>

                <div class="counter-group mt-3">
                  <span>Contador reactivo: <strong>{{ ifCounter }}</strong></span>
                  <button type="button" class="btn btn-sm btn-secondary" @click="ifCounter++">+1</button>
                </div>
              </div>

              <div v-else class="hidden-notice">
                <span>Nodo completamente destruido del DOM real</span>
              </div>
            </div>
          </div>

          <!-- Real DOM Inspector -->
          <div class="grid-2 mt-4">
            <DomVisualizer 
              title="Inspección DOM de v-show"
              tag-name="div class='test-element show-element'"
              :is-mounted="true"
              :is-hidden="!isVisible"
              :mechanism-type="'v-show'"
              innerText="<input value='...'> [Nodo permanece con display: none cuando isVisible es false]"
            />

            <DomVisualizer 
              title="Inspección DOM de v-if"
              tag-name="div class='test-element if-element'"
              :is-mounted="isVisible"
              :is-hidden="false"
              :mechanism-type="'v-if'"
              innerText="<input value='...'> [Nodo destruido y recreado en cada toggle]"
            />
          </div>

          <!-- Code Explanation -->
          <CodeBlock 
            title="Comparativa de Código de Plantilla"
            :code="codeSnippet"
          />
        </div>
      </div>
    </section>

    <!-- Accordion / Dropdown Use Case -->
    <section class="section-block">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Caso de Uso Ideal para v-show: Menús Desplegables y Preguntas Frecuentes</span>
          </div>
          <span class="badge badge-cyan">Patrón de UI</span>
        </div>

        <div class="panel-body">
          <p class="mb-3">
            Los acordeones y dropdowns son el escenario idóneo para <code>v-show</code>, ya que las preguntas se abren y cierran repetidamente:
          </p>

          <div class="faq-list">
            <div v-for="faq in faqs" :key="faq.id" class="faq-item">
              <button 
                type="button" 
                class="faq-header" 
                @click="faq.open = !faq.open"
              >
                <span class="faq-question">{{ faq.q }}</span>
                <span class="faq-chevron" :class="{ 'is-open': faq.open }">▼</span>
              </button>
              
              <!-- v-show for smooth and instant response -->
              <div v-show="faq.open" class="faq-body">
                <p>{{ faq.a }}</p>
                <div class="faq-tag">Renderizado instantáneo con <code>v-show</code></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CalloutCard type="warning" title="Atención: v-show no admite <template>">
      Si intentas escribir <code>&lt;template v-show="condicion"&gt;</code>, Vue ignorará la directiva porque la etiqueta <code>&lt;template&gt;</code> 
      es un contenedor virtual que no se traduce a un nodo HTML en el DOM, por lo que no es posible asignarle estilos CSS.
      Para agrupar elementos con visibilidad CSS, debes usar una etiqueta contenedora real como un <code>&lt;div&gt;</code> o <code>&lt;section&gt;</code>.
    </CalloutCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'
import DomVisualizer from '../components/DomVisualizer.vue'
import CalloutCard from '../components/CalloutCard.vue'

const isVisible = ref(true)

// State for v-show card
const showInputText = ref('¡Este texto sobrevive al toggle!')
const showCounter = ref(5)

// State for v-if card
const ifInputText = ref('¡Este texto se reiniciará si ocultas!')
const ifCounter = ref(5)

const faqs = ref([
  {
    id: 1,
    q: '¿Por qué v-show no elimina el nodo del navegador?',
    a: 'Porque su propósito arquitectónico es permitir alternancias de alta frecuencia minimizando el coste de recálculo (layout y virtual DOM patching). Modificar una propiedad de estilo es infinitamente más rápido que destruir un árbol de componentes.',
    open: true
  },
  {
    id: 2,
    q: '¿Afecta v-show al posicionamiento SEO en buscadores?',
    a: 'A diferencia de v-if (cuyo contenido no está en el HTML inicial si es falso), los rastreadores de motores de búsqueda pueden leer el texto contenido dentro de un nodo con display: none, aunque le otorgan menor relevancia que al texto visible.',
    open: false
  },
  {
    id: 3,
    q: '¿Puedo usar transiciones CSS con v-show?',
    a: '¡Sí! El componente <Transition> de Vue 3 funciona de manera totalmente compatible tanto con v-if como con v-show, aplicando las clases de animación cuando la visibilidad cambia.',
    open: false
  }
])

const codeSnippet = `<template>
  <!-- v-show: el elemento siempre está en el DOM, solo se oculta con CSS -->
  <div v-show="isVisible" class="modal">
    <input v-model="formData.email" placeholder="Email...">
    <!-- El valor del input NO se pierde al ocultar -->
  </div>

  <!-- v-if: el elemento se desmonta; su estado interno se resetea -->
  <div v-if="isVisible" class="modal">
    <input v-model="formData.email" placeholder="Email...">
    <!-- El valor del input se destruye y reinicia en cada alternancia -->
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

.cost-comparison {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.cost-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.65rem 0.8rem;
  background: var(--bg-app);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
}

.cost-type {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-primary);
}

.cost-badge {
  display: inline-block;
  align-self: flex-start;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
}

.cost-low { background: rgba(66, 184, 131, 0.2); color: var(--vue-green-light); }
.cost-win { background: rgba(6, 182, 212, 0.2); color: var(--accent-cyan); }

.cost-desc {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.text-sm { font-size: 0.85rem; }
.text-secondary { color: var(--text-secondary); }
.mt-3 { margin-top: 0.75rem; }
.mt-4 { margin-top: 1.5rem; }
.mb-3 { margin-bottom: 0.75rem; }

/* Test Playground */
.test-instruction {
  background: var(--bg-app);
  padding: 1.2rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  margin-bottom: 1.2rem;
}

.instruction-box ol {
  margin-top: 0.5rem;
  margin-left: 1.25rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.toggle-control-box {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.status-indicator-text {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.status-indicator-text strong {
  font-family: var(--font-mono);
  font-size: 1rem;
}

.card-box {
  background: var(--bg-app);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.4rem;
  min-height: 240px;
  display: flex;
  flex-direction: column;
}

.card-box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}

.test-element {
  padding: 1.2rem;
  border-radius: var(--radius-sm);
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
}

.show-element {
  border-left: 4px solid var(--accent-cyan);
}

.if-element {
  border-left: 4px solid var(--accent-rose);
}

.field-label {
  display: block;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.4rem;
}

.counter-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hidden-notice {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: italic;
  font-size: 0.88rem;
  color: var(--text-muted);
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-sm);
  padding: 2rem;
}

/* FAQ Accordion */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.faq-item {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--bg-app);
}

.faq-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-family: var(--font-main);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: background var(--transition-fast);
}

.faq-header:hover {
  background: var(--bg-surface-elevated);
}

.faq-chevron {
  font-size: 0.7rem;
  color: var(--text-muted);
  transition: transform var(--transition-fast);
}

.faq-chevron.is-open {
  transform: rotate(180deg);
  color: var(--vue-green-light);
}

.faq-body {
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--border-color);
  background: var(--bg-surface);
  font-size: 0.92rem;
  line-height: 1.6;
}

.faq-tag {
  margin-top: 0.8rem;
  font-size: 0.78rem;
  color: var(--accent-cyan);
}
</style>
