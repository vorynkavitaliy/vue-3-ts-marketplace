<template>
  <va-modal
    :model-value="value"
    stateful
    hide-default-actions
    @update:model-value="handleCloseModal"
  >
    <h3 class="va-h3">Login</h3>

    <va-form
      ref="loginForm"
      immediate
      hide-error-messages
      class="sp-login-form"
      @submit.prevent
      @keyup.enter="handleLogin"
    >
      <va-input
        v-model="form.email"
        label="Email"
        name="Email"
        :rules="[(v) => Boolean(v) || 'Email is required']"
      />
      <va-input
        v-model="form.password"
        label="Password"
        type="password"
        name="Password"
        :rules="[(v) => Boolean(v) || 'Password is required']"
      />
      <div>
        <va-button color="danger" class="mr-3" @click="handleCloseModal">
          Cancle
        </va-button>
        <va-button
          :disabled="!isValid || loading"
          type="submit"
          :loading="loading"
          @click="handleLogin"
        >
          Login
        </va-button>
      </div>
    </va-form>
  </va-modal>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useForm } from "vuestic-ui";
import { ILogin } from "../form.interfaces";

defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:value", "submit"]);

const form = reactive<ILogin>({
  email: "",
  password: "",
});

const { isValid } = useForm("loginForm");

const handleCloseModal = (): void => emits("update:value", false);

const handleLogin = (): void => {
  emits("submit", form);
};
</script>

<style lang="scss" scoped>
.sp-login-form {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
