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
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin: 1.25rem 0;
  font-family: var(--font-mono);
  box-shadow: var(--shadow-sm);
}

.dom-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 1rem;
  background: rgba(0, 0, 0, 0.35);
  border-bottom: 1px solid var(--code-border);
}

.dom-header-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.status-indicator {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #f43f5e;
  box-shadow: 0 0 6px #f43f5e;
  transition: all var(--transition-fast);
}

.status-indicator.active {
  background: var(--vue-green-light);
  box-shadow: 0 0 8px var(--vue-green);
}

.title-text {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-primary);
}

.dom-view {
  padding: 1.25rem;
}

.dom-node-card {
  padding: 1rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.02);
  border: 1px dashed rgba(255, 255, 255, 0.15);
  transition: all var(--transition-smooth);
}

.dom-node-card.node-active {
  border-color: rgba(66, 184, 131, 0.4);
  background: rgba(66, 184, 131, 0.04);
}

.dom-node-card.node-hidden {
  border-color: rgba(245, 158, 11, 0.4);
  background: rgba(245, 158, 11, 0.03);
  opacity: 0.8;
}

.dom-node-card.node-unmounted {
  border-color: rgba(244, 63, 94, 0.3);
  background: rgba(244, 63, 94, 0.03);
}

.node-tag {
  color: #94a3b8;
  font-size: 0.85rem;
}

.tag-bracket {
  color: #64748b;
}

.tag-name {
  color: #f43f5e;
  font-weight: 600;
}

.tag-attrs {
  color: #38bdf8;
}

.tag-style {
  color: #fbbf24;
  font-weight: 600;
  background: rgba(245, 158, 11, 0.15);
  padding: 0 4px;
  border-radius: 3px;
}

.node-content {
  padding: 0.6rem 0 0.6rem 1.4rem;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  margin: 0.3rem 0 0.3rem 0.5rem;
  font-size: 0.85rem;
  color: #cbd5e1;
}

.comment-placeholder {
  color: #64748b;
  font-style: italic;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.comment-symbol {
  color: #475569;
  font-weight: bold;
}

.comment-text {
  color: #94a3b8;
}

.dom-footer {
  padding: 0.65rem 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid var(--code-border);
  font-family: var(--font-main);
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.dom-footer strong {
  color: var(--text-primary);
}
</style>
