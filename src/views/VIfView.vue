<template>
  <div class="view-container animate-fade">
    <!-- View Header -->
    <div class="view-header">
      <div class="view-badges">
        <span class="badge badge-vue">Directiva Central</span>
        <span class="badge badge-purple">Renderizado Condicional</span>
      </div>
      <h1 class="view-title">Estructura Condicional: <code>v-if</code>, <code>v-else-if</code> y <code>v-else</code></h1>
      <p class="view-lead">
        La directiva <code>v-if</code> es la estructura de control primordial para renderizar o destruir físicamente bloques de marcado en el DOM según el valor de una expresión booleana.
      </p>
    </div>

    <!-- Technical Explanation -->
    <div class="grid-2">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            <span>Mecánica Interna de v-if</span>
          </div>
        </div>
        <div class="panel-body">
          <ul class="concept-list">
            <li>
              <strong>Renderizado Condicional Real:</strong> A diferencia de ocultar con CSS, <code>v-if</code> garantiza que los listeners de eventos y componentes secundarios se destruyan y recreen por completo durante las transiciones condicionales.
            </li>
            <li>
              <strong>Evaluación Perezosa (Lazy):</strong> Si la condición es falsa en el renderizado inicial, Vue no realiza ninguna acción en el DOM. El bloque condicional no se compilará ni se insertará hasta que la condición sea verdadera por primera vez.
            </li>
            <li>
              <strong>Encadenamiento Estricto:</strong> Un elemento con <code>v-else</code> o <code>v-else-if</code> debe seguir <em>inmediatamente</em> al elemento <code>v-if</code> hermano; de lo contrario, el compilador de Vue no lo reconocerá y arrojará un error de sintaxis.
            </li>
          </ul>
        </div>
      </div>

      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>Ciclo de Vida y Memoria</span>
          </div>
        </div>
        <div class="panel-body">
          <p>
            Al cambiar una condición <code>v-if</code> a <code>false</code>:
          </p>
          <div class="lifecycle-flow">
            <span class="step-badge">1. Condición = false</span>
            <span class="step-arrow">→</span>
            <span class="step-badge">2. onBeforeUnmount()</span>
            <span class="step-arrow">→</span>
            <span class="step-badge">3. Limpieza de Listeners</span>
            <span class="step-arrow">→</span>
            <span class="step-badge">4. onUnmounted()</span>
          </div>
          <p class="text-sm mt-3">
            Esto libera memoria RAM en el navegador, pero introduce un coste de tiempo de CPU si la condición se alterna con mucha frecuencia (para lo cual se prefiere <code>v-show</code>).
          </p>
        </div>
      </div>
    </div>

    <!-- Playground 1: Rol de Usuario (v-if / v-else-if / v-else) -->
    <section class="section-block mt-4">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <span>Laboratorio 1: Sistema de Permisos por Rol con Encadenamiento Completo</span>
          </div>
          <span class="badge badge-vue">Interactivo en Vivo</span>
        </div>

        <div class="panel-body">
          <div class="playground-controls">
            <div class="control-group">
              <label class="control-label">Selecciona el Rol del Usuario:</label>
              <div class="role-buttons">
                <button 
                  v-for="r in availableRoles" 
                  :key="r.id"
                  type="button"
                  class="btn btn-sm"
                  :class="selectedRole === r.id ? 'btn-primary' : 'btn-secondary'"
                  @click="selectedRole = r.id"
                >
                  {{ r.label }}
                </button>
              </div>
            </div>
          </div>

          <!-- Live Output Rendering -->
          <div class="live-demo-area">
            <div class="demo-label">Resultado Visual en la Plantilla:</div>

            <!-- v-if block -->
            <div v-if="selectedRole === 'admin'" class="role-box role-admin">
              <div class="role-box-header">
                <span class="badge">v-if="selectedRole === 'admin'"</span>
                <span class="status-pill">Administrador</span>
              </div>
              <h3>Panel de Administración</h3>
              <p>Acceso completo a configuración del sistema, auditoría de base de datos y control de usuarios.</p>
              <div class="role-actions">
                <button class="btn btn-sm btn-primary">Configuración</button>
                <button class="btn btn-sm btn-secondary">Auditoría</button>
              </div>
            </div>

            <!-- v-else-if editor -->
            <div v-else-if="selectedRole === 'editor'" class="role-box role-editor">
              <div class="role-box-header">
                <span class="badge">v-else-if="selectedRole === 'editor'"</span>
                <span class="status-pill">Editor</span>
              </div>
              <h3>Panel Editorial</h3>
              <p>Permisos de redacción, publicación y gestión de artículos en el repositorio de contenido.</p>
              <div class="role-actions">
                <button class="btn btn-sm btn-secondary">Crear Publicación</button>
                <button class="btn btn-sm btn-secondary">Borradores</button>
              </div>
            </div>

            <!-- v-else-if user -->
            <div v-else-if="selectedRole === 'user'" class="role-box role-user">
              <div class="role-box-header">
                <span class="badge">v-else-if="selectedRole === 'user'"</span>
                <span class="status-pill">Usuario</span>
              </div>
              <h3>Perfil de Usuario</h3>
              <p>Sesión activa estándar. Permite interactuar con la plataforma y guardar preferencias.</p>
              <div class="role-actions">
                <button class="btn btn-sm btn-secondary">Editar Perfil</button>
              </div>
            </div>

            <!-- v-else-if banned -->
            <div v-else-if="selectedRole === 'banned'" class="role-box role-banned">
              <div class="role-box-header">
                <span class="badge badge-rose">v-else-if="selectedRole === 'banned'"</span>
                <span class="status-pill text-rose">Suspendido</span>
              </div>
              <h3>Cuenta Suspendida</h3>
              <p>Tu cuenta ha sido restringida administrativamente.</p>
            </div>

            <!-- v-else (guest) -->
            <div v-else class="role-box role-guest">
              <div class="role-box-header">
                <span class="badge">v-else (Visitante)</span>
                <span class="status-pill">Anónimo</span>
              </div>
              <h3>Acceso de Invitado</h3>
              <p>Inicia sesión para interactuar con todas las funcionalidades de la aplicación.</p>
              <div class="role-actions">
                <button class="btn btn-sm btn-primary">Iniciar Sesión</button>
              </div>
            </div>
          </div>

          <!-- Real DOM Inspector -->
          <DomVisualizer 
            title="Inspección del Nodo en el DOM Real del Navegador"
            :tag-name="'div class=\'role-box role-' + selectedRole + '\''"
            :is-mounted="true"
            :is-hidden="false"
            :mechanism-type="'v-if'"
          >
            <div class="dom-inner-snippet">
              &lt;h3&gt;Contenido específico del rol "{{ selectedRole }}"&lt;/h3&gt;<br />
              &lt;p&gt;Los otros 4 bloques NO existen en el DOM, solo se preserva el nodo correspondiente.&lt;/p&gt;
            </div>
          </DomVisualizer>

          <!-- Code for this example -->
          <CodeBlock 
            title="Sintaxis Template del Laboratorio"
            :code="roleTemplateCode"
          />
        </div>
      </div>
    </section>

    <!-- Playground 2: Máquina de estados Asíncronos -->
    <section class="section-block">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            <span>Laboratorio 2: Máquina de Estados Asíncronos (Idle / Loading / Success / Error)</span>
          </div>
          <span class="badge badge-cyan">Patrón Esencial</span>
        </div>

        <div class="panel-body">
          <p class="mb-3">
            El uso de <code>v-if / v-else-if / v-else</code> es el patrón recomendado por el equipo de Vue para manejar estados mutuamente excluyentes en peticiones asíncronas:
          </p>

          <div class="async-actions mb-4">
            <button 
              type="button" 
              class="btn btn-primary btn-sm" 
              :disabled="fetchStatus === 'loading'"
              @click="simulateFetch('success')"
            >
              Simular Carga Exitosa (2s)
            </button>

            <button 
              type="button" 
              class="btn btn-danger btn-sm" 
              :disabled="fetchStatus === 'loading'"
              @click="simulateFetch('error')"
            >
              Simular Fallo de Servidor (500)
            </button>

            <button 
              type="button" 
              class="btn btn-secondary btn-sm" 
              @click="fetchStatus = 'idle'"
            >
              Resetear a Idle
            </button>

            <span class="status-current-badge">
              Estado actual: <strong>{{ fetchStatus }}</strong>
            </span>
          </div>

          <!-- Dynamic Async State View -->
          <div class="state-result-card">
            <!-- Idle -->
            <div v-if="fetchStatus === 'idle'" class="state-state idle-state">
              <span class="state-icon">💤</span>
              <div>
                <strong>v-if="fetchStatus === 'idle'"</strong>
                <p>En espera. Presiona un botón para despachar la petición asíncrona simulada.</p>
              </div>
            </div>

            <!-- Loading -->
            <div v-else-if="fetchStatus === 'loading'" class="state-state loading-state">
              <div class="spinner"></div>
              <div>
                <strong>v-else-if="fetchStatus === 'loading'"</strong>
                <p>Consultando API remota... Por favor espera mientras recibimos los paquetes.</p>
              </div>
            </div>

            <!-- Success -->
            <div v-else-if="fetchStatus === 'success'" class="state-state success-state">
              <span class="state-icon">✅</span>
              <div>
                <strong>v-else-if="fetchStatus === 'success'"</strong>
                <p>¡Datos cargados con éxito! Se recibieron 250 registros sin incidencias (HTTP 200 OK).</p>
              </div>
            </div>

            <!-- Error (v-else) -->
            <div v-else class="state-state error-state">
              <span class="state-icon">❌</span>
              <div>
                <strong>v-else (Error Inesperado)</strong>
                <p>Fallo de conexión o respuesta 500 del servidor. Se activó el bloque de contingencia.</p>
              </div>
            </div>
          </div>

          <CodeBlock 
            title="Patrón en Script Setup & Template"
            :code="asyncPatternCode"
          />
        </div>
      </div>
    </section>

    <!-- Best Practice Warning Callout -->
    <CalloutCard type="rule" title="Regla de oro: No intercalar elementos entre v-if y v-else">
      Si colocas una etiqueta o texto plano entre un <code>v-if</code> y un <code>v-else</code> (por ejemplo un comentario o un <code>&lt;div&gt;</code> sin directiva),
      Vue perderá la cadena condicional y <code>v-else</code> será ignorado con una advertencia en la consola de desarrollo.
    </CalloutCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'
