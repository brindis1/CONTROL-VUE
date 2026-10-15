<template>
  <div class="callout-card" :class="`callout-${type}`">
    <div class="callout-icon-box">
      <!-- Tip / Success -->
      <svg v-if="type === 'tip'" class="callout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
      </svg>
      <!-- Warning -->
      <svg v-else-if="type === 'warning'" class="callout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
      <!-- Rule / Error -->
      <svg v-else-if="type === 'rule'" class="callout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <!-- Info default -->
      <svg v-else class="callout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
      </svg>
    </div>
    <div class="callout-content">
      <div v-if="title" class="callout-title">{{ title }}</div>
      <div class="callout-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (v) => ['tip', 'warning', 'rule', 'info'].includes(v)
  },
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.callout-card {
  display: flex;
  gap: 0.85rem;
  padding: 1rem 1.15rem;
  border-radius: var(--radius-md);
  margin: 1.25rem 0;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-left: 3px solid var(--text-muted);
}

.callout-icon-box {
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.callout-icon {
  width: 18px;
  height: 18px;
}

.callout-content {
  flex: 1;
}

.callout-title {
  font-weight: 600;
  font-size: 0.92rem;
  margin-bottom: 0.25rem;
  color: var(--text-primary);
}

.callout-body {
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--text-secondary);
}

/* Tip */
.callout-tip {
  border-left-color: var(--vue-green);
}
.callout-tip .callout-icon { color: var(--vue-green); }

/* Warning */
.callout-warning {
  border-left-color: var(--accent-amber);
}
.callout-warning .callout-icon { color: var(--accent-amber); }

/* Rule */
.callout-rule {
  border-left-color: var(--accent-rose);
}
.callout-rule .callout-icon { color: var(--accent-rose); }

/* Info */
.callout-info {
  border-left-color: var(--accent-cyan);
}
.callout-info .callout-icon { color: var(--accent-cyan); }
</style>
