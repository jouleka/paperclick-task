<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <RouterView />
  </div>
</template>

<style>
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Global styles */
:root {
  --color-primary: #3c81fc;
  --color-primary-light: #6888ff;
  --color-primary-dark: #3048bb;
  --color-accent: #f72585;
  --color-text: #333;
  --color-text-light: #777;
  --color-background: #f5f7fa;
  --color-border: #e2e8f0;
  --color-error: #ef4444;
  --color-success: #10b981;
  --color-warning: #f59e0b;

  --border-radius: 6px;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
  color: var(--color-text);
  background: var(--color-background);
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
  font-size: 16px;
  line-height: 1.5;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-container {
  padding: 1rem;
}

h1,
h2,
h3 {
  color: var(--color-text);
  line-height: 1.2;
}

button {
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border);
  background-color: white;
  transition: all 0.2s ease;
}

button:hover {
  background-color: var(--color-background);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Form styles */
.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input[type='text'],
input[type='email'],
input[type='tel'],
input[type='number'],
select,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  font-family: inherit;
  font-size: 1rem;
}

input.has-error {
  border-color: var(--color-error);
}

.error-text {
  color: var(--color-error);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .app-container {
    width: 100%;
    padding: 0.5rem;
  }
}
</style>
