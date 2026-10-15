<template>
  <div class="app-wrapper">
    <!-- Navigation Sidebar -->
    <AppSidebar 
      :is-open="sidebarOpen" 
      @close-sidebar="sidebarOpen = false" 
    />

    <!-- Main Content Area -->
    <div class="main-content">
      <AppNavbar 
        @toggle-sidebar="sidebarOpen = !sidebarOpen" 
      />

      <main class="page-container">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppSidebar from './components/AppSidebar.vue'
import AppNavbar from './components/AppNavbar.vue'

const sidebarOpen = ref(false)
</script>

<style>
/* Global page transitions are in style.css */
</style>