import DomVisualizer from '../components/DomVisualizer.vue'
import CalloutCard from '../components/CalloutCard.vue'

const availableRoles = [
  { id: 'admin', label: 'Administrador' },
  { id: 'editor', label: 'Editor' },
  { id: 'user', label: 'Usuario' },
  { id: 'banned', label: 'Suspendido' },
  { id: 'guest', label: 'Invitado' }
]

const selectedRole = ref('admin')

const roleTemplateCode = `<template>
  <!-- v-if inicial -->
  <div v-if="selectedRole === 'admin'" class="role-admin">
    <h3>👑 Panel de Administración Total</h3>
  </div>

  <!-- v-else-if encadenados -->
  <div v-else-if="selectedRole === 'editor'" class="role-editor">
    <h3>✍️ Panel Editorial</h3>
  </div>

  <div v-else-if="selectedRole === 'user'" class="role-user">
    <h3>👤 Mi Perfil Personal</h3>
  </div>

  <div v-else-if="selectedRole === 'banned'" class="role-banned">
    <h3>🚫 Cuenta Bloqueada</h3>
  </div>

  <!-- v-else por defecto -->
  <div v-else class="role-guest">
    <h3>👋 Bienvenido, Visitante</h3>
  </div>
</template>`

// Async fetch simulation
const fetchStatus = ref('idle') // 'idle' | 'loading' | 'success' | 'error'

