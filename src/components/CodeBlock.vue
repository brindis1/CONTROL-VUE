<template>
  <div class="code-container">
    <div class="code-header">
      <div class="code-header-left">
        <span class="code-dot red"></span>
        <span class="code-dot yellow"></span>
        <span class="code-dot green"></span>
        <span class="code-title">{{ title || 'Código de ejemplo' }}</span>
      </div>
      <button 
        type="button" 
        class="copy-btn" 
        :class="{ copied }" 
        @click="copyToClipboard"
        :title="copied ? '¡Copiado!' : 'Copiar código'"
      >
        <svg v-if="!copied" class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <svg v-else class="copy-icon text-vue" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>{{ copied ? '¡Copiado!' : 'Copiar' }}</span>
      </button>
    </div>
    <pre class="code-content"><code v-html="highlightedCode"></code></pre>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  lang: {
    type: String,
    default: 'html'
  }
})

const copied = ref(false)

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Error al copiar al portapapeles', err)
  }
}

// Basic syntax highlighter for HTML/Vue templates & JS
const escapeHtml = (text) => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

const highlightedCode = computed(() => {
  let safe = escapeHtml(props.code)

  // Directives (v-if, v-for, v-show, v-else, etc.)
  safe = safe.replace(/(v-[a-z0-9:-]+)/g, '<span class="token-directive">$1</span>')
  // Attributes like :key, @click, :is
  safe = safe.replace(/((?::|@)[a-z0-9_-]+)/g, '<span class="token-attr">$1</span>')
  // Strings inside quotes
  safe = safe.replace(/(&quot;.*?&quot;|&#39;.*?&#39;|".*?"|'.*?')/g, '<span class="token-string">$1</span>')
  // Vue/HTML Tags
  safe = safe.replace(/(&lt;\/?[a-zA-Z0-9_-]+)/g, '<span class="token-tag">$1</span>')
  safe = safe.replace(/(\/?&gt;)/g, '<span class="token-tag">$1</span>')
  // Keywords (ref, computed, import, const, return, from)
  safe = safe.replace(/\b(ref|computed|reactive|import|const|let|return|from|export|default|function)\b/g, '<span class="token-keyword">$1</span>')
  // Comments
  safe = safe.replace(/(&lt;!--.*?--&gt;|\/\/.*$)/gm, '<span class="token-comment">$1</span>')

  return safe
})
</script>

<style scoped>
.code-container {
  border-radius: var(--radius-md);
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  margin: 1.2rem 0;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 1rem;
  background: rgba(0, 0, 0, 0.28);
  border-bottom: 1px solid var(--code-border);
}

.code-header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.code-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.code-dot.red { background: #ef4444; }
.code-dot.yellow { background: #f59e0b; }
.code-dot.green { background: #10b981; }

.code-title {
  margin-left: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  font-family: var(--font-main);
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: var(--text-primary);
}

.copy-btn.copied {
  background: rgba(66, 184, 131, 0.2);
  border-color: var(--vue-green);
  color: var(--vue-green-light);
}

.copy-icon {
  width: 14px;
  height: 14px;
}

.text-vue {
  color: var(--vue-green-light);
}

.code-content {
  margin: 0;
  padding: 1.25rem;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.88rem;
  line-height: 1.7;
  color: #e2e8f0;
}

:deep(.token-tag) {
  color: #f43f5e;
  font-weight: 600;
}

:deep(.token-directive) {
  color: #38bdf8;
  font-weight: 600;
}

:deep(.token-attr) {
  color: #fbbf24;
}

:deep(.token-string) {
  color: #42b883;
}

:deep(.token-keyword) {
  color: #c084fc;
  font-weight: 600;
}

:deep(.token-comment) {
  color: #64748b;
  font-style: italic;
}
</style>
