<template>
  <div class="dom-visualizer">
    <div class="dom-header">
      <div class="dom-header-title">
        <span class="status-indicator" :class="{ 'active': isMounted }"></span>
        <span class="title-text">{{ title || 'Inspección del DOM Real' }}</span>
      </div>
      <span class="badge" :class="isMounted ? (isHidden ? 'badge-amber' : 'badge-vue') : 'badge-rose'">
        {{ !isMounted ? 'Nodo Destruido (<!-- v-if -->)' : (isHidden ? 'Oculto (display: none)' : 'Activo en DOM') }}
      </span>
    </div>

    <div class="dom-view">
      <div class="dom-node-card" :class="{ 'node-unmounted': !isMounted, 'node-hidden': isMounted && isHidden, 'node-active': isMounted && !isHidden }">
        <div class="node-tag">
          <span class="tag-bracket">&lt;</span>
          <span class="tag-name">{{ tagName }}</span>
          <span v-if="attributes" class="tag-attrs">{{ ' ' + attributes }}</span>
          <span v-if="isHidden" class="tag-style"> style="display: none;"</span>
          <span class="tag-bracket">&gt;</span>
        </div>

        <div class="node-content">
          <template v-if="!isMounted">
            <div class="comment-placeholder">
              <span class="comment-symbol">&lt;!--</span> 
              <span class="comment-text">v-if: Este elemento ha sido completamente desmontado de la memoria del navegador</span> 
              <span class="comment-symbol">--&gt;</span>
            </div>
          </template>
          <template v-else>
            <slot>
              <span class="node-text">{{ innerText || 'Contenido renderizado dentro del nodo' }}</span>
            </slot>
          </template>
        </div>

        <div class="node-tag">
          <span class="tag-bracket">&lt;/</span>
          <span class="tag-name">{{ tagName }}</span>
          <span class="tag-bracket">&gt;</span>
        </div>
      </div>
    </div>

    <div class="dom-footer">
      <small>
        <strong>Mecanismo de Vue:</strong> {{ explanation }}
      </small>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  tagName: {
    type: String,
    default: 'div'
  },
  attributes: {
    type: String,
    default: ''
  },
  isMounted: {
    type: Boolean,
    default: true
  },
  isHidden: {
    type: Boolean,
    default: false
  },
  innerText: {
    type: String,
    default: ''
  },
  mechanismType: {
    type: String,
    default: 'v-if' // 'v-if' or 'v-show'
  }
})

const explanation = computed(() => {
  if (props.mechanismType === 'v-if') {
    return props.isMounted
      ? 'v-if es true: Vue ejecuta createElement(), adjunta listeners y monta el nodo en el árbol DOM del navegador.'
      : 'v-if es false: Vue destruye el elemento, invoca los hooks de desmontaje (onUnmounted) y deja un nodo de comentario placeholder.'
  } else {
    return props.isHidden
      ? 'v-show es false: El nodo sigue existiendo en el DOM y en memoria; Vue únicamente aplica la propiedad CSS inline style="display: none;".'
      : 'v-show es true: Vue remueve el estilo inline display: none restaurando la visualización instantánea sin reconstruir el componente.'
  }
})
</script>

<style scoped>
.dom-visualizer {
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin: 1.25rem 0;
  font-family: var(--font-mono);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.dom-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.55rem 1rem;
  background: var(--code-header-bg);
  border-bottom: 1px solid var(--code-border);
}

.dom-header-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #6e7681;
  transition: all var(--transition-fast);
}

.status-indicator.active {
  background: #3fb950;
}

.title-text {
  font-size: 0.78rem;
  font-weight: 500;
  color: #e6edf3;
}

.dom-view {
  padding: 1rem;
  background: var(--code-bg);
}

.dom-node-card {
  padding: 0.85rem;
  border-radius: var(--radius-sm);
  background: rgba(0, 0, 0, 0.25);
  border: 1px dashed var(--code-border);
  transition: all var(--transition-smooth);
}

.dom-node-card.node-active {
  border-color: #3fb950;
}

.dom-node-card.node-hidden {
  border-color: #d29922;
  opacity: 0.85;
}

.dom-node-card.node-unmounted {
  border-color: var(--code-border);
}

.node-tag {
  color: #8b949e;
  font-size: 0.84rem;
}

.tag-bracket {
  color: #6e7681;
}

.tag-name {
  color: var(--syn-tag);
  font-weight: 600;
}

.tag-attrs {
  color: var(--syn-attr);
}

.tag-style {
  color: var(--syn-directive);
  font-weight: 600;
  background: rgba(255, 166, 87, 0.15);
  padding: 0 4px;
  border-radius: 3px;
}

.node-content {
  padding: 0.5rem 0 0.5rem 1.25rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0.25rem 0 0.25rem 0.5rem;
  font-size: 0.84rem;
  color: #c9d1d9;
}

.comment-placeholder {
  color: #8b949e;
  font-style: italic;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.comment-symbol {
  color: #6e7681;
  font-weight: bold;
}

.comment-text {
  color: #8b949e;
}

.dom-footer {
  padding: 0.55rem 1rem;
  background: var(--code-header-bg);
  border-top: 1px solid var(--code-border);
  font-family: var(--font-main);
  font-size: 0.78rem;
  color: #8b949e;
  line-height: 1.5;
}

.dom-footer strong {
  color: #e6edf3;
}
</style>
