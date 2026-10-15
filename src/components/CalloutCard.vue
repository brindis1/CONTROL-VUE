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
  gap: 1rem;
  padding: 1.15rem 1.4rem;
  border-radius: var(--radius-md);
  margin: 1.4rem 0;
  border: 1px solid transparent;
  backdrop-filter: blur(8px);
}

.callout-icon-box {
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.callout-icon {
  width: 22px;
  height: 22px;
}

.callout-content {
  flex: 1;
}

.callout-title {
  font-weight: 700;
  font-size: 0.98rem;
  margin-bottom: 0.35rem;
}

.callout-body {
  font-size: 0.93rem;
  line-height: 1.6;
}

/* Tip */
.callout-tip {
  background: rgba(66, 184, 131, 0.08);
  border-color: rgba(66, 184, 131, 0.25);
  color: var(--text-primary);
}
.callout-tip .callout-icon { color: var(--vue-green-light); }
.callout-tip .callout-title { color: var(--vue-green-light); }

/* Warning */
.callout-warning {
  background: rgba(245, 158, 11, 0.08);
  border-color: rgba(245, 158, 11, 0.25);
  color: var(--text-primary);
}
.callout-warning .callout-icon { color: var(--accent-amber); }
.callout-warning .callout-title { color: var(--accent-amber); }

/* Rule */
.callout-rule {
  background: rgba(244, 63, 94, 0.08);
  border-color: rgba(244, 63, 94, 0.25);
  color: var(--text-primary);
}
.callout-rule .callout-icon { color: var(--accent-rose); }
.callout-rule .callout-title { color: var(--accent-rose); }

/* Info */
.callout-info {
  background: rgba(6, 182, 212, 0.08);
  border-color: rgba(6, 182, 212, 0.25);
  color: var(--text-primary);
}
.callout-info .callout-icon { color: var(--accent-cyan); }
.callout-info .callout-title { color: var(--accent-cyan); }
</style>
