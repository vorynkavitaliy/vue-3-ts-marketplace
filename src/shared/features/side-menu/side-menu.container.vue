<template>
  <va-sidebar :model-value="value" @update:model-value="handleToggleValue">
    <va-sidebar-item v-for="route of pathes" :key="route.name" :to="route.path">
      <va-sidebar-item-content>
        <va-icon :name="route.icon" size="large" />
        <va-sidebar-item-title> {{ route.name }} </va-sidebar-item-title>
      </va-sidebar-item-content>
    </va-sidebar-item>

    <div class="py-4 px-4 mt-auto">
      <template v-if="!isAuth">
        <va-button class="mb-2" block @click="handleOpenLoginModal">
          Login
        </va-button>
        <va-button block @click="handleOpenRegistrationModal">
          Sign in
        </va-button>
      </template>
      <va-button v-else block @click="handleOpenLogoutModal">Logout</va-button>
    </div>

    <login-modal
      v-model:value="showMLoginModal"
      :loading="loading"
      @submit="handleLogin"
    />
    <logout-modal v-model:value="showLogoutModal" @submit="handleLogout" />
    <registration-modal
      v-model:value="showRegistrateModal"
      :loading="loading"
      @submit="handleRegistrate"
    />
  </va-sidebar>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import AuthApi from "@/shared/api/auth.api";

import LogoutModal from "@/shared/features/side-menu/modals/logout.modal.vue";
import RegistrationModal from "@/shared/features/side-menu/modals/registration.modal.vue";
import LoginModal from "@/shared/features/side-menu/modals/login.modal.vue";

import { ILogin, IRegistration } from "./form.interfaces";

import useAuthStore from "@/stores/useAuthStore";

import routes, { IRoute } from "./config.const";
import useNotifyStore from "@/stores/useNotifyStore";

defineProps({
  value: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:value"]);

const authStore = useAuthStore();
const notifyStore = useNotifyStore();

const showMLoginModal = ref<boolean>(false);
const showLogoutModal = ref<boolean>(false);
const showRegistrateModal = ref<boolean>(false);
const loading = ref<boolean>(false);

const isAuth = computed((): boolean => {
  return authStore.isAuth;
});

const pathes = computed((): IRoute[] => {
  if (isAuth.value) {
    return routes;
  }

  return routes.filter((route) => !route.protect);
});

const handleToggleValue = () => emits("update:value", false);

const handleOpenLoginModal = (): void => {
  showMLoginModal.value = !showMLoginModal.value;
};

const handleOpenRegistrationModal = (): void => {
  showRegistrateModal.value = !showRegistrateModal.value;
};

const handleOpenLogoutModal = (): void => {
  showLogoutModal.value = !showLogoutModal.value;
};

const handleLogin = async (form: ILogin): Promise<void> => {
  loading.value = true;
  try {
    const response: any = await AuthApi.login(form);

    showMLoginModal.value = false;

    authStore.setUser(response);
    notifyStore.setNotify({
      message: "Login successful",
      type: "success",
    });
  } catch (error) {
    notifyStore.setNotify({
      message: "Something went wrong",
      type: "danger",
    });
  } finally {
    loading.value = false;
  }
};

const handleRegistrate = async (form: IRegistration): Promise<void> => {
  loading.value = true;
  try {
    const response = await AuthApi.registrate(form);

    showRegistrateModal.value = false;

    authStore.setUser(response);

    notifyStore.setNotify({
      message: "Registration is successfully registered",
      type: "success",
    });
  } catch (error) {
    notifyStore.setNotify({
      message: "Something went wrong",
      type: "danger",
    });
  } finally {
    loading.value = false;
  }
};

const handleLogout = async () => {
  loading.value = true;

  try {
    await AuthApi.logout();

    authStore.clearUser();

    showLogoutModal.value = false;

    notifyStore.setNotify({
      message: "Logout is successfully logged out",
      type: "success",
    });
  } catch (error) {
    notifyStore.setNotify({
      message: "Someting went wrong",
      type: "danger",
    });
  } finally {
    loading.value = false;
  }
};
</script>
../../api/auth.api
