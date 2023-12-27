<template>
  <div class="app" id="app" style="overflow: hidden">
    <va-layout style="height: 100vh">
      <template #top>
        <va-navbar color="primary" class="py-2">
          <template #left>
            <va-button
              :icon="showSidebar ? 'menu_open' : 'menu'"
              @click="showSidebar = !showSidebar"
            />
          </template>
          <template #center>
            <va-navbar-item class="font-bold text-lg">
              <router-link to="/" class="font-bold text-lg va-color-indicator"
                >LOGO</router-link
              >
            </va-navbar-item>
          </template>
        </va-navbar>
      </template>

      <template #left>
        <side-menu v-model:value="showSidebar" />
      </template>

      <template #content>
        <main
          class="px-4 py-4"
          style="overflow: auto; height: calc(100vh - 140px)"
        >
          <router-view />
        </main>
        <footer class="sp-footer">Footer</footer>
      </template>
    </va-layout>

    <va-alert v-if="notify" :color="notify.type" center class="mb-6 sp-notify">
      {{ notify.message }}
    </va-alert>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useAuthStore from "@/stores/useAuthStore";
import useNotifyStore, { INotify } from "./stores/useNotifyStore";

import SideMenu from "@/shared/features/side-menu/side-menu.container.vue";

const authStore = useAuthStore();
const notifyStore = useNotifyStore();

const notify = computed<INotify | null>(() => {
  return notifyStore.isNotify;
});

watch(notify, () => {
  if (notify.value) {
    const timeout = setTimeout(() => {
      notifyStore.setNotify(null);
      clearTimeout(timeout);
    }, 5000);
  }
});

const showSidebar = ref(false);

const checkLoginSession = (): void => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      authStore.setUser(user);
    } else {
      authStore.clearUser();
    }
  });
};

onMounted(() => {
  checkLoginSession();
});
</script>

<style lang="scss" scoped>
.sp-notify {
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
}

.sp-footer {
  background-color: #154ec1;
  padding: 20px;
  text-align: center;
  color: white;
  text-transform: uppercase;
}
</style>
