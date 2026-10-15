<template>
  <div class="view-container animate-fade">
    <!-- View Header -->
    <div class="view-header">
      <div class="view-badges">
        <span class="badge badge-vue">Control Dinámico</span>
        <span class="badge">KeepAlive & Transiciones</span>
      </div>
      <h1 class="view-title">Estructura Dinámica: <code>&lt;component :is="..."&gt;</code></h1>
      <p class="view-lead">
        La etiqueta <code>&lt;component&gt;</code> permite renderizar diferentes componentes de forma polimórfica según el valor de una variable reactiva, sustituyendo largas cadenas condicionales de <code>v-if / v-else-if</code>.
      </p>
    </div>

    <!-- Technical Analysis Grid -->
    <div class="grid-2">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2">
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
              <strong>Valores admitidos:</strong> El atributo <code>:is</code> puede recibir un objeto de componente importado directamente (mediante <code>shallowRef</code>) o una cadena con el nombre de un componente registrado globalmente.
            </li>
            <li>
              <strong>Paso de Props y Eventos:</strong> Cualquier propiedad (<code>:prop</code>) o escuchador de eventos (<code>@evento</code>) declarado en <code>&lt;component&gt;</code> se transfiere automáticamente al componente hijo renderizado.
            </li>
            <li>
              <strong>Ciclo de vida estándar:</strong> Al cambiar el valor de <code>:is</code>, el componente anterior se desmonta por completo (destruyendo su estado interno) y el nuevo se monta desde cero.
            </li>
          </ul>
        </div>
      </div>

      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span>Persistencia con &lt;KeepAlive&gt;</span>
          </div>
        </div>
        <div class="panel-body">
          <ul class="concept-list">
            <li>
              <strong>Caché en memoria RAM:</strong> Envolver <code>&lt;component :is&gt;</code> dentro del componente incorporado <code>&lt;KeepAlive&gt;</code> preserva la instancia del componente inactivo sin destruirla.
            </li>
            <li>
              <strong>Preservación de Estado:</strong> Los datos de formularios, la posición de scroll y las variables reactivas de cada vista se conservan al alternar entre pestañas.
            </li>
            <li>
              <strong>Límites configurables:</strong> Admite las propiedades <code>include</code>, <code>exclude</code> y <code>max</code> para restringir qué componentes se guardan en caché y evitar consumo excesivo de memoria.
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Implementation Patterns -->
    <section class="section-block mt-4">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <span>Patrón de Implementación: Sistema de Pestañas Dinámicas</span>
          </div>
          <span class="badge">Recomendado</span>
        </div>

        <div class="panel-body">
          <p class="mb-3 text-secondary">
            En lugar de escribir múltiples directivas <code>v-if</code> para cada vista o formulario, se utiliza <code>shallowRef</code> junto con <code>&lt;component :is&gt;</code>:
          </p>

          <CodeBlock 
            title="Tabs dinámicas con shallowRef y KeepAlive"
            :code="tabExampleCode"
          />
        </div>
      </div>
    </section>

    <!-- Lifecycle and Transitions -->
    <section class="section-block">
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <span>Ciclo de Vida con KeepAlive: onActivated y onDeactivated</span>
          </div>
        </div>

        <div class="panel-body">
          <p class="text-secondary mb-3">
            Cuando un componente está en caché mediante <code>&lt;KeepAlive&gt;</code>, no se ejecutan <code>onMounted</code> ni <code>onUnmounted</code> en cada cambio de vista. Vue proporciona dos hooks específicos para responder a la activación y desactivación:
          </p>

          <div class="lifecycle-box">
            <div class="lifecycle-item">
              <strong>onActivated()</strong>
              <p>Se ejecuta cuando el componente vuelve a ser visible en pantalla. Ideal para refrescar datos o reanudar temporizadores.</p>
            </div>
            <div class="lifecycle-item">
              <strong>onDeactivated()</strong>
              <p>Se ejecuta cuando el usuario cambia a otra pestaña y el componente entra en hibernación. Ideal para pausar animaciones o vídeos.</p>
            </div>
          </div>

          <CodeBlock 
            title="Uso de onActivated y onDeactivated en el componente hijo"
            :code="lifecycleCode"
          />
        </div>
      </div>
    </section>

    <!-- Callout on Transitions -->
    <CalloutCard type="tip" title="Integración con animaciones <Transition>">
      Para animar el cambio entre componentes dinámicos con persistencia en caché, la estructura correcta de anidación recomendada por Vue es colocar <code>&lt;KeepAlive&gt;</code> dentro de <code>&lt;Transition mode="out-in"&gt;</code>:
      <br /><br />
      <code>&lt;Transition mode="out-in"&gt;&lt;KeepAlive&gt;&lt;component :is="activeView" /&gt;&lt;/KeepAlive&gt;&lt;/Transition&gt;</code>
    </CalloutCard>
  </div>
</template>

<script setup>
import CodeBlock from '../components/CodeBlock.vue'
import CalloutCard from '../components/CalloutCard.vue'

const tabExampleCode = `<script setup>
import { shallowRef } from 'vue'
import PerfilUsuario from './PerfilUsuario.vue'
import AjustesCuenta from './AjustesCuenta.vue'
import Notificaciones from './Notificaciones.vue'

// Se recomienda shallowRef para definiciones de componentes
const vistaActiva = shallowRef(PerfilUsuario)

const pestañas = [
  { nombre: 'Perfil', componente: PerfilUsuario },
  { nombre: 'Ajustes', componente: AjustesCuenta },
  { nombre: 'Notificaciones', componente: Notificaciones }
]
<\/script>

<template>
  <!-- Barra de navegación de pestañas -->
  <div class="tabs-bar">
    <button 
      v-for="p in pestañas" 
      :key="p.nombre" 
      :class="{ activo: vistaActiva === p.componente }"
      @click="vistaActiva = p.componente"
    >
      {{ p.nombre }}
    </button>
  </div>

  <!-- Renderizado dinámico con caché de estado -->
  <KeepAlive>
    <component :is="vistaActiva" />
  </KeepAlive>
</template>`

const lifecycleCode = `<script setup>
import { onMounted, onActivated, onDeactivated } from 'vue'

onMounted(() => {
  console.log('Se ejecuta únicamente una sola vez durante el primer montaje')
})

onActivated(() => {
  console.log('El componente vuelve a estar visible en pantalla')
  // Actualizar datos si es necesario
})

onDeactivated(() => {
  console.log('El componente entra en caché e hibernación')
})
<\/script>`
</script>

<style scoped>
.view-container {
  max-width: 1000px;
  margin: 0 auto;
}

.view-header {
  margin-bottom: 1.75rem;
}

.view-badges {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}

.view-title {
  font-size: 1.85rem;
  margin-bottom: 0.5rem;
}

.view-lead {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.concept-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.concept-list li {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.55;
}

.concept-list strong {
  color: var(--text-primary);
}

.section-block {
  margin-bottom: 2rem;
}

.mt-4 { margin-top: 1.5rem; }
.mb-3 { margin-bottom: 0.75rem; }

.lifecycle-box {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1.25rem;
}

@media (max-width: 700px) {
  .lifecycle-box {
    grid-template-columns: 1fr;
  }
}

.lifecycle-item {
  padding: 1rem;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.lifecycle-item strong {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--vue-green);
  display: block;
  margin-bottom: 0.35rem;
}

.lifecycle-item p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}
</style>