const simulateFetch = (outcome) => {
  fetchStatus.value = 'loading'
  setTimeout(() => {
    fetchStatus.value = outcome
  }, 1400)
}

const asyncPatternCode = `<script setup>
import { ref } from 'vue'

const status = ref('idle') // 'idle' | 'loading' | 'success' | 'error'
const data = ref(null)

const fetchData = async () => {
  status.value = 'loading'
  try {
    const res = await api.getUsers()
    data.value = res.data
    status.value = 'success'
  } catch (err) {
    status.value = 'error'
  }
}
<\/script>

<template>
  <div v-if="status === 'idle'">Presiona para cargar datos</div>
  <div v-else-if="status === 'loading'">Cargando...</div>
  <div v-else-if="status === 'success'">Datos: {{ data }}</div>
  <div v-else>Ocurrió un error al procesar la solicitud</div>
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

.lifecycle-flow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin: 1.2rem 0;
}

.step-badge {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-color);
  padding: 0.35rem 0.65rem;
  border-radius: var(--radius-sm);
  font-size: 0.78rem;
  font-family: var(--font-mono);
  color: var(--vue-green-light);
}

.step-arrow {
  color: var(--text-muted);
  font-weight: bold;
}

.text-sm {
  font-size: 0.85rem;
}

.mt-3 { margin-top: 0.75rem; }
.mt-4 { margin-top: 1.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-4 { margin-bottom: 1.25rem; }

/* Playground 1 */
.playground-controls {
  margin-bottom: 1.4rem;
}

.control-label {
  display: block;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 0.65rem;
}

.role-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.live-demo-area {
  padding: 1.4rem;
  background: var(--bg-app);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  margin-bottom: 1.4rem;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.role-box {
  padding: 1.25rem;
  border-radius: var(--radius-md);
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-left: 3px solid var(--border-color);
  animation: fadeIn 0.2s ease;
}

.role-admin { border-left-color: var(--accent-rose); }
.role-editor { border-left-color: var(--accent-purple); }
.role-user { border-left-color: var(--accent-cyan); }
.role-banned { border-left-color: #ef4444; }
.role-guest { border-left-color: var(--text-muted); }

.role-box-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6rem;
}

.status-pill {
  font-size: 0.72rem;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-sm);
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
}

.admin-pill { background: rgba(244, 63, 94, 0.2); color: var(--accent-rose); }
.editor-pill { background: rgba(168, 85, 247, 0.2); color: var(--accent-purple); }
.user-pill { background: rgba(6, 182, 212, 0.2); color: var(--accent-cyan); }
.banned-pill { background: rgba(239, 68, 68, 0.2); color: #f87171; }
.guest-pill { background: rgba(245, 158, 11, 0.2); color: var(--accent-amber); }

.role-actions {
  display: flex;
  gap: 0.8rem;
  margin-top: 1.2rem;
}

/* Async Playground */
.async-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem;
}

.status-current-badge {
  margin-left: auto;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.status-current-badge strong {
  color: var(--vue-green-light);
  font-family: var(--font-mono);
}

.state-result-card {
  padding: 1.6rem;
  background: var(--bg-app);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  margin-bottom: 1.4rem;
}

.state-state {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.state-icon {
  font-size: 2rem;
}

.idle-state { color: var(--text-secondary); }
.loading-state { color: var(--accent-cyan); }
.success-state { color: var(--vue-green-light); }
.error-state { color: var(--accent-rose); }

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(6, 182, 212, 0.2);
  border-top-color: var(--accent-cyan);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.dom-inner-snippet {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.5;
}
</style>
