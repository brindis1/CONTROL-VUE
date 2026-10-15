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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.55rem 1rem;
  background: var(--code-header-bg);
  border-bottom: 1px solid var(--code-border);
}

.code-header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.code-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  display: inline-block;
}

.code-dot.red { background: #ff5f56; }
.code-dot.yellow { background: #ffbd2e; }
.code-dot.green { background: #27c93f; }

.code-title {
  margin-left: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: #8b949e;
  font-weight: 500;
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.22rem 0.55rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #c9d1d9;
  font-family: var(--font-main);
  font-size: 0.76rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
}

.copy-btn.copied {
  background: rgba(46, 160, 67, 0.25);
  border-color: #3fb950;
  color: #3fb950;
}

.copy-icon {
  width: 13px;
  height: 13px;
}

.text-vue {
  color: #3fb950;
}

.code-content {
  margin: 0;
  padding: 1.15rem;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.86rem;
  line-height: 1.65;
  color: var(--code-text);
  background: var(--code-bg);
}

:deep(.token-tag) {
  color: var(--syn-tag);
  font-weight: 600;
}

:deep(.token-directive) {
  color: var(--syn-directive);
  font-weight: 600;
}

:deep(.token-attr) {
  color: var(--syn-attr);
}

:deep(.token-string) {
  color: var(--syn-string);
}

:deep(.token-keyword) {
  color: var(--syn-keyword);
  font-weight: 600;
}

:deep(.token-comment) {
  color: var(--syn-comment);
  font-style: italic;
}
</style>
